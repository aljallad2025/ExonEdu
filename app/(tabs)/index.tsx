import { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, RefreshControl } from 'react-native';
import { supabase } from '../../lib/supabase';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();

  const fetchData = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
    if (user) {
      const { data } = await supabase.from('users').select('*').eq('id', user.id).single();
      setProfile(data);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const onRefresh = async () => { setRefreshing(true); await fetchData(); setRefreshing(false); };

  const cards = [
    { emoji: '📚', label: 'دروسي', route: '/(tabs)/lessons' },
    { emoji: '📝', label: 'الواجبات', route: '/(tabs)/homeworks' },
    { emoji: '✅', label: 'المنجزة', route: '/(tabs)/homeworks' },
    { emoji: '💬', label: 'الرسائل', route: '/(tabs)/messages' },
    { emoji: '🖼️', label: 'المعرض', route: '/(tabs)/profile' },
    { emoji: '📅', label: 'الجدول', route: '/(tabs)/lessons' },
  ];

  return (
    <ScrollView style={styles.container} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
      <View style={styles.heroCard}>
        <Text style={styles.greeting}>أهلاً 👋</Text>
        <Text style={styles.name}>{profile?.full_name || user?.email || 'الطالب'}</Text>
        <Text style={styles.role}>{profile?.role === 'teacher' ? 'معلم' : profile?.role === 'admin' ? 'مدير' : 'طالب'}</Text>
      </View>
      <Text style={styles.sectionTitle}>الخدمات</Text>
      <View style={styles.grid}>
        {cards.map((card, i) => (
          <TouchableOpacity key={i} style={styles.card} onPress={() => router.push(card.route as any)}>
            <Text style={styles.cardEmoji}>{card.emoji}</Text>
            <Text style={styles.cardLabel}>{card.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f4f8' },
  heroCard: { backgroundColor: '#1a5276', padding: 28, alignItems: 'center', paddingTop: 20 },
  greeting: { color: '#aed6f1', fontSize: 16 },
  name: { color: '#fff', fontSize: 24, fontWeight: 'bold', marginTop: 4, textAlign: 'center' },
  role: { color: '#aed6f1', fontSize: 14, marginTop: 4 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#1a5276', margin: 16, textAlign: 'right' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 12, gap: 12 },
  card: { backgroundColor: '#fff', borderRadius: 16, padding: 20, alignItems: 'center', width: '45%', shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 8, elevation: 3 },
  cardEmoji: { fontSize: 36, marginBottom: 8 },
  cardLabel: { fontSize: 14, fontWeight: '600', color: '#1a5276' },
});
