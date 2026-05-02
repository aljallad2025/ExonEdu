import { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { supabase } from '../../lib/supabase';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const [profile, setProfile] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      if (user) supabase.from('users').select('*').eq('id', user.id).single().then(({ data }) => setProfile(data));
    });
  }, []);

  const handleLogout = async () => {
    Alert.alert('تسجيل الخروج', 'هل أنت متأكد؟', [
      { text: 'إلغاء', style: 'cancel' },
      { text: 'خروج', style: 'destructive', onPress: async () => { await supabase.auth.signOut(); router.replace('/(auth)/login'); } }
    ]);
  };

  const roleLabel = profile?.role === 'teacher' ? 'معلم' : profile?.role === 'admin' ? 'مدير' : 'طالب';

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}><Text style={styles.avatarText}>{profile?.full_name?.[0] || '؟'}</Text></View>
        <Text style={styles.name}>{profile?.full_name || 'المستخدم'}</Text>
        <Text style={styles.role}>{roleLabel}</Text>
      </View>
      <View style={styles.infoCard}>
        <InfoRow label="البريد الإلكتروني" value={user?.email} />
        <InfoRow label="القسم" value={profile?.section} />
        <InfoRow label="المرحلة" value={profile?.grade} />
      </View>
      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Text style={styles.logoutText}>🚪 تسجيل الخروج</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function InfoRow({ label, value }: { label: string; value?: string }) {
  const { View, Text, StyleSheet } = require('react-native');
  return (
    <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#f0f4f8' }}>
      <Text style={{ fontWeight: '600', color: '#1a5276' }}>{label}</Text>
      <Text style={{ color: '#555' }}>{value || '-'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f4f8' },
  header: { backgroundColor: '#1a5276', alignItems: 'center', padding: 32, paddingTop: 20 },
  avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  avatarText: { fontSize: 36, color: '#1a5276', fontWeight: 'bold' },
  name: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
  role: { color: '#aed6f1', fontSize: 14, marginTop: 4 },
  infoCard: { backgroundColor: '#fff', margin: 16, borderRadius: 16, padding: 16, elevation: 2 },
  logoutBtn: { backgroundColor: '#fff', margin: 16, borderRadius: 16, padding: 18, alignItems: 'center', elevation: 2 },
  logoutText: { color: '#e74c3c', fontSize: 16, fontWeight: 'bold' },
});
