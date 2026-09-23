import { useMemo, useState } from "react";
import {
  Alert,
  FlatList,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

import { ScreenContainer } from "@/components/screen-container";

const activities = [
  { id: "1", title: "SHA-256 verified", detail: "disk_image.E01 · read-only", time: "08:42", icon: "verified", tone: "success" },
  { id: "2", title: "IOC match flagged", detail: "suspicious-domain.test", time: "08:31", icon: "flag", tone: "warning" },
  { id: "3", title: "Timeline generated", detail: "1,284 events · 14 sources", time: "08:12", icon: "timeline", tone: "info" },
];

function ActionButton({ label, icon, onPress, secondary = false }: { label: string; icon: keyof typeof MaterialIcons.glyphMap; onPress: () => void; secondary?: boolean }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.actionButton, secondary && styles.actionButtonSecondary, pressed && styles.pressed]}
    >
      <MaterialIcons name={icon} size={18} color={secondary ? "#8aa4b8" : "#07111f"} />
      <Text style={[styles.actionButtonText, secondary && styles.actionButtonTextSecondary]}>{label}</Text>
    </Pressable>
  );
}

function CaseCard({ title, caseId, status, progress, accent }: { title: string; caseId: string; status: string; progress: string; accent: string }) {
  return (
    <View style={styles.caseCard}>
      <View style={styles.caseTopRow}>
        <View style={[styles.caseIcon, { backgroundColor: `${accent}1A` }]}>
          <MaterialIcons name="folder-special" size={19} color={accent} />
        </View>
        <View style={styles.caseTitleWrap}>
          <Text style={styles.caseTitle}>{title}</Text>
          <Text style={styles.caseId}>{caseId}</Text>
        </View>
        <View style={styles.statusPill}><View style={[styles.statusDot, { backgroundColor: accent }]} /><Text style={[styles.statusText, { color: accent }]}>{status}</Text></View>
      </View>
      <View style={styles.progressTrack}><View style={[styles.progressFill, { width: progress as `${number}%`, backgroundColor: accent }]} /></View>
      <Text style={styles.progressLabel}>{progress} evidence integrity review complete</Text>
    </View>
  );
}

