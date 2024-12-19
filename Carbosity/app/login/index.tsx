import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { router } from "expo-router";
import { StyleSheet } from "react-native";
import { Button, TextInput, Surface } from "react-native-paper";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [responseData, setResponseData] = useState(null);
  
    const loginMutation = useMutation<any, Error, { emailAddress: string; password: string }>({
      mutationFn: async (credentials) => {
        const response = await fetch('http://192.168.1.47:8085/api/auth/login', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(credentials)
        });
  
        if (!response.ok) {
          const errorData = await response.text();
          throw new Error(errorData || 'Login failed');
        }
  
        const data = await response.json();
        return data;
      },
      onSuccess: (data) => {
        console.log('Login successful. Server response:', data);
        setResponseData(data);
        // router.replace("/(tabs)");
      },
      onError: (error) => {
        console.error('Login error:', error);
        setResponseData(null);
      }
    });
  
    const handleLogin = () => {
      loginMutation.mutate({ emailAddress: email, password });
    };
  
    return (
      <ThemedView style={styles.container}>
        <Surface style={styles.formContainer} elevation={2}>
          <ThemedText style={styles.title}>Login to continue </ThemedText>
          
          <TextInput
mode="outlined"
label="Email"
value={email}
onChangeText={setEmail}
style={styles.input}
keyboardType="email-address"
autoCapitalize="none"
/>
<TextInput
mode="outlined"
label="Password"
value={password}
onChangeText={setPassword}
secureTextEntry={!passwordVisible}
style={styles.input}
right={
<TextInput.Icon
icon={passwordVisible ? "eye-off" : "eye"}
onPress={() => setPasswordVisible(!passwordVisible)}
/>
}
/>
  
          <Button
            mode="contained"
            onPress={handleLogin}
            style={styles.loginButton}
            loading={loginMutation.isPending}
            disabled={loginMutation.isPending}
          >
            Login
          </Button>
  
          {loginMutation.isError && (
            <ThemedText style={styles.errorText}>
              {loginMutation.error.message}
            </ThemedText>
          )}
  
          {responseData && (
            <ThemedText style={styles.successText}>
              Response: {JSON.stringify(responseData, null, 2)}
            </ThemedText>
          )}
  
          <Button
            mode="text"
            onPress={() => router.replace("/(tabs)")}
            style={styles.skipButton}
          >
            Skip for now
          </Button>
        </Surface>
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
  formContainer: {
    width: '100%',
    maxWidth: 400,
    padding: 24,
    borderRadius: 12,
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    marginBottom: 16,
  },
  loginButton: {
    marginTop: 8,
    marginBottom: 16,
  },
  skipButton: {
    marginTop: 8,
  },
  errorText: {
    color: 'red',
    marginTop: 8,
    textAlign: 'center',
  },
  successText: {
    color: 'green',
    marginTop: 8,
    textAlign: 'center',
  }
});