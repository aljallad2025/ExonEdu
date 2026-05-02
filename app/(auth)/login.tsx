import { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, Image, KeyboardAvoidingView,
  Platform, ActivityIndicator, I18nManager, Alert
} from 'react-native';
import { supabase } from '../../lib/supabase';

I18nManager.forceRTL(true);

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) { Alert.alert('خطأ', 'يرجى إدخال البريد الإلكتروني وكلمة المرور'); return; }
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) Alert.alert('خطأ في تسجيل الدخول', error.message);
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.header}>
        <Text style={styles.logo}>🎓</Text>
        <Text style={styles.title}>Exon Edu</Text>
        <Text style={styles.subtitle}>منصة التعلم الذكي</Text>
      </View>
      <View style={styles.form}>
        <Text style={styles.label}>البريد الإلكتروني</Text>
        <TextInput
          style={styles.input}
          placeholder="أدخل بريدك الإلكتروني"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          textAlign="right"
          placeholderTextColor="#999"
        />
        <Text style={styles.label}>كلمة المرور</Text>
        <TextInput
          style={styles.input}
          placeholder="أدخل كلمة المرور"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          textAlign="right"
          placeholderTextColor="#999"
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>تسجيل الدخول</Text>}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a5276' },
  header: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 60 },
  logo: { fontSize: 64 },
  title: { fontSize: 32, fontWeight: 'bold', color: '#fff', marginTop: 12 },
  subtitle: { fontSize: 16, color: '#aed6f1', marginTop: 8 },
  form: { backgroundColor: '#fff', borderTopLeftRadius: 32, borderTopRightRadius: 32, padding: 32, paddingBottom: 48 },
  label: { fontSize: 14, fontWeight: '600', color: '#1a5276', marginBottom: 8, textAlign: 'right' },
  input: { backgroundColor: '#f0f4f8', borderRadius: 12, padding: 14, fontSize: 15, marginBottom: 16, textAlign: 'right' },
  button: { backgroundColor: '#1a5276', borderRadius: 12, padding: 16, alignItems: 'center', marginTop: 8 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
