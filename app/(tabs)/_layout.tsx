import { Tabs } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Platform } from "react-native";

import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";

export default function TabLayout() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const bottomPadding = Platform.OS === "web" ? 12 : Math.max(insets.bottom, 8);
  const tabBarHeight = 58 + bottomPadding;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
        tabBarStyle: {
          paddingTop: 8,
          paddingBottom: bottomPadding,
          height: tabBarHeight,
          backgroundColor: colors.background,
          borderTopColor: colors.border,
          borderTopWidth: 0.5,
        },
        tabBarLabelStyle: { fontSize: 10, fontWeight: "700" },
      }}
    >
      <Tabs.Screen name="index" options={{ title: "Overview", tabBarIcon: ({ color }) => <IconSymbol size={22} name="house.fill" color={color} /> }} />
      <Tabs.Screen name="evidence" options={{ title: "Evidence", tabBarIcon: ({ color }) => <IconSymbol size={22} name="folder.fill" color={color} /> }} />
      <Tabs.Screen name="analyze" options={{ title: "Analyze", tabBarIcon: ({ color }) => <IconSymbol size={22} name="waveform.path.ecg" color={color} /> }} />
      <Tabs.Screen name="reports" options={{ title: "Reports", tabBarIcon: ({ color }) => <IconSymbol size={22} name="doc.text.fill" color={color} /> }} />
    </Tabs>
  );
}
