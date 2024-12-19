import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Surface, Text, useTheme } from 'react-native-paper';

export default function ElectricityHome() {
  const [billAmount, setBillAmount] = useState(0);
  const [numberOfPeople, setNumberOfPeople] = useState(0);
  const [carbonEmission, setCarbonEmission] = useState(0);
  const theme = useTheme();
  const emissionFactor = 0.716;

  const unitsConsumed = (energyCharges: number) => {
    const limits = [471, 2529, 5439];
    const rates = [4.71, 10.29, 14.55, 16.64];

    if (energyCharges <= limits[0]) {
      return energyCharges / rates[0];
    } else if (energyCharges <= limits[1]) {
      return 100 + (energyCharges - limits[0]) / rates[1];
    } else if (energyCharges <= limits[2]) {
      return 300 + (energyCharges - limits[1]) / rates[2];
    } else {
      return 500 + (energyCharges - limits[2]) / rates[3];
    }
  };

  const getPercent = (value: number, percent: number) => {
    return (value * percent) / 100;
  };

  const calculateCarbonEmission = (billAmount: number) => {
    const fixedCharges = 128;
    const electricityDuty = getPercent(billAmount, 13.79);
    const wheelingCharges = getPercent(billAmount, 11.46);
    const fuelAdjustmentCharges = getPercent(billAmount - fixedCharges - electricityDuty, 7.1);

    const energyCharges =
      billAmount - fixedCharges - electricityDuty - wheelingCharges - fuelAdjustmentCharges;

    const uConsumed = unitsConsumed(energyCharges);
    if (!uConsumed) {
      console.error('Invalid input');
      return;
    }
    const carbonEmission = emissionFactor * (uConsumed / 1000);
    setCarbonEmission(carbonEmission);
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={[styles.title]}>
        Calculate Carbon Emission from Electricity Bill
      </ThemedText>
      <TextInput
        label="Enter Bill Amount"
        placeholder="Rs."
        keyboardType="numeric"
        mode="outlined"
        style={styles.input}
        onChangeText={(text) => setBillAmount(Number(text))}
        left={<TextInput.Affix text="₹" />}
      />
      <View style={styles.counterContainer}>
        <Text style={{ color: theme.colors.onBackground }}>Number of People</Text>
      </View>
      <View style={styles.counterContainer}>
        <Button
          mode="contained"
          onPress={() => setNumberOfPeople(Math.max(0, numberOfPeople - 1))}
        >
          <ThemedText type="default">-</ThemedText>
        </Button>
        <Text style={[styles.counterValue, { color: theme.colors.onBackground }]}>
          {numberOfPeople}
        </Text>
        <Button
          mode="contained"
          onPress={() => setNumberOfPeople(Math.max(0, numberOfPeople + 1))}
        >
          <ThemedText type="default">+</ThemedText>
        </Button>
      </View>

      <Button
        mode="contained"
        onPress={() => calculateCarbonEmission(billAmount)}
        style={styles.button}
      >
        Check
      </Button>
      

      <Surface
        style={[
          styles.resultCard,
          { backgroundColor: theme.colors.onPrimary},
        ]}
        elevation={2}
      >
        <Text style={[styles.cardTitle, { color: theme.colors.primary }]}>
          Carbon Emission
        </Text>
        <Text style={[styles.emission, { color: theme.colors.onSurface }]}>
          {carbonEmission.toFixed(2)} kg CO₂e
        </Text>
        {numberOfPeople > 0 && (
          <Text style={[styles.perPerson, { color: theme.colors.onSurfaceVariant }]}>
            Per person: {(carbonEmission / numberOfPeople).toFixed(2)} kg CO₂e
          </Text>
        )}
      </Surface>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 16,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginVertical: 16,
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  counterValue: {
    fontSize: 20,
    marginHorizontal: 16,
  },
  resultCard: {
    elevation: 4,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  emission: {
    fontSize: 18,
  },
  perPerson: {
    fontSize: 14,
    marginTop: 8,
  },
});
