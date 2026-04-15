import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

export default function UserDetailScreen({ route }) {
  const user = route?.params?.user;

  if (!user) {
    return (
      <View style={styles.centered}>
        <Text style={{ color: "red" }}>⚠️ No user data received.</Text>
        <Text>No user data found.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>
          {user.name.charAt(0).toUpperCase()}
        </Text>
      </View>
      <Text style={styles.name}>{user.name}</Text>

      <View style={styles.card}>
        <Text style={styles.label}>📧 Email</Text>
        <Text style={styles.value}>{user.email}</Text>

        <Text style={styles.label}>📞 Phone</Text>
        <Text style={styles.value}>{user.phone}</Text>

        <Text style={styles.label}>🌐 Website</Text>
        <Text style={styles.value}>{user.website}</Text>

        <Text style={styles.label}>📍 City</Text>
        <Text style={styles.value}>{user.address?.city}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: "center", padding: 20, backgroundColor: "#F9FAFB", flexGrow: 1 },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  avatar: {
    width: 80, height: 80, borderRadius: 40,
    backgroundColor: "#4F46E5",
    justifyContent: "center", alignItems: "center", marginBottom: 12,
  },
  avatarText: { color: "#fff", fontSize: 32, fontWeight: "bold" },
  name: { fontSize: 22, fontWeight: "bold", marginBottom: 20, color: "#111827" },
  card: { width: "100%", backgroundColor: "#fff", borderRadius: 12, padding: 20, elevation: 3 },
  label: { fontSize: 12, color: "#9CA3AF", marginTop: 12 },
  value: { fontSize: 15, color: "#111827", marginTop: 2 },
});