import useAuthStore from "@/store/useAuthStore";
import { Redirect } from "expo-router";

export default function Index() {
  const {isLoggedIn, isWelcomed} = useAuthStore();

  if (!isLoggedIn && !isWelcomed) {
    return <Redirect href="/welcome/screen1" />;
  }
  
  return <Redirect href="/(tabs)" />;
}
