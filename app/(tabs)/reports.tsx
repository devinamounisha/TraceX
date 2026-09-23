import { useState } from "react";
import { Alert, FlatList, Platform, Pressable, StyleSheet, Text, View } from "react-native";
import * as Haptics from "expo-haptics";
import { MaterialIcons } from "@expo/vector-icons";

import { ScreenContainer } from "@/components/screen-container";

const findings = [
  { id: "1", label: "Evidence integrity", value: "Verified", color: "#4ade80", icon: "verified-user" },
  { id: "2", label: "Network IOC matches", value: "09 findings", color: "#fbbf24", icon: "flag" },
  { id: "3", label: "Timeline coverage", value: "14 sources", color: "#58a6ff", icon: "timeline" },
];

export default function ReportsScreen() {
  const [exported, setExported] = useState(false);
  const exportJson = () => { setExported(true); if (Platform.OS !== "web") Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success); Alert.alert("JSON export ready", "The report bundle has been prepared with hashes, custody events, and findings."); };
  const exportPdf = () => Alert.alert("PDF export queued", "A reviewable PDF will be generated from the current verified findings.");
  const renderFinding = ({ item }: { item: typeof findings[number] }) => <View style={styles.findingRow}><View style={[styles.findingIcon, { backgroundColor: `${item.color}18` }]}><MaterialIcons name={item.icon as keyof typeof MaterialIcons.glyphMap} size={17} color={item.color} /></View><Text style={styles.findingLabel}>{item.label}</Text><Text style={[styles.findingValue, { color: item.color }]}>{item.value}</Text></View>;

  return (
    <ScreenContainer className="px-5" containerClassName="bg-background">
      <FlatList
        data={findings}
        renderItem={renderFinding}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={<View>
          <View style={styles.screenTop}><View><Text style={styles.kicker}>CASE / CASE-2026-014</Text><Text style={styles.title}>Findings & report</Text><Text style={styles.subtitle}>Investigator review package</Text></View><View style={styles.readyBadge}><MaterialIcons name="check-circle" size={15} color="#4ade80" /><Text style={styles.readyText}>READY</Text></View></View>
          <View style={styles.reportHero}><View style={styles.reportIcon}><MaterialIcons name="description" size={25} color="#58a6ff" /></View><View style={styles.reportCopy}><Text style={styles.reportTitle}>Northstar investigation report</Text><Text style={styles.reportMeta}>Draft v0.8 · last updated 08:42 · A. Rao</Text></View><MaterialIcons name="more-vert" size={20} color="#6f91a5" /></View>
          <View style={styles.summaryCard}><Text style={styles.summaryKicker}>VERIFIED SUMMARY</Text><Text style={styles.summaryText}>A sequence of authenticated remote logons preceded lateral movement across the engineering segment. Network metadata shows beaconing to a flagged synthetic domain; no original evidence was modified.</Text><View style={styles.aiLabel}><MaterialIcons name="auto-awesome" size={13} color="#c8a7ff" /><Text style={styles.aiLabelText}>AI-assisted draft · investigator verification required</Text></View></View>
          <Text style={styles.sectionTitle}>Report coverage</Text>
        </View>}
        ListFooterComponent={<View>
          <View style={styles.custodyCard}><View style={styles.custodyHeader}><Text style={styles.sectionTitle}>Immutable audit trail</Text><Text style={styles.auditCount}>04 EVENTS</Text></View><View style={styles.auditLine}><View style={styles.auditMarker}><View style={styles.auditDot} /></View><View style={styles.auditCopy}><Text style={styles.auditTitle}>Analysis workflow completed</Text><Text style={styles.auditMeta}>A. Rao · sandbox worker · 08:42</Text></View></View><View style={styles.auditLine}><View style={styles.auditMarker}><View style={styles.auditDot} /></View><View style={styles.auditCopy}><Text style={styles.auditTitle}>PCAP quarantined and hashed</Text><Text style={styles.auditMeta}>A. Rao · acquisition station · 08:31</Text></View></View><View style={styles.auditLine}><View style={styles.auditMarker}><View style={styles.auditDot} /></View><View style={styles.auditCopy}><Text style={styles.auditTitle}>Case scope approved</Text><Text style={styles.auditMeta}>Admin review · 18 Sep 2026</Text></View></View></View>
          <View style={styles.exportRow}><Pressable onPress={exportJson} style={({ pressed }) => [styles.exportButton, pressed && styles.pressed]}><MaterialIcons name={exported ? "check" : "data-object"} size={17} color="#07111f" /><Text style={styles.exportText}>{exported ? "JSON prepared" : "Export JSON"}</Text></Pressable><Pressable onPress={exportPdf} style={({ pressed }) => [styles.exportButtonSecondary, pressed && styles.pressed]}><MaterialIcons name="picture-as-pdf" size={17} color="#b4ccda" /><Text style={styles.exportTextSecondary}>Export PDF</Text></Pressable></View>
          <View style={styles.finalNote}><MaterialIcons name="gavel" size={17} color="#fbbf24" /><Text style={styles.finalText}>Final findings remain editable until an authorized investigator signs the report. This prototype never submits or publishes official records.</Text></View>
        </View>}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  listContent: { paddingTop: 10, paddingBottom: 30 }, screenTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 19 }, kicker: { color: "#58a6ff", fontSize: 10, fontWeight: "900", letterSpacing: 1.2 }, title: { color: "#e6f7ff", fontSize: 28, fontWeight: "800", letterSpacing: -0.7, marginTop: 6 }, subtitle: { color: "#7894a8", fontSize: 13, marginTop: 5 }, readyBadge: { flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: "#0c2829", borderRadius: 9, paddingHorizontal: 8, paddingVertical: 7 }, readyText: { color: "#4ade80", fontSize: 9, fontWeight: "900", letterSpacing: 1 }, reportHero: { flexDirection: "row", alignItems: "center", backgroundColor: "#0d1b2a", borderWidth: 1, borderColor: "#193349", borderRadius: 17, padding: 14, marginBottom: 11 }, reportIcon: { width: 43, height: 43, borderRadius: 13, backgroundColor: "#17385a", alignItems: "center", justifyContent: "center", marginRight: 11 }, reportCopy: { flex: 1 }, reportTitle: { color: "#dcecf2", fontSize: 14, fontWeight: "800" }, reportMeta: { color: "#6d899e", fontSize: 10, marginTop: 5 }, summaryCard: { backgroundColor: "#0b2430", borderWidth: 1, borderColor: "#194c51", borderRadius: 17, padding: 15, marginBottom: 22 }, summaryKicker: { color: "#72bfc0", fontSize: 9, fontWeight: "900", letterSpacing: 1.1 }, summaryText: { color: "#c6e0e8", fontSize: 12, lineHeight: 19, marginTop: 9 }, aiLabel: { flexDirection: "row", alignItems: "center", gap: 5, marginTop: 12 }, aiLabelText: { color: "#a698c8", fontSize: 9, fontWeight: "700" }, sectionTitle: { color: "#d8ebf2", fontSize: 16, fontWeight: "800" }, findingRow: { flexDirection: "row", alignItems: "center", backgroundColor: "#0d1b2a", borderWidth: 1, borderColor: "#193349", borderRadius: 14, padding: 12, marginBottom: 8 }, findingIcon: { width: 32, height: 32, borderRadius: 10, alignItems: "center", justifyContent: "center", marginRight: 10 }, findingLabel: { flex: 1, color: "#abc2ce", fontSize: 11, fontWeight: "700" }, findingValue: { fontSize: 11, fontWeight: "900" }, custodyCard: { backgroundColor: "#0d1b2a", borderWidth: 1, borderColor: "#193349", borderRadius: 17, padding: 14, marginTop: 14 }, custodyHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }, auditCount: { color: "#557489", fontSize: 9, fontWeight: "900", letterSpacing: 1 }, auditLine: { flexDirection: "row", minHeight: 54 }, auditMarker: { width: 24, alignItems: "center", paddingTop: 3, marginRight: 5, borderRightWidth: 1, borderRightColor: "#28516b" }, auditDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#58a6ff", borderWidth: 2, borderColor: "#0d1b2a" }, auditCopy: { paddingLeft: 7 }, auditTitle: { color: "#cfe5ef", fontSize: 11, fontWeight: "800" }, auditMeta: { color: "#6d899e", fontSize: 9, marginTop: 4 }, exportRow: { flexDirection: "row", gap: 9, marginTop: 16 }, exportButton: { flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 6, backgroundColor: "#58a6ff", borderRadius: 12, paddingVertical: 13 }, exportText: { color: "#07111f", fontSize: 11, fontWeight: "900" }, exportButtonSecondary: { flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 6, backgroundColor: "#102335", borderWidth: 1, borderColor: "#21445c", borderRadius: 12, paddingVertical: 13 }, exportTextSecondary: { color: "#b4ccda", fontSize: 11, fontWeight: "900" }, pressed: { opacity: 0.78, transform: [{ scale: 0.98 }] }, finalNote: { flexDirection: "row", gap: 8, alignItems: "flex-start", backgroundColor: "#241f12", borderWidth: 1, borderColor: "#57431e", borderRadius: 12, padding: 12, marginTop: 16 }, finalText: { flex: 1, color: "#bba97a", fontSize: 10, lineHeight: 15 },
});
