import { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { supabase } from '../../lib/supabase';

export default function LessonsScreen() {
  const [lessons, setLessons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from('daily_lessons').select('*').order('created_at', { ascending: false }).limit(20)
      .then(({ data }) => { setLessons(data || []); setLoading(false); });
  }, []);

  if (loading) return <View style={styles.center}><ActivityIndicator size="large" color="#1a5276" /></View>;

  return (
    <ScrollView style={styles.container}>
      {lessons.length === 0 && <Text style={styles.empty}>لا توجد دروس حالياً</Text>}
      {lessons.map((l, i) => (
        <View key={i} style={styles.card}>
          <Text style={styles.title}>{l.title || l.subject || 'درس'}</Text>
          <Text style={styles.date}>{l.lesson_date || l.created_at?.slice(0,10)}</Text>
          {l.description && <Text style={styles.desc}>{l.description}</Text>}
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
});
