import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Divider } from 'react-native-paper';
import { lineStyles } from './lineStyles';

export default function WelcomeScreen1() {
  return (
    <ThemedView style={styles.container}>
      {/* Logo or Illustration */}
      <ThemedView style={styles.upperHalf}>
        <Image
          source={require('../../assets/images/carbosity-header.png')}
          style={styles.logo}
        />
        <Text style={styles.title}>Welcome to</Text>
        <Text style={styles.appName}>carbosity</Text>
      </ThemedView>

      {/* Lower Content */}
      <ThemedView style={styles.lowerHalf}>
        <ThemedText style={ lineStyles.line1}>
        Your lifestyle app for truly sustainable living.
        </ThemedText>
        <ThemedText style={ lineStyles.line2}>
        We want to do our best for the earth. But let's be honest - it's not always simple in this economy!
        </ThemedText>
        <ThemedText style={ lineStyles.line3}>Carbosity helps you be your best self for the environment.
        </ThemedText>
        <ThemedView style={styles.lowerButtons}>
          {/* Next Button */}
          <TouchableOpacity onPress={() => router.push("/welcome/screen2")} style={styles.button}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  upperHalf: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lowerHalf: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    gap: 20,
    position: 'relative', 
  },
  lowerButtons: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  logo: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: '400',
    color: '#4CAF50', 
    marginBottom: 5,
  },
  appName: {
    fontSize: 32,
    fontWeight: '700',
    color: '#4CAF50',
  },
  description: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
    textAlign: 'center',
  },
  subDescription: {
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#004D40',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    width: '45%',
  },

  buttonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
