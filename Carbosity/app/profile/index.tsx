import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native";
import { List, Button, Divider } from "react-native-paper";
import { useMemo, useCallback } from "react";
import useAuthStore from "@/store/useAuthStore";
import { useRouter } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import { MaterialSwitch } from "@/components/ui/switch/MaterialSwitch";
import { MaterialTheme } from "@/constants/MaterialTheme";
import { useSettings } from "@/hooks/useSettings";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {
    const router = useRouter();
    const { setIsLoggedIn } = useAuthStore();
    const { settings, updateSettings } = useSettings(); // Custom hook for managing settings

    // Memoize theme colors to prevent unnecessary re-renders
    const colors = useMemo(() => ({
        primary: MaterialTheme.coreColors.primary,
        onPrimaryContainer: MaterialTheme.schemes.light.onPrimaryContainer,
        onSurface: MaterialTheme.schemes.light.onSurface,
        onSurfaceVariant: MaterialTheme.schemes.light.onSurfaceVariant,
        primaryContainer: MaterialTheme.schemes.light.primaryContainer,
        outline: MaterialTheme.schemes.light.outline,
    }), []);

    // Memoize handlers
    const handleToggleNotifications = useCallback(() => {
        updateSettings('notifications', !settings.notifications);
    }, [settings.notifications, updateSettings]);

    const handleToggleDarkMode = useCallback(() => {
        updateSettings('darkMode', !settings.darkMode);
    }, [settings.darkMode, updateSettings]);

    const handleLogout = useCallback(() => {
        setIsLoggedIn(false);
        router.replace("/login");
    }, [setIsLoggedIn, router]);

    // Memoize list items to prevent unnecessary re-renders
    const ListItems = useMemo(() => ({
        Account: [
            {
                title: "Edit Profile",
                icon: "account-edit",
                onPress: () => console.log("Edit Profile pressed"),
            },
            {
                title: "Change Password",
                icon: "lock-reset",
                onPress: () => console.log("Change Password pressed"),
            },
        ],
        About: [
            {
                title: "Privacy Policy",
                icon: "shield-account",
                onPress: () => console.log("Privacy Policy pressed"),
            },
            {
                title: "Terms of Service",
                icon: "file-document-outline",
                onPress: () => console.log("Terms of Service pressed"),
            },
        ],
    }), []);

    const renderListItem = useCallback(({ title, icon, onPress }: { title: string; icon: string; onPress: () => void }) => (
        <List.Item
            key={title}
            title={title}
            left={(props) => (
                <List.Icon {...props} icon={icon} color={colors.onPrimaryContainer} />
            )}
            onPress={onPress}
        />
    ), [colors.onPrimaryContainer]);

    return (
        <ThemedView style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={true}
            >
                {/* Account Section */}
                <List.Subheader style={[styles.subheader, { color: colors.primary }]}>
                    Account
                </List.Subheader>
                {ListItems.Account.map(renderListItem)}

                <Divider style={[styles.divider, { backgroundColor: colors.outline }]} />

                {/* Preferences Section */}
                <List.Section>
                    <List.Subheader style={[styles.subheader, { color: colors.onSurfaceVariant }]}>
                        Preferences
                    </List.Subheader>
                    <List.Item
                        title="Enable Notifications"
                        left={(props) => (
                            <List.Icon {...props} icon="bell" color={colors.onSurface} />
                        )}
                        right={() => (
                            <MaterialSwitch
                                switchOnIcon="check"
                                switchOffIcon="close"
                                selected={settings.notifications}
                                onPress={handleToggleNotifications}
                            />
                        )}
                    />
                    <List.Item
                        title="Dark Mode"
                        left={(props) => (
                            <List.Icon {...props} icon="theme-light-dark" color={colors.onSurface} />
                        )}
                        right={() => (
                            <MaterialSwitch
                                switchOnIcon="check"
                                switchOffIcon="close"
                                selected={settings.darkMode}
                                onPress={handleToggleDarkMode}
                            />
                        )}
                    />
                </List.Section>

                <Divider style={[styles.divider, { backgroundColor: colors.outline }]} />

                {/* About Section */}
                <List.Section>
                    <List.Subheader style={[styles.subheader, { color: colors.onSurfaceVariant }]}>
                        About
                    </List.Subheader>
                    {ListItems.About.map(renderListItem)}
                </List.Section>

                {/* Logout Section */}
                <ThemedView style={styles.footerContainer}>
                    <Button
                        mode="contained-tonal"
                        onPress={handleLogout}
                        icon="logout"
                        style={styles.logoutButton}
                        buttonColor={colors.primaryContainer}
                        textColor={colors.onPrimaryContainer}
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
    scrollContent: {
        paddingBottom: 100,
        flexGrow: 1,
    },
    subheader: {
        fontSize: 16,
        fontWeight: '600',
    },
    divider: {
        marginVertical: 12,
    },
    footerContainer: {
        marginTop: 24,
        alignItems: "center",
    },
    logoutButton: {
        width: "80%",
        borderRadius: 8,
    },
});

