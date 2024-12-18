import { ThemedText } from '@/components/ThemedText';
import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { TextInput, Button, Surface, Text, useTheme, IconButton, Icon, MD3Colors } from 'react-native-paper';

export default function ElectricityHome() {
    const [billAmount, setBillAmount] = useState(0);
    const [numberOfPeople, setNumberOfPeople] = useState(0);
    const [carbonEmission, setCarbonEmission] = useState(0);
    const theme = useTheme();
    const emissionFactor = 0.716;

    function unitsConsumed(energyCharges: number) {
        const limits = [471, 2529, 5439];
        const rates = [4.71, 10.29, 14.55, 16.64];

        if (energyCharges <= limits[0]) {
            return energyCharges / rates[0];
        } else if (energyCharges > limits[0] && energyCharges <= limits[1]) {
            return (100 + ((energyCharges - limits[0]) / rates[1]));
        } else if (energyCharges > limits[1] && energyCharges <= limits[2]) {
            return (300 + ((energyCharges - limits[1]) / rates[2]));
        } else if(energyCharges > limits[2]) { 
            return (500 + ((energyCharges - limits[2]) / rates[3]));
        }
    }

    function getPercent(value: number, percent: number) {
        return ((value * (percent)) / 100)
    }

    function calculateCarbonEmission(billAmount: number) {



        const fixedCharges = 128;
        const electricityDuty = getPercent(billAmount, 13.79);
        const wheelingCharges = getPercent(billAmount, 11.46);
        const fuelAdjustmentCharges = getPercent((billAmount - fixedCharges - electricityDuty), 7.1);
    
        const energyCharges = billAmount - fixedCharges - electricityDuty - wheelingCharges - fuelAdjustmentCharges;
    
        console.log({ billAmount })
    
        console.log({ fixedCharges })
    
        console.log({ electricityDuty });
        console.log({ wheelingCharges });
        console.log({ fuelAdjustmentCharges });
    
        console.log("Energy charges: " + energyCharges)
        const uConsumed = unitsConsumed(energyCharges);
        console.log({ uConsumed })
        if (uConsumed === 0) {
          console.error('Invalid input');
          return;
        }
        const carbonEmssion = emissionFactor * ((uConsumed ?? 0 / 1000))
        console.log('carbon emission: ' + carbonEmssion)
        setCarbonEmission(carbonEmssion);
      }

    return (
        <View style={styles.container}>

            <Text style={styles.title}>Calculate Carbon Emission from Electricity Bill</Text>
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
                <Text>Number of People</Text></View>
            <View style={styles.counterContainer}>
                {/* <TouchableOpacity
                    style={styles.counterButton}
                    onPress={() => setNumberOfPeople(Math.max(0, numberOfPeople - 1))}
                >
                    <Text style={styles.counterText}>-</Text>
                </TouchableOpacity> */}
                {/* <IconButton
    icon="camera"
    iconColor={MD3Colors.error50}
    size={20}
    onPress={() => console.log('Pressed')}
  /> */}

                <Button icon="" mode="contained" onPress={() => setNumberOfPeople(Math.max(0, numberOfPeople - 1))}>
                    {/* <Text style={styles.counterText}>-</Text> */}
                    <ThemedText type="default" lightColor="#fff" darkColor="#000">-</ThemedText>
                </Button>
                <Text style={styles.counterValue}>{numberOfPeople}</Text>
                <Button icon="" mode="contained" onPress={() => setNumberOfPeople(Math.max(0, numberOfPeople + 1))}>
                    <ThemedText type="default" lightColor="#fff" darkColor="#000">+</ThemedText>
                </Button>
                {/* <TouchableOpacity
                    style={styles.counterButton}
                    onPress={() => setNumberOfPeople(numberOfPeople + 1)}
                >
                    <Text style={styles.counterText}>+</Text>
                </TouchableOpacity> */}
            </View>

            <Button
                mode="contained"
                onPress={() => calculateCarbonEmission(billAmount)}
                style={styles.button}
            >
                Check
            </Button>

            <Surface style={styles.resultCard} elevation={0}>
                <Text style={styles.cardTitle}>Carbon Emission</Text>
                <Text style={styles.emission}>{carbonEmission.toFixed(2)} kg CO₂e</Text>
                {numberOfPeople > 0 && (
                    <Text style={styles.perPerson}>
                        Per person: {(carbonEmission / numberOfPeople).toFixed(2)} kg CO₂e
                    </Text>
                )}
            </Surface>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        flex: 1,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
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
    counterButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#1976D2',
        justifyContent: 'center',
        alignItems: 'center',
    },
    counterText: {
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold',
    },
    counterValue: {
        fontSize: 20,
        marginHorizontal: 16,
    },
    resultCard: {
        padding: 16,
        borderRadius: 8,
        backgroundColor: '#E3F2FD',
        alignItems: 'center',
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#2E7D32',
        marginBottom: 8,
    },
    emission: {
        fontSize: 18,
        color: '#424242',
    },
    perPerson: {
        fontSize: 14,
        color: '#757575',
        marginTop: 8,
    },
});