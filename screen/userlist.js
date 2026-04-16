import React, { useEffect, useState } from "react";
import {
  View, Text, FlatList, ActivityIndicator,
  StyleSheet, TextInput, TouchableOpacity,
} from "react-native";

export default function UserListScreen({ navigation }) {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/users");
      if (!response.ok) throw new Error("Failed to fetch users.");
      const data = await response.json();
      setUsers(data);
      setFilteredUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleSearch = (text) => {
    setSearch(text);
    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  if (loading) return (
    <View style={styles.centered}>
      <ActivityIndicator size="large" color="#4F46E5" />
      <Text style={styles.loadingText}>Loading users...</Text>
    </View>
  );

  if (error) return (
    <View style={styles.centered}>
      <Text style={styles.errorText}>⚠️ {error}</Text>
      <TouchableOpacity style={styles.retryBtn} onPress={fetchUsers}>
        <Text style={styles.retryText}>Retry</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="🔍 Search by name..."
        value={search}
        onChangeText={handleSearch}
        style={styles.search}
      />
      <FlatList
        data={filteredUsers}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={<Text style={styles.emptyText}>No users found.</Text>}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("detail", { user: item })}
          >
            <View style={styles.card}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.info}>📧 {item.email}</Text>
              <Text style={styles.info}>📞 {item.phone}</Text>
              <Text style={styles.info}>📍 {item.address?.city}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container:
   { flex: 1,
     padding: 15,
     backgroundColor: "#F9FAFB" 
   },
  centered:
   { flex: 1,
     justifyContent: "center", 
     alignItems: "center"
   },
  loadingText:
   { marginTop: 10, 
     color: "#6B7280"
   },
  errorText:
   { color: "red",
     fontSize: 16, 
     marginBottom: 10 
  },
  retryBtn: 
  { backgroundColor: "#4F46E5", 
    paddingHorizontal: 20, 
    paddingVertical: 10, 
    borderRadius: 8 
  },
  retryText: 
  { color: "#fff", 
    fontWeight: "bold" 
  },
  search: 
  { backgroundColor: "#fff", 
    padding: 10, 
    borderRadius: 10, 
    marginBottom: 10, 
    borderWidth: 1, 
    borderColor: "#E5E7EB" 
  },
  card: 
  { backgroundColor: "#fff", 
    padding: 15, 
    borderRadius: 12, 
    marginBottom: 10, 
    elevation: 3 
  },
  name: 
  { fontSize: 16, 
    fontWeight: "bold", 
    marginBottom: 5, 
    color: "#111827" 
  },
  info: 
  { color: "#6B7280", 
    marginBottom: 2 
  },
  emptyText: 
  { textAlign: "center", 
    color: "#9CA3AF", 
    marginTop: 30 
  },
});