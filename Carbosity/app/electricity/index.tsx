import { StyleSheet, View, Text, TextInput, Pressable, Animated, ActivityIndicator, TouchableOpacity, useColorScheme } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { MaterialTheme } from '@/constants/MaterialTheme';
import { useCalculateElectricityCarbonEmissions } from '@/api/electricity-queries';

const ElectricityHome = () => {
  const colorScheme = useColorScheme();
  const THEME_COLORS = colorScheme === 'dark' ? MaterialTheme.schemes.dark : MaterialTheme.schemes.light;

  const [billAmount, setBillAmount] = useState('');
  const [numPeople, setNumPeople] = useState(1); // State to manage the number of people
  const [animatedValue] = useState(new Animated.Value(0));
  const { data, isLoading, refetch, isError } = useCalculateElectricityCarbonEmissions(billAmount);

  const handleCalculate = () => {
    console.log('Calculating emissions...' + billAmount);
    Animated.sequence([
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true
      }),
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true
      })
    ]).start();
    refetch();
  };

  
  const emissionsPerPerson = data ? (data.data / numPeople).toFixed(2) : 0;

  return (
    <View style={[styles.container, { backgroundColor: THEME_COLORS.surface }]}>
      
      <View style={[styles.inputContainer, { backgroundColor: THEME_COLORS.surfaceVariant }]}>
        <MaterialIcons name="bolt" size={24} color={THEME_COLORS.primary} />
        <TextInput
          style={[styles.input, { color: THEME_COLORS.onSurface }]}
          value={billAmount}
          onChangeText={setBillAmount}
          placeholder="Enter bill amount"
          keyboardType="decimal-pad"
          returnKeyType="done"
          maxLength={10}
          selectionColor={THEME_COLORS.primary}
          placeholderTextColor={THEME_COLORS.onSurfaceVariant}
          accessible={true}
          accessibilityLabel="Bill amount input"
          accessibilityHint="Enter your electricity bill amount to calculate emissions"
        />
         {/* will depend on the user country */}
        <Text style={[styles.currency, { color: THEME_COLORS.onSurfaceVariant }]}>₹</Text>
      </View>
      
      {/* Number of People Section */}
      <View style={[styles.peopleContainer]}>
        <Text style={[styles.label, { color: THEME_COLORS.onSurfaceVariant }]}>Number of People</Text>
        <View style={styles.counterContainer}>
          <TouchableOpacity 
            style={[styles.counterButton, { backgroundColor: THEME_COLORS.onSecondary }]} 
            onPress={() => setNumPeople(numPeople > 1 ? numPeople - 1 : 1)}
            accessible={true}
            accessibilityLabel="Decrease number of people"
            accessibilityRole="button"
          >
            <MaterialIcons name="remove" size={24} color={THEME_COLORS.onPrimaryContainer} />
          </TouchableOpacity>
          <Text style={[styles.numPeople, { color: THEME_COLORS.onSurfaceVariant }]}>{numPeople}</Text>
          <TouchableOpacity 
            style={[styles.counterButton, { backgroundColor: THEME_COLORS.onSecondary }]} 
            onPress={() => setNumPeople(numPeople + 1)}
            accessible={true}
            accessibilityLabel="Increase number of people"
            accessibilityRole="button"
          >
            <MaterialIcons name="add" size={24} color={THEME_COLORS.onPrimaryContainer} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Calculate Button */}
      <Pressable 
        style={({pressed}) => [
          styles.calculateButton,
          { backgroundColor: THEME_COLORS.primary },
          pressed && styles.buttonPressed
        ]}
        onPress={handleCalculate}
        accessible={true}
        accessibilityLabel="Calculate emissions"
        accessibilityRole="button"
      >
        <Text style={styles.buttonText}>Calculate Emissions</Text>
      </Pressable>

      {/* Results Section */}
      {isLoading ? (
        <ActivityIndicator color={THEME_COLORS.primary} />
      ) : data ? (
        <Animated.View 
          style={[
            styles.resultsContainer,
            {
              backgroundColor: THEME_COLORS.primaryContainer,
              transform: [{
                scale: animatedValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 1.05]
                })
              }]
            }
          ]}
        >
          <Text style={[styles.resultValue, { color: THEME_COLORS.onPrimaryContainer }]}>{emissionsPerPerson}</Text>
          <Text style={[styles.resultUnit, { color: THEME_COLORS.onPrimaryContainer }]}>kg CO₂ per person</Text>
        </Animated.View>
      ) : null}

      {isError && (
        <View style={[styles.errorContainer, { backgroundColor: THEME_COLORS.errorContainer }]}>
          <MaterialIcons name="error-outline" size={24} color={THEME_COLORS.error} />
          <Text style={[styles.errorText, { color: THEME_COLORS.error }]}>
            Unable to calculate emissions. Please try again.
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,  
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    padding: 12,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    marginHorizontal: 8,
    fontSize: 16,
    fontWeight: '400',
  },
  currency: {
    fontSize: 16,
    fontWeight: '500',
  },
  calculateButton: {
    borderRadius: 20,
    padding: 16,
    alignItems: 'center',
    marginVertical: 16,
  },
  buttonPressed: {
    backgroundColor: 'lightgray',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0.1,
  },
  resultsContainer: {
    alignItems: 'center',
    borderRadius: 16,
    padding: 24,
    marginTop: 16,
  },
  resultValue: {
    fontSize: 34,
    fontWeight: '400',
  },
  resultUnit: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 4,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    padding: 12,
    marginTop: 16,
  },
  errorText: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '400',
  },
  peopleContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: 16,
    padding: 12,
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  counterButton: {
    borderRadius: 12,
    padding: 8,
    marginHorizontal: 12,
    alignItems: 'center',
  },
  numPeople: {
    fontSize: 24,
    fontWeight: '500',
  },
});

export default ElectricityHome;
