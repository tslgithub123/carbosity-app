import { View, Text, StyleSheet, Button } from "react-native";
import { useRouter } from "expo-router";
import { IconButton, MD3Colors } from "react-native-paper";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import useAuthStore from "@/store/useAuthStore";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

export default function WelcomeScreen1() {
  const [pokedata, setPokedata] = useState(null);
  const router = useRouter();
  const { user, setUser } = useAuthStore();

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon/ditto')
      .then((res) => res.json())
      .then((data) => {
      console.log('Response:', data);
      setPokedata(data);
      })
      .catch((error) => {
      console.error('Error fetching data:', error);
      });


  }, []);

  


  return (
    <ThemedView style={styles.container}>
  
      
      <ThemedText style={styles.text}>screen1</ThemedText>
      <Button title="Next" onPress={() => router.replace("/welcome/screen2")} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
  },
  userInfo: {
    fontSize: 18,
    marginBottom: 20,
  },
});