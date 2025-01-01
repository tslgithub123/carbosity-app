import { ThemedView } from '@/components/ThemedView';
import React, { useEffect } from 'react';
import { ScrollView, StatusBar, StyleSheet, View, TouchableOpacity } from 'react-native';
import { Text, Card } from 'react-native-paper';
import { BarChart, PieChart } from 'react-native-gifted-charts';
import { useSearchParams } from 'expo-router/build/hooks';
import { useNavigation } from '@react-navigation/native';
import { ThemedText } from '@/components/ThemedText';
import { MaterialTheme } from '@/constants/MaterialTheme';
import { useColorScheme } from 'react-native';

export default function EmissionsScreen() {
    const navigation = useNavigation();
    const colorScheme = useColorScheme();
      const THEME_COLORS = colorScheme === 'dark' ? MaterialTheme.schemes.dark : MaterialTheme.schemes.light;
    

    useEffect(() => {
        navigation.setOptions({
            title: 'February',
            headerStyle: { backgroundColor: THEME_COLORS.background },
            headerTintColor: THEME_COLORS.primary,
            
        });
    }, [colorScheme]);

    const pieChartData = [
        { value: 35, color: '#ff8a65', text: 'Petrol' },
        { value: 20, color: '#4fc3f7', text: 'Electricity' },
        { value: 25, color: '#aed581', text: 'Groceries' },
        { value: 20, color: '#ffcc80', text: 'Cooking Gas' },
    ];

    const barChartData = [
        { value: 432, label: 'Feb', frontColor: '#ff8a65' },
        { value: 450, label: 'Jan', frontColor: '#4fc3f7' },
        { value: 480, label: 'Dec', frontColor: '#aed581' },
        { value: 500, label: 'Nov', frontColor: '#ffcc80' },
        { value: 520, label: 'Oct', frontColor: '#80cbc4' },
    ];

    return (
        <>
            <ThemedView style={styles.container}>
                <ScrollView style={styles.scrollContent} contentContainerStyle={styles.contentContainer}>
                    {/* Top Navigation */}
                    <ThemedView style={styles.navigation}>
                        <TouchableOpacity style={styles.navItem}>
                            <ThemedText style={styles.navText}>Impact</ThemedText>
                        </TouchableOpacity>
                        <ThemedView style={[styles.navItem, styles.activeNav]}>
                            <ThemedText style={[styles.navText, styles.activeNavText]}>February 2024</ThemedText>
                        </ThemedView>
                        <TouchableOpacity style={styles.navItem}>
                            <ThemedText style={styles.navText}>Expenses</ThemedText>
                        </TouchableOpacity>
                    </ThemedView>

                    {/* CO2 Emission Summary */}
                    <ThemedView style={styles.emissionSummary}>
                        <ThemedText style={styles.co2Text}>432 kg CO2</ThemedText>
                        <ThemedText style={styles.reductionText}>18 kg lesser than Jan '24. Good job! :)</ThemedText>
                        <ThemedText style={styles.tipText}>Equal to driving a petrol car for 72 km.</ThemedText>
                    </ThemedView>

                    {/* Pie Chart */}
                    <ThemedView style={styles.chartContainer}>
                        <PieChart
                            data={pieChartData}
                            radius={120}
                            showText
                            textColor="#004d40"
                            textSize={12}
                            showValuesAsLabels
                            textBackgroundColor="#ffffff"
                            textBackgroundRadius={10}
                        />
                    </ThemedView>

                    <ThemedView style={styles.barChartContainer}>
                        <ThemedText style={styles.barChartTitle}>Monthly Carbon Footprint</ThemedText>
                        <BarChart
                            data={barChartData}
                            width={300}
                            height={200}
                            barWidth={30}
                            barBorderRadius={4}
                            yAxisLabelWidth={30}
                            xAxisLabelTextStyle={{ color: '#004d40', fontSize: 12 }}
                            yAxisTextStyle={{ color: '#004d40', fontSize: 12 }}
                            maxValue={600}
                            stepValue={100}
                            noOfSections={6}
                        />
                    </ThemedView>

                    {/* Breakdown Section */}
                    <Card style={styles.breakdownCard}>
                        <ThemedText style={styles.breakdownTitle}>Petrol</ThemedText>
                        <ThemedText style={styles.breakdownDescription}>
                            Created the maximum environmental impact.
                        </ThemedText>
                        <ThemedText style={styles.breakdownAmount}>₹5,210</ThemedText>
                    </Card>
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
    navigation: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 16,
        
    },
    navItem: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        backgroundColor: '#e0f7fa',
    },
    activeNav: {
        backgroundColor: '#80cbc4',
    },
    navText: {
        fontSize: 16,
        color: '#004d40',
    },
    activeNavText: {
        fontWeight: 'bold',
        color: '#ffffff',
    },
    emissionSummary: {
        alignItems: 'center',
        marginVertical: 16,
    },
    co2Text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#004d40',
    },
    reductionText: {
        fontSize: 14,
        color: '#388e3c',
        marginTop: 8,
    },
    tipText: {
        fontSize: 12,
        color: '#004d40',
        marginTop: 4,
    },
    chartContainer: {
        alignItems: 'center',
        marginVertical: 16,
    },
    breakdownCard: {
        padding: 16,
        marginTop: 16,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    breakdownTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#004d40',
    },
    breakdownDescription: {
        fontSize: 14,
        color: '#004d40',
        marginVertical: 8,
    },
    breakdownAmount: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#004d40',
    },
    barChartContainer: {
        marginVertical: 16,
        paddingHorizontal: 16,
    },
    barChartTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#004d40',
        marginBottom: 8,
    },
});
