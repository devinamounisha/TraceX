import { useState } from "react";
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
import { MaterialIcons } from "@expo/vector-icons";

import { ScreenContainer } from "@/components/screen-container";

type Evidence = { id: string; name: string; type: string; size: string; source: string; hash: string; state: string; color: string };

const seedEvidence: Evidence[] = [
  { id: "E-014", name: "northstar-disk.E01", type: "Disk image", size: "38.4 GB", source: "WS-ENG-044", hash: "a91c…7f20", state: "Verified", color: "#4ade80" },
  { id: "E-013", name: "memory-capture.raw", type: "Memory dump", size: "16.0 GB", source: "WS-ENG-044", hash: "d830…ab19", state: "Analyzed", color: "#58a6ff" },
  { id: "E-012", name: "edge-history.json", type: "Browser artifact", size: "4.8 MB", source: "WS-ENG-044", hash: "c214…98d1", state: "Verified", color: "#4ade80" },
  { id: "E-011", name: "segment-b-traffic.pcap", type: "Network capture", size: "2.1 GB", source: "SPAN-SW-B", hash: "0f55…cc42", state: "IOC found", color: "#fbbf24" },
];

const types = ["Disk image", "Memory dump", "Log file", "PCAP"];

export default function EvidenceScreen() {
  const [evidence, setEvidence] = useState(seedEvidence);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [selected, setSelected] = useState<Evidence | null>(null);
  const [name, setName] = useState("");
  const [type, setType] = useState(types[0]);

  const addEvidence = () => {
    if (!name.trim()) {
      Alert.alert("Filename required", "Enter the synthetic artifact name to continue.");
      return;
    }
    if (Platform.OS !== "web") Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    const item: Evidence = { id: `E-${String(evidence.length + 15).padStart(3, "0")}`, name: name.trim(), type, size: "Pending", source: "Mobile intake", hash: "SHA256 pending", state: "Quarantined", color: "#fbbf24" };
    setEvidence((current) => [item, ...current]);
    setName("");
    setType(types[0]);
    setIsAddOpen(false);
  };

  const renderItem = ({ item }: { item: Evidence }) => (
    <Pressable onPress={() => setSelected(item)} style={({ pressed }) => [styles.evidenceCard, pressed && styles.pressed]}>
      <View style={styles.evidenceHeader}><View style={[styles.fileIcon, { backgroundColor: `${item.color}18` }]}><MaterialIcons name={item.type === "PCAP" ? "wifi-tethering" : item.type === "Memory dump" ? "memory" : item.type === "Log file" ? "receipt-long" : "storage"} size={19} color={item.color} /></View><View style={styles.evidenceCopy}><Text style={styles.evidenceName}>{item.name}</Text><Text style={styles.evidenceType}>{item.type} · {item.size}</Text></View><MaterialIcons name="chevron-right" size={20} color="#5e7d90" /></View>
      <View style={styles.evidenceMeta}><View style={styles.metaItem}><MaterialIcons name="computer" size={13} color="#6d899e" /><Text style={styles.metaText}>{item.source}</Text></View><View style={styles.metaItem}><MaterialIcons name="fingerprint" size={13} color="#6d899e" /><Text style={styles.metaText}>{item.hash}</Text></View><View style={[styles.stateChip, { backgroundColor: `${item.color}14` }]}><View style={[styles.tinyDot, { backgroundColor: item.color }]} /><Text style={[styles.stateText, { color: item.color }]}>{item.state}</Text></View></View>
    </Pressable>
  );

  return (
    <ScreenContainer className="px-5" containerClassName="bg-background">
      <FlatList
        data={evidence}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={<View>
          <View style={styles.screenTop}><View><Text style={styles.kicker}>CASE / CASE-2026-014</Text><Text style={styles.title}>Evidence custody</Text><Text style={styles.subtitle}>Preserve first. Analyze second.</Text></View><Pressable onPress={() => setIsAddOpen(true)} style={({ pressed }) => [styles.addButton, pressed && styles.pressed]}><MaterialIcons name="add" size={22} color="#07111f" /></Pressable></View>
          <View style={styles.integrityCard}><View style={styles.integrityRing}><MaterialIcons name="verified-user" size={24} color="#4ade80" /></View><View style={styles.integrityCopy}><Text style={styles.integrityTitle}>Chain of custody intact</Text><Text style={styles.integrityText}>128 artifacts · 128 SHA-256 records · 0 mutations</Text></View><Text style={styles.integrityScore}>98%</Text></View>
          <View style={styles.filterRow}><View style={styles.filterActive}><Text style={styles.filterActiveText}>All evidence</Text></View><View style={styles.filter}><Text style={styles.filterText}>Needs review</Text><Text style={styles.filterCount}>3</Text></View><View style={styles.filter}><Text style={styles.filterText}>PCAP</Text></View></View>
          <Text style={styles.sectionTitle}>Read-only artifact vault</Text>
        </View>}
        ListFooterComponent={<View style={styles.policyCard}><MaterialIcons name="policy" size={21} color="#58a6ff" /><View style={styles.policyCopy}><Text style={styles.policyTitle}>Controlled acquisition policy</Text><Text style={styles.policyText}>Original files are immutable. Uploads are quarantined, hashed, and linked to an authorized source before analysis.</Text></View></View>}
      />

      <Modal visible={isAddOpen} transparent animationType="slide" onRequestClose={() => setIsAddOpen(false)}><View style={styles.modalBackdrop}><View style={styles.modalCard}><View style={styles.modalHandle} /><View style={styles.modalHeader}><View><Text style={styles.kicker}>EVIDENCE ACQUISITION</Text><Text style={styles.modalTitle}>Add artifact</Text></View><Pressable onPress={() => setIsAddOpen(false)}><MaterialIcons name="close" size={22} color="#8aa4b8" /></Pressable></View><Text style={styles.inputLabel}>Synthetic filename</Text><TextInput value={name} onChangeText={setName} placeholder="capture-2026-09-18.pcap" placeholderTextColor="#597387" style={styles.input} /><Text style={styles.inputLabel}>Artifact type</Text><View style={styles.typeRow}>{types.map((item) => <Pressable key={item} onPress={() => setType(item)} style={[styles.typeButton, type === item && styles.typeButtonActive]}><Text style={[styles.typeText, type === item && styles.typeTextActive]}>{item}</Text></Pressable>)}</View><View style={styles.readOnlyNote}><MaterialIcons name="fingerprint" size={16} color="#4ade80" /><Text style={styles.readOnlyText}>SHA-256 and acquisition time will be captured before analysis.</Text></View><Pressable onPress={addEvidence} style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]}><MaterialIcons name="file-upload" size={18} color="#07111f" /><Text style={styles.primaryButtonText}>Quarantine & hash</Text></Pressable></View></View></Modal>

      <Modal visible={!!selected} transparent animationType="fade" onRequestClose={() => setSelected(null)}><View style={styles.detailBackdrop}><View style={styles.detailCard}><View style={styles.modalHeader}><View><Text style={styles.kicker}>EVIDENCE DETAIL</Text><Text style={styles.modalTitle}>{selected?.id}</Text></View><Pressable onPress={() => setSelected(null)}><MaterialIcons name="close" size={22} color="#8aa4b8" /></Pressable></View><Text style={styles.detailName}>{selected?.name}</Text><View style={styles.detailLine}><Text style={styles.detailLabel}>Integrity</Text><Text style={styles.detailValue}>{selected?.state}</Text></View><View style={styles.detailLine}><Text style={styles.detailLabel}>SHA-256</Text><Text style={styles.detailValue}>{selected?.hash}</Text></View><View style={styles.detailLine}><Text style={styles.detailLabel}>Source</Text><Text style={styles.detailValue}>{selected?.source}</Text></View><View style={styles.detailLine}><Text style={styles.detailLabel}>Access mode</Text><Text style={styles.detailValue}>READ ONLY</Text></View><View style={styles.custodyBox}><MaterialIcons name="history" size={17} color="#58a6ff" /><Text style={styles.custodyText}>Acquired by A. Rao · 18 Sep 2026, 08:42 · audit event #004821</Text></View></View></View></Modal>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  listContent: { paddingTop: 10, paddingBottom: 28 }, screenTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18 }, kicker: { color: "#58a6ff", fontSize: 10, fontWeight: "900", letterSpacing: 1.2 }, title: { color: "#e6f7ff", fontSize: 28, fontWeight: "800", letterSpacing: -0.7, marginTop: 6 }, subtitle: { color: "#7894a8", fontSize: 13, marginTop: 5 }, addButton: { width: 44, height: 44, borderRadius: 15, backgroundColor: "#58a6ff", alignItems: "center", justifyContent: "center" }, pressed: { opacity: 0.78, transform: [{ scale: 0.97 }] }, integrityCard: { flexDirection: "row", alignItems: "center", backgroundColor: "#0b2430", borderColor: "#194c51", borderWidth: 1, borderRadius: 17, padding: 14, marginBottom: 18 }, integrityRing: { width: 43, height: 43, borderRadius: 22, borderWidth: 2, borderColor: "#4ade80", alignItems: "center", justifyContent: "center", marginRight: 11 }, integrityCopy: { flex: 1 }, integrityTitle: { color: "#c9fff0", fontSize: 13, fontWeight: "800" }, integrityText: { color: "#72a9ae", fontSize: 10, marginTop: 4 }, integrityScore: { color: "#4ade80", fontSize: 20, fontWeight: "900" }, filterRow: { flexDirection: "row", gap: 8, marginBottom: 22 }, filterActive: { backgroundColor: "#17385a", paddingHorizontal: 12, paddingVertical: 8, borderRadius: 10 }, filterActiveText: { color: "#86c7ff", fontSize: 11, fontWeight: "800" }, filter: { flexDirection: "row", gap: 5, alignItems: "center", backgroundColor: "#0d1b2a", borderWidth: 1, borderColor: "#193349", paddingHorizontal: 11, paddingVertical: 8, borderRadius: 10 }, filterText: { color: "#7894a8", fontSize: 11, fontWeight: "700" }, filterCount: { color: "#fbbf24", fontSize: 10, fontWeight: "900" }, sectionTitle: { color: "#d8ebf2", fontSize: 16, fontWeight: "800", marginBottom: 10 }, evidenceCard: { backgroundColor: "#0d1b2a", borderWidth: 1, borderColor: "#193349", borderRadius: 17, padding: 14, marginBottom: 10 }, evidenceHeader: { flexDirection: "row", alignItems: "center" }, fileIcon: { width: 38, height: 38, borderRadius: 12, alignItems: "center", justifyContent: "center", marginRight: 10 }, evidenceCopy: { flex: 1 }, evidenceName: { color: "#dcecf2", fontSize: 13, fontWeight: "800" }, evidenceType: { color: "#6d899e", fontSize: 10, marginTop: 4 }, evidenceMeta: { flexDirection: "row", alignItems: "center", gap: 10, borderTopWidth: 1, borderTopColor: "#162d40", marginTop: 13, paddingTop: 11 }, metaItem: { flexDirection: "row", alignItems: "center", gap: 4, flexShrink: 1 }, metaText: { color: "#6f91a5", fontSize: 9 }, stateChip: { flexDirection: "row", alignItems: "center", gap: 4, borderRadius: 6, paddingHorizontal: 6, paddingVertical: 4, marginLeft: "auto" }, tinyDot: { width: 5, height: 5, borderRadius: 3 }, stateText: { fontSize: 9, fontWeight: "800" }, policyCard: { flexDirection: "row", gap: 10, backgroundColor: "#0d1b2a", borderRadius: 16, borderWidth: 1, borderColor: "#193349", padding: 14, marginTop: 8 }, policyCopy: { flex: 1 }, policyTitle: { color: "#c7e4f7", fontSize: 12, fontWeight: "800" }, policyText: { color: "#6f91a5", fontSize: 10, lineHeight: 15, marginTop: 4 }, modalBackdrop: { flex: 1, backgroundColor: "rgba(1,8,16,0.78)", justifyContent: "flex-end" }, modalCard: { backgroundColor: "#0d1b2a", borderTopLeftRadius: 26, borderTopRightRadius: 26, borderWidth: 1, borderColor: "#25465c", padding: 22, paddingBottom: 34 }, modalHandle: { width: 42, height: 4, borderRadius: 2, backgroundColor: "#35546a", alignSelf: "center", marginBottom: 20 }, modalHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }, modalTitle: { color: "#e6f7ff", fontSize: 22, fontWeight: "800", marginTop: 5 }, inputLabel: { color: "#9eb7c6", fontSize: 11, fontWeight: "700", marginBottom: 7, marginTop: 8 }, input: { color: "#e6f7ff", backgroundColor: "#091725", borderWidth: 1, borderColor: "#27475c", borderRadius: 12, paddingHorizontal: 13, paddingVertical: 12, fontSize: 13 }, typeRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 }, typeButton: { borderRadius: 10, borderWidth: 1, borderColor: "#27475c", paddingHorizontal: 10, paddingVertical: 8 }, typeButtonActive: { backgroundColor: "#17385a", borderColor: "#58a6ff" }, typeText: { color: "#7894a8", fontSize: 10, fontWeight: "700" }, typeTextActive: { color: "#9dd2ff" }, readOnlyNote: { flexDirection: "row", gap: 8, alignItems: "center", backgroundColor: "#0b2430", borderRadius: 11, padding: 11, marginVertical: 16 }, readOnlyText: { flex: 1, color: "#77a9ab", fontSize: 11, lineHeight: 16 }, primaryButton: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 7, backgroundColor: "#58a6ff", borderRadius: 13, paddingVertical: 14 }, primaryButtonText: { color: "#07111f", fontWeight: "900", fontSize: 13 }, detailBackdrop: { flex: 1, backgroundColor: "rgba(1,8,16,0.84)", alignItems: "center", justifyContent: "center", padding: 20 }, detailCard: { width: "100%", backgroundColor: "#0d1b2a", borderWidth: 1, borderColor: "#27475c", borderRadius: 22, padding: 20 }, detailName: { color: "#e6f7ff", fontSize: 17, fontWeight: "800", marginBottom: 16 }, detailLine: { flexDirection: "row", justifyContent: "space-between", borderTopWidth: 1, borderTopColor: "#162d40", paddingVertical: 12 }, detailLabel: { color: "#6f91a5", fontSize: 11 }, detailValue: { color: "#cfe5ef", fontSize: 11, fontWeight: "700" }, custodyBox: { flexDirection: "row", gap: 8, backgroundColor: "#102b43", padding: 11, borderRadius: 10, marginTop: 10 }, custodyText: { flex: 1, color: "#83b7d2", fontSize: 10, lineHeight: 15 },
});
