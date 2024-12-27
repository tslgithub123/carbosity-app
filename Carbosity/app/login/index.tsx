import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { router } from "expo-router";
import { StyleSheet, View } from "react-native";
import { Button, TextInput, Surface, useTheme } from "react-native-paper";
import { useState } from "react";
import useAuthStore from "@/store/useAuthStore";
import { useLogin } from "@/api";
import { User } from "@/types/User";
import { ApiResponse } from "@/types/ApiResponse";
import { MaterialTheme } from "@/constants/MaterialTheme";

export default function Login() {
  const theme = useTheme();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const { setToken, setUser } = useAuthStore.getState();
  const loginMutation = useLogin();

  const validateInputs = () => emailAddress.trim() && password.trim();

  const handleLogin = () => {
    if (!validateInputs()) return;

    loginMutation.mutate(
      { emailAddress, password },
      {
        onSuccess: (data) => {
          console.log("Login success:", data);
          const token = data.headers.map.authorization.slice(7) || "";
          console.log("Token:", token);
          setToken(token);
          data.json().then((data: ApiResponse<User>) => {
            setUser(data.data);
            router.replace("/(tabs)");
          });
        },
        onError: (error: any) => {
          console.log("Login error:", { emailAddress }, { password });
          console.error("Login error:", error.message);
        },
      }
    );
  };

  // Get colors from MaterialTheme based on the current theme mode
  const colors = theme.dark
    ? MaterialTheme.schemes.dark
    : MaterialTheme.schemes.light;
    

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Surface style={styles.formContainer} >
        <ThemedText style={[styles.title, { color: colors.onSurface }]}>
          Login
        </ThemedText>
        <ThemedText style={[styles.subtitle, { color: colors.onSurfaceVariant }]}>
          Access your account to continue
        </ThemedText>

        <TextInput
          mode="outlined"
          label="Email"
          value={emailAddress}
          onChangeText={setEmailAddress}
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
          style={[styles.loginButton, { backgroundColor: colors.primary }]} 
          loading={loginMutation.isPending}
          disabled={loginMutation.isPending || !validateInputs()}
          buttonColor={colors.primary}
          textColor={colors.onPrimary} 
        >
          Login
        </Button>
        {loginMutation.isError && (
          <ThemedText style={[styles.errorText, { color: colors.error }]}>
            {loginMutation.error?.message}
          </ThemedText>
        )}

        {/* <Button
          mode="text"
          onPress={() => router.replace("/(tabs)")}
          style={styles.skipButton}
          textColor={colors.primary}
        >
          Skip for now
        </Button> */}

        <Button
          mode="text"
          onPress={() => router.push("/register")}
          style={styles.registerButton}
          textColor={colors.primary}
        >
          Don't have an account? Register
        </Button>
      </Surface>
    </View>
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
    
  },
  title: {
    fontSize: 28,
    fontWeight: "600",
    paddingTop: 8,
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
  registerButton: {
    marginTop: 8,
    alignSelf: "center",
  },
  errorText: {
    fontSize: 14,
    textAlign: "center",
    marginTop: 8,
  },
});
