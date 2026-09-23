import { useMemo, useState } from "react";
import { Alert, FlatList, Platform, Pressable, StyleSheet, Switch, Text, View } from "react-native";
import * as Haptics from "expo-haptics";
import { MaterialIcons } from "@expo/vector-icons";

import { ScreenContainer } from "@/components/screen-container";

type Operation = { id: string; name: string; description: string; icon: keyof typeof MaterialIcons.glyphMap; enabled: boolean };

const operationSeed: Operation[] = [
  { id: "read", name: "READ_EVIDENCE", description: "Mount selected artifacts in read-only mode", icon: "visibility", enabled: true },
  { id: "hash", name: "HASH", description: "Calculate and compare SHA-256 integrity", icon: "fingerprint", enabled: true },
  { id: "filter", name: "FILTER", description: "Reduce events by source, time, or type", icon: "filter-list", enabled: true },
  { id: "ioc", name: "MATCH_IOC", description: "Match approved indicators against metadata", icon: "flag", enabled: true },
  { id: "timeline", name: "TIMELINE", description: "Generate a normalized event sequence", icon: "timeline", enabled: true },
  { id: "report", name: "GENERATE_REPORT", description: "Create a reviewable investigation draft", icon: "description", enabled: false },
];

export default function AnalyzeScreen() {
  const [operations, setOperations] = useState(operationSeed);
  const [running, setRunning] = useState(false);
  const [verified, setVerified] = useState(false);
  const selectedCount = useMemo(() => operations.filter((item) => item.enabled).length, [operations]);

  const toggle = (id: string) => setOperations((current) => current.map((item) => item.id === id ? { ...item, enabled: !item.enabled } : item));
  const runWorkflow = () => {
    if (!selectedCount) {
      Alert.alert("Select an operation", "Choose at least one approved operation before running the workflow.");
      return;
    }
    if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setRunning(true);
    setTimeout(() => { setRunning(false); if (Platform.OS !== "web") Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success); Alert.alert("Workflow complete", `${selectedCount} approved operations completed in the sandbox.`); }, 850);
  };

  const renderOperation = ({ item, index }: { item: Operation; index: number }) => (
    <Pressable onPress={() => toggle(item.id)} style={({ pressed }) => [styles.operationRow, pressed && styles.pressed]}>
      <View style={[styles.operationIndex, item.enabled && styles.operationIndexActive]}><Text style={[styles.operationIndexText, item.enabled && styles.operationIndexTextActive]}>0{index + 1}</Text></View><View style={styles.operationIcon}><MaterialIcons name={item.icon} size={18} color={item.enabled ? "#58a6ff" : "#597387"} /></View><View style={styles.operationCopy}><Text style={[styles.operationName, !item.enabled && styles.disabledText]}>{item.name}</Text><Text style={styles.operationDescription}>{item.description}</Text></View><View style={[styles.toggle, item.enabled && styles.toggleActive]}><View style={[styles.toggleKnob, item.enabled && styles.toggleKnobActive]} /></View>
    </Pressable>
  );

  return (
    <ScreenContainer className="px-5" containerClassName="bg-background">
      <FlatList
        data={operations}
        renderItem={renderOperation}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={<View>
          <View style={styles.screenTop}><View><Text style={styles.kicker}>SANDBOX / DSL BUILDER</Text><Text style={styles.title}>Safe analysis</Text><Text style={styles.subtitle}>Approved functions only · no arbitrary code</Text></View><View style={styles.sandboxChip}><View style={styles.greenDot} /><Text style={styles.sandboxText}>ISOLATED</Text></View></View>
          <View style={styles.pipelineCard}><View style={styles.pipelineHeader}><View><Text style={styles.pipelineKicker}>ACTIVE WORKFLOW</Text><Text style={styles.pipelineTitle}>Northstar evidence triage</Text></View><Text style={styles.pipelineCount}>{selectedCount}/6</Text></View><View style={styles.pipelineLine}><View style={styles.pipelineNode}><MaterialIcons name="folder" size={15} color="#58a6ff" /><Text style={styles.pipelineNodeText}>Evidence</Text></View><View style={styles.line} /><View style={styles.pipelineNode}><MaterialIcons name="fingerprint" size={15} color="#58a6ff" /><Text style={styles.pipelineNodeText}>Hash</Text></View><View style={styles.line} /><View style={styles.pipelineNode}><MaterialIcons name="flag" size={15} color="#fbbf24" /><Text style={styles.pipelineNodeText}>IOC</Text></View><View style={styles.line} /><View style={styles.pipelineNode}><MaterialIcons name="timeline" size={15} color="#4ade80" /><Text style={styles.pipelineNodeText}>Report</Text></View></View></View>
          <View style={styles.dslCard}><View style={styles.dslHeader}><Text style={styles.sectionTitle}>Restricted forensic DSL</Text><View style={styles.safeBadge}><MaterialIcons name="lock" size={11} color="#4ade80" /><Text style={styles.safeBadgeText}>SAFE</Text></View></View><Text style={styles.codeText}>READ_EVIDENCE(case="CASE-2026-014")
HASH(scope="all")
FILTER(source="WS-ENG-044")
MATCH_IOC(feed="approved-v4")</Text></View>
          <View style={styles.sectionHeader}><Text style={styles.sectionTitle}>Workflow operations</Text><Text style={styles.sectionMeta}>TAP TO TOGGLE</Text></View>
        </View>}
        ListFooterComponent={<View>
          <View style={styles.aiCard}><View style={styles.aiIcon}><MaterialIcons name="auto-awesome" size={18} color="#c8a7ff" /></View><View style={styles.aiCopy}><Text style={styles.aiTitle}>AI suggestions are review-only</Text><Text style={styles.aiText}>Summaries can group events and draft queries, but investigators must verify every claim against source evidence.</Text></View><Switch value={verified} onValueChange={setVerified} trackColor={{ false: "#27475c", true: "#4d3b73" }} thumbColor={verified ? "#c8a7ff" : "#7894a8"} /></View>
          <Pressable onPress={runWorkflow} style={({ pressed }) => [styles.runButton, running && styles.runButtonRunning, pressed && styles.pressed]}><MaterialIcons name={running ? "sync" : "play-arrow"} size={19} color="#07111f" /><Text style={styles.runButtonText}>{running ? "Running in isolated sandbox…" : `Run ${selectedCount} approved operations`}</Text></Pressable>
          <View style={styles.auditNote}><MaterialIcons name="fact-check" size={16} color="#58a6ff" /><Text style={styles.auditText}>Execution status, errors, and operator identity will be written to the immutable audit trail.</Text></View>
        </View>}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  listContent: { paddingTop: 10, paddingBottom: 30 }, screenTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 19 }, kicker: { color: "#58a6ff", fontSize: 10, fontWeight: "900", letterSpacing: 1.2 }, title: { color: "#e6f7ff", fontSize: 28, fontWeight: "800", letterSpacing: -0.7, marginTop: 6 }, subtitle: { color: "#7894a8", fontSize: 13, marginTop: 5 }, sandboxChip: { flexDirection: "row", alignItems: "center", gap: 6, backgroundColor: "#0c2829", borderRadius: 9, paddingHorizontal: 9, paddingVertical: 7 }, greenDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: "#4ade80" }, sandboxText: { color: "#4ade80", fontSize: 9, fontWeight: "900", letterSpacing: 1 }, pipelineCard: { backgroundColor: "#0d1b2a", borderWidth: 1, borderColor: "#193349", borderRadius: 18, padding: 15, marginBottom: 11 }, pipelineHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }, pipelineKicker: { color: "#6f91a5", fontSize: 9, fontWeight: "900", letterSpacing: 1.1 }, pipelineTitle: { color: "#dcecf2", fontSize: 14, fontWeight: "800", marginTop: 5 }, pipelineCount: { color: "#58a6ff", fontSize: 20, fontWeight: "900" }, pipelineLine: { flexDirection: "row", alignItems: "center", marginTop: 19 }, pipelineNode: { alignItems: "center", gap: 5 }, pipelineNodeText: { color: "#8aa4b8", fontSize: 9, fontWeight: "700" }, line: { flex: 1, height: 1, backgroundColor: "#2a526c", marginHorizontal: 5, marginBottom: 14 }, dslCard: { backgroundColor: "#081522", borderWidth: 1, borderColor: "#1a3c53", borderRadius: 16, padding: 15, marginBottom: 23 }, dslHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 11 }, sectionTitle: { color: "#d8ebf2", fontSize: 16, fontWeight: "800" }, safeBadge: { flexDirection: "row", gap: 4, alignItems: "center", backgroundColor: "#0c2829", borderRadius: 6, paddingHorizontal: 6, paddingVertical: 4 }, safeBadgeText: { color: "#4ade80", fontSize: 9, fontWeight: "900" }, codeText: { color: "#8fc7d3", fontSize: 11, lineHeight: 20, fontFamily: Platform.OS === "ios" ? "Menlo" : "monospace" }, sectionHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }, sectionMeta: { color: "#557489", fontSize: 9, fontWeight: "900", letterSpacing: 1.1 }, operationRow: { flexDirection: "row", alignItems: "center", backgroundColor: "#0d1b2a", borderWidth: 1, borderColor: "#193349", borderRadius: 15, padding: 11, marginBottom: 8 }, pressed: { opacity: 0.78, transform: [{ scale: 0.985 }] }, operationIndex: { width: 25, height: 25, borderRadius: 8, backgroundColor: "#142638", alignItems: "center", justifyContent: "center", marginRight: 8 }, operationIndexActive: { backgroundColor: "#17385a" }, operationIndexText: { color: "#597387", fontSize: 9, fontWeight: "900" }, operationIndexTextActive: { color: "#87caff" }, operationIcon: { width: 30, alignItems: "center" }, operationCopy: { flex: 1 }, operationName: { color: "#cfe5ef", fontSize: 11, fontWeight: "900" }, operationDescription: { color: "#6d899e", fontSize: 9, marginTop: 3 }, disabledText: { color: "#6d899e" }, toggle: { width: 32, height: 18, borderRadius: 10, backgroundColor: "#1c3446", padding: 2, justifyContent: "center" }, toggleActive: { backgroundColor: "#2e6d8f" }, toggleKnob: { width: 14, height: 14, borderRadius: 7, backgroundColor: "#597387" }, toggleKnobActive: { alignSelf: "flex-end", backgroundColor: "#9dd2ff" }, aiCard: { flexDirection: "row", gap: 10, alignItems: "center", backgroundColor: "#17142b", borderWidth: 1, borderColor: "#44386a", borderRadius: 16, padding: 13, marginTop: 12, marginBottom: 11 }, aiIcon: { width: 33, height: 33, borderRadius: 10, backgroundColor: "#2c2450", alignItems: "center", justifyContent: "center" }, aiCopy: { flex: 1 }, aiTitle: { color: "#e2d8ff", fontSize: 11, fontWeight: "800" }, aiText: { color: "#9a8fbd", fontSize: 9, lineHeight: 14, marginTop: 3 }, runButton: { flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 7, backgroundColor: "#58a6ff", borderRadius: 13, paddingVertical: 14, marginTop: 4 }, runButtonRunning: { backgroundColor: "#8bc8ff" }, runButtonText: { color: "#07111f", fontSize: 12, fontWeight: "900" }, auditNote: { flexDirection: "row", gap: 7, alignItems: "flex-start", marginTop: 16, paddingHorizontal: 4 }, auditText: { flex: 1, color: "#607d90", fontSize: 10, lineHeight: 15 },
});
