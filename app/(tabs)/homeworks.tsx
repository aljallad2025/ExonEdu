import { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { supabase } from '../../lib/supabase';

export default function HomeworksScreen() {
  const [homeworks, setHomeworks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from('homeworks').select('*').order('created_at', { ascending: false }).limit(20)
      .then(({ data }) => { setHomeworks(data || []); setLoading(false); });
  }, []);

  if (loading) return <View style={styles.center}><ActivityIndicator size="large" color="#1a5276" /></View>;

  return (
    <ScrollView style={styles.container}>
      {homeworks.length === 0 && <Text style={styles.empty}>لا توجد واجبات حالياً</Text>}
      {homeworks.map((h, i) => (
        <View key={i} style={[styles.card, { borderRightColor: h.status === 'completed' ? '#27ae60' : '#e74c3c', borderRightWidth: 4 }]}>
          <Text style={styles.title}>{h.title || 'واجب'}</Text>
          <Text style={styles.date}>📅 {h.due_date || h.created_at?.slice(0,10)}</Text>
          {h.description && <Text style={styles.desc}>{h.description}</Text>}
          <View style={[styles.badge, { backgroundColor: h.status === 'completed' ? '#eafaf1' : '#fdedec' }]}>
            <Text style={{ color: h.status === 'completed' ? '#27ae60' : '#e74c3c', fontSize: 12 }}>
              {h.status === 'completed' ? '✅ منجز' : '⏳ قيد الانتظار'}
            </Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f4f8', padding: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  empty: { textAlign: 'center', color: '#999', marginTop: 40, fontSize: 16 },
  card: { backgroundColor: '#fff', borderRadius: 14, padding: 16, marginBottom: 12, elevation: 2 },
  title: { fontSize: 16, fontWeight: 'bold', color: '#1a5276', textAlign: 'right' },
  date: { fontSize: 12, color: '#999', textAlign: 'right', marginTop: 4 },
  desc: { fontSize: 14, color: '#555', textAlign: 'right', marginTop: 8 },
  badge: { alignSelf: 'flex-end', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20, marginTop: 8 },
});