export default function HomeScreen() {
  const router = useRouter();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [caseTitle, setCaseTitle] = useState("");
  const [caseDescription, setCaseDescription] = useState("");
  const [caseCreated, setCaseCreated] = useState(false);

  const greeting = useMemo(() => (caseCreated ? "New case is ready for evidence" : "Good morning, investigator"), [caseCreated]);

  const haptic = () => {
    if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const createCase = () => {
    if (!caseTitle.trim()) {
      Alert.alert("Case title required", "Add a short title before creating the investigation.");
      return;
    }
    haptic();
    setCaseCreated(true);
    setIsCreateOpen(false);
    setCaseTitle("");
    setCaseDescription("");
  };

  const renderActivity = ({ item }: { item: typeof activities[number] }) => {
    const tone = item.tone === "success" ? "#4ade80" : item.tone === "warning" ? "#fbbf24" : "#58a6ff";
    return (
      <View style={styles.activityRow}>
        <View style={[styles.activityIcon, { backgroundColor: `${tone}18` }]}><MaterialIcons name={item.icon as keyof typeof MaterialIcons.glyphMap} size={18} color={tone} /></View>
        <View style={styles.activityCopy}><Text style={styles.activityTitle}>{item.title}</Text><Text style={styles.activityDetail}>{item.detail}</Text></View>
        <Text style={styles.activityTime}>{item.time}</Text>
      </View>
    );
  };

  return (
    <ScreenContainer className="px-5" containerClassName="bg-background">
      <FlatList
        data={activities}
        keyExtractor={(item) => item.id}
        renderItem={renderActivity}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View>
            <View style={styles.topBar}>
              <View>
                <View style={styles.brandRow}><View style={styles.brandMark}><MaterialIcons name="security" size={17} color="#07111f" /></View><Text style={styles.eyebrow}>FORENSIC COMMAND</Text></View>
                <Text style={styles.greeting}>{greeting}</Text>
                <Text style={styles.subGreeting}>Synthetic evidence workspace · Sector 07</Text>
              </View>
              <Pressable onPress={() => Alert.alert("Secure session", "Investigator role · session timeout in 17 minutes") } style={({ pressed }) => [styles.avatar, pressed && styles.pressed]}><Text style={styles.avatarText}>AR</Text><View style={styles.onlineDot} /></Pressable>
            </View>

            <View style={styles.securityBanner}>
              <View style={styles.bannerIcon}><MaterialIcons name="lock" size={17} color="#4ade80" /></View>
              <View style={styles.bannerCopy}><Text style={styles.bannerTitle}>Evidence-preserving mode</Text><Text style={styles.bannerText}>Read-only originals · audit logging active</Text></View>
              <MaterialIcons name="chevron-right" size={20} color="#6f91a5" />
            </View>

            <View style={styles.sectionHeader}><Text style={styles.sectionTitle}>Case overview</Text><Text style={styles.sectionMeta}>LIVE SNAPSHOT</Text></View>
            <View style={styles.metricGrid}>
              <View style={styles.metricCard}><Text style={styles.metricValue}>04</Text><Text style={styles.metricLabel}>Active cases</Text><View style={styles.metricTrend}><MaterialIcons name="trending-up" size={13} color="#4ade80" /><Text style={styles.metricTrendText}>+1 this week</Text></View></View>
              <View style={styles.metricCard}><Text style={styles.metricValue}>128</Text><Text style={styles.metricLabel}>Evidence items</Text><View style={styles.metricTrend}><MaterialIcons name="verified" size={13} color="#58a6ff" /><Text style={styles.metricTrendText}>100% hashed</Text></View></View>
              <View style={styles.metricCard}><Text style={styles.metricValue}>09</Text><Text style={styles.metricLabel}>Open IOCs</Text><View style={styles.metricTrend}><MaterialIcons name="priority-high" size={13} color="#fbbf24" /><Text style={styles.metricTrendText}>3 high priority</Text></View></View>
              <View style={styles.metricCard}><Text style={styles.metricValue}>98%</Text><Text style={styles.metricLabel}>Integrity score</Text><View style={styles.metricTrend}><MaterialIcons name="shield" size={13} color="#4ade80" /><Text style={styles.metricTrendText}>Within policy</Text></View></View>
            </View>

            <View style={styles.sectionHeader}><Text style={styles.sectionTitle}>Investigation queue</Text><Pressable onPress={() => router.push("/(tabs)/evidence")}><Text style={styles.linkText}>View all</Text></Pressable></View>
            <CaseCard title="Northstar Lateral Movement" caseId="CASE-2026-014 · Endpoint cluster 03" status="In review" progress="72%" accent="#58a6ff" />
            <CaseCard title="Atlas DNS Beaconing" caseId="CASE-2026-011 · Network segment B" status="IOC review" progress="48%" accent="#fbbf24" />

            <View style={styles.quickActions}><Text style={styles.sectionTitle}>Quick actions</Text><View style={styles.actionRow}><ActionButton label="New case" icon="add-circle-outline" onPress={() => setIsCreateOpen(true)} /><ActionButton label="Acquire" icon="file-upload" onPress={() => router.push("/(tabs)/evidence")} secondary /><ActionButton label="Run analysis" icon="play-circle-outline" onPress={() => router.push("/(tabs)/analyze")} secondary /></View></View>

            <View style={styles.sectionHeader}><Text style={styles.sectionTitle}>Recent activity</Text><View style={styles.liveTag}><View style={styles.liveDot} /><Text style={styles.liveText}>LIVE</Text></View></View>
          </View>
        }
        ListFooterComponent={<View style={styles.footerNote}><MaterialIcons name="info-outline" size={15} color="#6f91a5" /><Text style={styles.footerText}>Demo workspace contains synthetic evidence only. Verify every AI suggestion against source artifacts.</Text></View>}
      />

      <Modal visible={isCreateOpen} transparent animationType="slide" onRequestClose={() => setIsCreateOpen(false)}>
        <View style={styles.modalBackdrop}><View style={styles.modalCard}>
          <View style={styles.modalHandle} /><View style={styles.modalHeader}><View><Text style={styles.modalKicker}>CASE MANAGEMENT</Text><Text style={styles.modalTitle}>Create investigation</Text></View><Pressable onPress={() => setIsCreateOpen(false)}><MaterialIcons name="close" size={22} color="#8aa4b8" /></Pressable></View>
          <Text style={styles.inputLabel}>Case title</Text><TextInput value={caseTitle} onChangeText={setCaseTitle} placeholder="e.g. Mercury endpoint review" placeholderTextColor="#597387" style={styles.input} />
          <Text style={styles.inputLabel}>Description</Text><TextInput value={caseDescription} onChangeText={setCaseDescription} placeholder="Scope, authorized source, or handoff note" placeholderTextColor="#597387" multiline style={[styles.input, styles.textArea]} />
          <View style={styles.readOnlyNote}><MaterialIcons name="lock-outline" size={16} color="#4ade80" /><Text style={styles.readOnlyText}>Audit trail and SHA-256 capture will start automatically.</Text></View>
          <Pressable onPress={createCase} style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]}><MaterialIcons name="add" size={18} color="#07111f" /><Text style={styles.primaryButtonText}>Create secure case</Text></Pressable>
        </View></View>
      </Modal>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  listContent: { paddingTop: 10, paddingBottom: 32 },
  topBar: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 },
  brandRow: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 12 },
  brandMark: { width: 26, height: 26, borderRadius: 8, backgroundColor: "#58a6ff", alignItems: "center", justifyContent: "center" },
  eyebrow: { color: "#8aa4b8", fontSize: 11, fontWeight: "800", letterSpacing: 1.4 },
  greeting: { color: "#e6f7ff", fontSize: 26, fontWeight: "800", letterSpacing: -0.7 },
  subGreeting: { color: "#7894a8", fontSize: 13, marginTop: 5 },
  avatar: { width: 42, height: 42, borderRadius: 16, backgroundColor: "#12263a", borderWidth: 1, borderColor: "#24506d", alignItems: "center", justifyContent: "center", position: "relative" },
  avatarText: { color: "#bcefff", fontSize: 13, fontWeight: "800" },
  onlineDot: { width: 9, height: 9, borderRadius: 5, backgroundColor: "#4ade80", borderWidth: 2, borderColor: "#07111f", position: "absolute", right: -1, bottom: -1 },
  securityBanner: { flexDirection: "row", alignItems: "center", backgroundColor: "#0b2430", borderWidth: 1, borderColor: "#194c51", borderRadius: 16, padding: 14, marginBottom: 24 },
  bannerIcon: { width: 32, height: 32, borderRadius: 10, backgroundColor: "#143b3e", alignItems: "center", justifyContent: "center", marginRight: 11 },
  bannerCopy: { flex: 1 }, bannerTitle: { color: "#c9fff0", fontWeight: "800", fontSize: 13 }, bannerText: { color: "#6eabb0", fontSize: 11, marginTop: 3 },
  sectionHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 11, marginTop: 2 },
  sectionTitle: { color: "#d8ebf2", fontSize: 16, fontWeight: "800", letterSpacing: -0.2 }, sectionMeta: { color: "#557489", fontSize: 10, fontWeight: "800", letterSpacing: 1.2 }, linkText: { color: "#58a6ff", fontSize: 12, fontWeight: "700" },
  metricGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10, marginBottom: 24 },
  metricCard: { width: "48%" as `${number}%`, backgroundColor: "#0d1b2a", borderRadius: 16, borderWidth: 1, borderColor: "#193349", padding: 14 }, metricValue: { color: "#e6f7ff", fontSize: 24, fontWeight: "800" }, metricLabel: { color: "#7894a8", fontSize: 12, marginTop: 4 }, metricTrend: { flexDirection: "row", alignItems: "center", gap: 4, marginTop: 12 }, metricTrendText: { color: "#6f91a5", fontSize: 10 },
  caseCard: { backgroundColor: "#0d1b2a", borderWidth: 1, borderColor: "#193349", borderRadius: 18, padding: 14, marginBottom: 10 }, caseTopRow: { flexDirection: "row", alignItems: "center" }, caseIcon: { width: 36, height: 36, borderRadius: 11, alignItems: "center", justifyContent: "center", marginRight: 10 }, caseTitleWrap: { flex: 1 }, caseTitle: { color: "#dcecf2", fontSize: 13, fontWeight: "800" }, caseId: { color: "#6d899e", fontSize: 10, marginTop: 4 }, statusPill: { flexDirection: "row", alignItems: "center", gap: 5 }, statusDot: { width: 6, height: 6, borderRadius: 3 }, statusText: { fontSize: 10, fontWeight: "700" }, progressTrack: { height: 5, backgroundColor: "#1a3042", borderRadius: 4, marginTop: 15, overflow: "hidden" }, progressFill: { height: 5, borderRadius: 4 }, progressLabel: { color: "#678398", fontSize: 10, marginTop: 7 },
  quickActions: { marginTop: 14, marginBottom: 24 }, actionRow: { flexDirection: "row", gap: 8, marginTop: 11 }, actionButton: { flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 6, backgroundColor: "#58a6ff", borderRadius: 12, paddingVertical: 12 }, actionButtonSecondary: { backgroundColor: "#102335", borderWidth: 1, borderColor: "#21445c" }, actionButtonText: { color: "#07111f", fontSize: 11, fontWeight: "800" }, actionButtonTextSecondary: { color: "#b4ccda" }, pressed: { opacity: 0.78, transform: [{ scale: 0.98 }] },
  liveTag: { flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: "#0d2828", borderRadius: 7, paddingHorizontal: 7, paddingVertical: 4 }, liveDot: { width: 5, height: 5, borderRadius: 3, backgroundColor: "#4ade80" }, liveText: { color: "#4ade80", fontSize: 9, fontWeight: "900", letterSpacing: 1 },
  activityRow: { flexDirection: "row", alignItems: "center", paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: "#132a3d" }, activityIcon: { width: 34, height: 34, borderRadius: 11, alignItems: "center", justifyContent: "center", marginRight: 10 }, activityCopy: { flex: 1 }, activityTitle: { color: "#dcecf2", fontSize: 12, fontWeight: "700" }, activityDetail: { color: "#6d899e", fontSize: 10, marginTop: 4 }, activityTime: { color: "#58778c", fontSize: 10, fontWeight: "700" },
  footerNote: { flexDirection: "row", gap: 7, alignItems: "flex-start", marginTop: 18, paddingHorizontal: 4 }, footerText: { flex: 1, color: "#607d90", fontSize: 10, lineHeight: 15 },
  modalBackdrop: { flex: 1, backgroundColor: "rgba(1,8,16,0.78)", justifyContent: "flex-end" }, modalCard: { backgroundColor: "#0d1b2a", borderTopLeftRadius: 26, borderTopRightRadius: 26, borderWidth: 1, borderColor: "#25465c", padding: 22, paddingBottom: 34 }, modalHandle: { width: 42, height: 4, borderRadius: 2, backgroundColor: "#35546a", alignSelf: "center", marginBottom: 20 }, modalHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 22 }, modalKicker: { color: "#58a6ff", fontSize: 10, fontWeight: "900", letterSpacing: 1.2 }, modalTitle: { color: "#e6f7ff", fontSize: 22, fontWeight: "800", marginTop: 5 }, inputLabel: { color: "#9eb7c6", fontSize: 11, fontWeight: "700", marginBottom: 7, marginTop: 9 }, input: { color: "#e6f7ff", backgroundColor: "#091725", borderWidth: 1, borderColor: "#27475c", borderRadius: 12, paddingHorizontal: 13, paddingVertical: 12, fontSize: 13 }, textArea: { minHeight: 80, textAlignVertical: "top" }, readOnlyNote: { flexDirection: "row", gap: 8, alignItems: "center", backgroundColor: "#0b2430", borderRadius: 11, padding: 11, marginVertical: 16 }, readOnlyText: { flex: 1, color: "#77a9ab", fontSize: 11, lineHeight: 16 }, primaryButton: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 7, backgroundColor: "#58a6ff", borderRadius: 13, paddingVertical: 14 }, primaryButtonText: { color: "#07111f", fontWeight: "900", fontSize: 13 },
});
