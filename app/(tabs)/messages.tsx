import { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { supabase } from '../../lib/supabase';

export default function MessagesScreen() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string>('');

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) return;
      setUserId(user.id);
      supabase.from('messages').select('*').or('sender_id.eq.' + user.id + ',receiver_id.eq.' + user.id)
        .order('created_at', { ascending: false }).limit(30)
        .then(({ data }) => { setMessages(data || []); setLoading(false); });
    });
  }, []);

  if (loading) return <View style={styles.center}><ActivityIndicator size="large" color="#1a5276" /></View>;

  return (
    <ScrollView style={styles.container}>
      {messages.length === 0 && <Text style={styles.empty}>لا توجد رسائل</Text>}
      {messages.map((m, i) => {
        const isMine = m.sender_id === userId;
        return (
          <View key={i} style={[styles.bubble, isMine ? styles.mine : styles.theirs]}>
            <Text style={[styles.msgText, { color: isMine ? '#fff' : '#1a5276' }]}>{m.content}</Text>
            <Text style={[styles.time, { color: isMine ? '#d6eaf8' : '#999' }]}>{m.created_at?.slice(11,16)}</Text>
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f4f8', padding: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  empty: { textAlign: 'center', color: '#999', marginTop: 40, fontSize: 16 },
  bubble: { maxWidth: '80%', padding: 12, borderRadius: 16, marginBottom: 10 },
  mine: { backgroundColor: '#1a5276', alignSelf: 'flex-end', borderBottomRightRadius: 4 },
  theirs: { backgroundColor: '#fff', alignSelf: 'flex-start', borderBottomLeftRadius: 4, elevation: 1 },
  msgText: { fontSize: 15 },
  time: { fontSize: 10, marginTop: 4, textAlign: 'right' },
});
