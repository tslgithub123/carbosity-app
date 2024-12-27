import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { StyleSheet, ScrollView } from "react-native";
import { List, Button, Divider, useTheme } from "react-native-paper";
import { useState } from "react";
import useAuthStore from "@/store/useAuthStore";
import { useRouter } from "expo-router";
import { MaterialSwitch } from "@/components/ui/switch/MaterialSwitch";
import { MaterialTheme } from "@/constants/MaterialTheme";

export default function Profile() {
    const theme = useTheme(); 
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [darkMode, setDarkMode] = useState(false);
    const { setIsLoggedIn } = useAuthStore();
    const router = useRouter();

    const handleToggleNotifications = () => setNotificationsEnabled((prev) => !prev);
    const handleToggleDarkMode = () => setDarkMode((prev) => !prev);
    const handleLogout = () => {
        setIsLoggedIn(false);
        router.replace("/login");
    };

    return (
        <ThemedView style={styles.container}>
            <ScrollView>
                {/* Account Section */}
                <List.Section>
                    <List.Subheader style={{ color: MaterialTheme.coreColors.primary }}>
                        Account
                    </List.Subheader>
                    <List.Item
                        title="Edit Profile"
                        left={(props) => (
                            <List.Icon {...props} icon="account-edit" color={MaterialTheme.schemes.light.onPrimaryContainer} />
                        )}
                        onPress={() => console.log("Edit Profile pressed")}
                    />
                    <List.Item
                        title="Change Password"
                        left={(props) => (
                            <List.Icon {...props} icon="lock-reset" color={MaterialTheme.schemes.light.onPrimaryContainer} />
                        )}
                        onPress={() => console.log("Change Password pressed")}
                    />
                </List.Section>

                <Divider style={styles.divider} />

                {/* Preferences Section */}
                <List.Section>
                    <List.Subheader style={{ color: MaterialTheme.schemes.light.onSurfaceVariant }}>
                        Preferences
                    </List.Subheader>
                    <List.Item
                        title="Enable Notifications"
                        left={(props) => (
                            <List.Icon {...props} icon="bell" color={MaterialTheme.schemes.light.onSurface} />
                        )}
                        right={() => (
                            <MaterialSwitch
                                switchOnIcon="check"
                                switchOffIcon="close"
                                selected={notificationsEnabled}
                                onPress={handleToggleNotifications}
                            />
                        )}
                    />
                    <List.Item
                        title="Dark Mode"
                        left={(props) => (
                            <List.Icon {...props} icon="theme-light-dark" color={MaterialTheme.schemes.light.onSurface} />
                        )}
                        right={() => (
                            <MaterialSwitch
                                switchOnIcon="check"
                                switchOffIcon="close"
                                selected={darkMode}
                                onPress={handleToggleDarkMode}
                            />
                        )}
                    />
                </List.Section>

                <Divider style={styles.divider} />

                {/* About Section */}
                <List.Section>
                    <List.Subheader style={{ color: MaterialTheme.schemes.light.onSurfaceVariant }}>
                        About
                    </List.Subheader>
                    <List.Item
                        title="Privacy Policy"
                        left={(props) => (
                            <List.Icon {...props} icon="shield-account" color={MaterialTheme.schemes.light.onSurface} />
                        )}
                        onPress={() => console.log("Privacy Policy pressed")}
                    />
                    <List.Item
                        title="Terms of Service"
                        left={(props) => (
                            <List.Icon {...props} icon="file-document-outline" color={MaterialTheme.schemes.light.onSurface} />
                        )}
                        onPress={() => console.log("Terms of Service pressed")}
                    />
                </List.Section>

                {/* Logout Section */}
                <ThemedView style={styles.footerContainer}>
                    <Button
                        mode="contained-tonal"
                        onPress={handleLogout}
                        icon="logout"
                        style={styles.logoutButton}
                        buttonColor={MaterialTheme.schemes.light.primaryContainer}
                        textColor={MaterialTheme.schemes.light.onPrimaryContainer}
                    >
                        Logout
                    </Button>
                </ThemedView>
            </ScrollView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    divider: {
        marginVertical: 12,
        backgroundColor: MaterialTheme.schemes.light.outline,
    },
    footerContainer: {
        marginTop: 24,
        alignItems: "center",
    },
    logoutButton: {
        width: "80%",
    },
});
