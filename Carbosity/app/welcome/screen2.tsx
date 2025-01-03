import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { lineStyles } from './lineStyles';

export default function WelcomeScreen2() {
  return (
    <ThemedView style={styles.container}>
      {/* Logo or Illustration */}
      <ThemedView style={styles.upperHalf}>
        <Image
          source={require('../../assets/images/carbosity-header.png')}
          style={styles.logo}
        />
        
      </ThemedView>

      {/* Lower Content */}
      <ThemedView style={styles.lowerHalf}>
        <ThemedText style={lineStyles.line1}>
          Be sustainably smart with your finances.
        </ThemedText>
        <ThemedText style={lineStyles.line2}>
          Carbosity measures your environmental impact based on your expenditures.
        </ThemedText >
        <ThemedText style={lineStyles.line3}>
          Track your expenses, find your impact. Measuring is the first step to sustainability.
        </ThemedText>
      </ThemedView>
      <View style={styles.lowerButtons}>
        {/* Skip Button */}
        <TouchableOpacity onPress={() => router.push("/login")} style={[styles.button, styles.skipButton]}>
          <Text style={styles.buttonText}>Skip</Text>
        </TouchableOpacity>
        {/* Next Button */}
        <TouchableOpacity onPress={() => router.push("/welcome/screen3")} style={styles.button}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  upperHalf: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lowerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  lowerHalf: {
    flex: 1,
    gap: 20,
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
  },
  logo: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: '400',
    color: '#4CAF50', // Light green
    marginBottom: 5,
  },
  appName: {
    fontSize: 32,
    fontWeight: '700',
    color: '#4CAF50',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
    textAlign: 'center',
    marginBottom: 10,
  },
  subDescription: {
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#004D40', // Dark green
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    width: '45%',
  },
  skipButton: {
    backgroundColor: '#757575', // Grey color for skip button
  },
  buttonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
