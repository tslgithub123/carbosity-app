import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { MaterialTheme } from '@/constants/MaterialTheme';
import { router } from 'expo-router';
import React from 'react';
import { useColorScheme } from 'react-native';
import { ScrollView, StatusBar, StyleSheet, View, TouchableOpacity } from 'react-native';
import { Text, Button, Divider } from 'react-native-paper';

export default function LifeStyleScreen() {
    const colorScheme = useColorScheme();
      const THEME_COLORS = colorScheme === 'dark' ? MaterialTheme.schemes.dark : MaterialTheme.schemes.light;
      
    return (
        <>
            <ThemedView style={[styles.container]}>
                <ScrollView style={styles.scrollContent} contentContainerStyle={styles.contentContainer}>
                    {/* Header Section */}
                          <ThemedText style={{textAlign: 'center', padding: 16, fontSize: 20}}>My Lifestyle</ThemedText>
                    

                    {/* Month Navigation */}
                    <ThemedView style={styles.monthNavigation}>
                        <TouchableOpacity style={styles.monthItem}>
                            <ThemedText style={styles.monthText}>January</ThemedText>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.monthItem, styles.activeMonth]}>
                            <ThemedText style={[styles.monthText, styles.activeMonthText]}>February</ThemedText>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.monthItem}>
                            <ThemedText style={styles.monthText}>March</ThemedText>
                        </TouchableOpacity>
                    </ThemedView>

                    {/* Emission Summary */}
                    <ThemedView style={styles.emissionSummary}>
                        <ThemedView style={styles.emissionRow}>
                            <ThemedText style={styles.emissionLabel}>₹ 24378</ThemedText>
                            <ThemedText style={styles.emissionLabel}>4.32 kg CO2</ThemedText>
                        </ThemedView>
                        <Button onPress={() => router.push({ pathname: "/lifestyle/MonthScreen", params: { headerTitle: "Lifestyle Details" } })} mode="contained" >
                            View details
                        </Button>   
                    </ThemedView>

                    {/* Suggestions Section */}
                    <ThemedView style={styles.suggestions}>
                        {/* Positive Feedback */}
                        <ThemedView style={styles.suggestionCard}>
                            <ThemedText style={styles.suggestionTitle}>Keep it going!</ThemedText>
                            <ThemedText style={styles.suggestionDescription}>
                                You prefer home-cooked meals. You avoid emissions from long-haulled food. You should try 
                                these great organic options at a market close by.
                            </ThemedText>
                        </ThemedView>
                        <Divider style={styles.divider} />
                        {/* Improvement Suggestion */}
                        <ThemedView style={styles.suggestionCard}>
                            <ThemedText style={styles.suggestionTitle}>What can you do better?</ThemedText>
                            <ThemedText style={styles.suggestionDescription}>
                                Cut down on fast fashion. Try these sustainable clothing options instead. Cut out a chunk of waste!
                            </ThemedText>
                        </ThemedView>
                        <Button mode="contained" onPress={()=>{}} style={styles.offsetButton}>
                            Offset emissions
                        </Button>
                       
                    </ThemedView>
                </ScrollView>
            </ThemedView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: StatusBar.currentHeight,
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
    },
    contentContainer: {
        paddingHorizontal: 16,
        paddingBottom: 100,
    },
    header: {
        backgroundColor: '#b2dfdb',
        paddingVertical: 20,
        alignItems: 'center',
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        
    },
    monthNavigation: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 16,
    },
    monthItem: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#e0f7fa',
        borderRadius: 20,
    },
    activeMonth: {
        backgroundColor: '#80cbc4',
    },
    monthText: {
        color: '#004d40',
        fontSize: 16,
    },
    activeMonthText: {
        fontWeight: 'bold',
        color: '#ffffff',
    },
    emissionSummary: {
        alignItems: 'center',
        marginVertical: 16,
    },
    emissionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 10,
    },
    emissionLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        
    },
    detailsButton: {
        backgroundColor: '#004d40',
        borderRadius: 10,
    },
    suggestions: {
        marginTop: 20,
    },
    suggestionCard: {
        paddingVertical: 16,
    },
    suggestionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        
    },
    suggestionDescription: {
        marginTop: 10,
        fontSize: 14,
        
    },
    divider: {
        marginVertical: 16,
    },
    offsetButton: {
        
        marginTop: 20,
        borderRadius: 10,
    },
});
