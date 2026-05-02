import { Tabs } from 'expo-router';
import { I18nManager } from 'react-native';

I18nManager.forceRTL(true);

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{
      headerStyle: { backgroundColor: '#1a5276' },
      headerTintColor: '#fff',
      headerTitleAlign: 'center',
      tabBarActiveTintColor: '#1a5276',
      tabBarInactiveTintColor: '#999',
      tabBarStyle: { height: 60, paddingBottom: 8 },
      tabBarLabelStyle: { fontSize: 11 },
    }}>
      <Tabs.Screen name="index" options={{ title: 'الرئيسية', tabBarLabel: 'الرئيسية', tabBarIcon: ({ color }) => <TabIcon emoji="🏠" color={color} /> }} />
      <Tabs.Screen name="lessons" options={{ title: 'دروسي', tabBarLabel: 'دروسي', tabBarIcon: ({ color }) => <TabIcon emoji="📚" color={color} /> }} />
      <Tabs.Screen name="homeworks" options={{ title: 'الواجبات', tabBarLabel: 'الواجبات', tabBarIcon: ({ color }) => <TabIcon emoji="📝" color={color} /> }} />
      <Tabs.Screen name="messages" options={{ title: 'الرسائل', tabBarLabel: 'الرسائل', tabBarIcon: ({ color }) => <TabIcon emoji="💬" color={color} /> }} />
      <Tabs.Screen name="profile" options={{ title: 'حسابي', tabBarLabel: 'حسابي', tabBarIcon: ({ color }) => <TabIcon emoji="👤" color={color} /> }} />
    </Tabs>
  );
}

function TabIcon({ emoji, color }: { emoji: string; color: string }) {
  const { Text } = require('react-native');
  return <Text style={{ fontSize: 22, opacity: color === '#1a5276' ? 1 : 0.5 }}>{emoji}</Text>;
}
