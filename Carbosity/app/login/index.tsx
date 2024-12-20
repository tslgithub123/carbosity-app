import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { router } from "expo-router";
import { StyleSheet } from "react-native";
import { Button, TextInput, Surface, useTheme } from "react-native-paper";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import useAuthStore from "@/store/useAuthStore";
import { User } from "@/types/User";

export default function Login() {
  const theme = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [responseData, setResponseData] = useState<User>();

  const validateInputs = () => email.trim() && password.trim();

  const {setToken, setUser} = useAuthStore.getState();
  

  const loginMutation = useMutation<any, Error, { emailAddress: string; password: string }>({
    mutationFn: async (credentials) => {
      const response = await fetch("http://192.168.1.47:8085/api/auth/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData?.message || "Login failed.";
        throw new Error(errorMessage);
      }
    const token = response.headers.get("authorization")?.slice(7);
    // if header is present then console log it
    if (token) {
      setToken(token);
    } else {
      setToken("");
    }
      return response.json();
    },
    onSuccess: (data) => {
      console.log("Login success:", data);
      setUser(data?.data);
      setResponseData(data);
      router.replace("/(tabs)");
    },
    onError: (error) => {
      console.error("Login error:", error.message);
    },
  });

  const handleLogin = () => {
    if (!validateInputs()) return;
    loginMutation.mutate({ emailAddress: email, password });
  };

  return (
    <ThemedView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Surface style={styles.formContainer} elevation={3}>
        <ThemedText style={[styles.title, { color: theme.colors.onSurface }]}>
          Login
        </ThemedText>
        <ThemedText style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}>
          Access your account to continue
        </ThemedText>

        <TextInput
          mode="outlined"
          label="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholder="Enter your email"
          theme={{ roundness: 8 }}
        />
        <TextInput
          mode="outlined"
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!passwordVisible}
          style={styles.input}
          placeholder="Enter your password"
          right={
            <TextInput.Icon
              icon={passwordVisible ? "eye-off-outline" : "eye-outline"}
              onPress={() => setPasswordVisible(!passwordVisible)}
            />
          }
          theme={{ roundness: 8 }}
        />

        <Button
          mode="contained"
          onPress={handleLogin}
          style={styles.loginButton}
          loading={loginMutation.isPending}
          disabled={loginMutation.isPending || !validateInputs()}
          buttonColor={theme.colors.primary}
          textColor={theme.colors.onPrimary}
        >
          Login
        </Button>

        {loginMutation.isError && (
          <ThemedText style={[styles.errorText, { color: theme.colors.error }]}>
            {loginMutation.error.message}
          </ThemedText>
        )}

        {/* {responseData && (
          <ThemedText style={[styles.successText, { color: theme.colors.primary }]}>
            Welcome, {responseData.data.firstName || "User"}!
          </ThemedText>
        )} */}

        <Button
          mode="text"
          onPress={() => router.replace("/(tabs)")}
          style={styles.skipButton}
          textColor={theme.colors.primary}
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
    padding: 24,
  },
  formContainer: {
    width: "100%",
    maxWidth: 400,
    padding: 24,
    borderRadius: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: "600",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 24,
    textAlign: "center",
  },
  input: {
    marginBottom: 16,
  },
  loginButton: {
    marginTop: 16,
    marginBottom: 16,
    borderRadius: 8,
  },
  skipButton: {
    marginTop: 8,
    alignSelf: "center",
  },
  errorText: {
    fontSize: 14,
    textAlign: "center",
    marginTop: 8,
  },
  successText: {
    fontSize: 14,
    textAlign: "center",
    marginTop: 8,
  },
});
