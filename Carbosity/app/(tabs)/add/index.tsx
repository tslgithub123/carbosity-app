import React, { useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, Pressable, Animated, ActivityIndicator, TouchableOpacity, useColorScheme, StatusBar, ToastAndroid } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { MaterialTheme } from '@/constants/MaterialTheme';
import { useCalculateElectricityCarbonEmissions } from '@/api/electricity-queries';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { SearchableDropdown } from '@/components/ui/dropdown/SearchableDropdown';

type SegmentedButtonOption = {
  label: string;
  value: string;
};

type SegmentedButtonsProps = {
  options: SegmentedButtonOption[];
  selectedValue: string;
  onSelect: (value: string) => void;
  themeColors: {
    surfaceVariant: string;
    primaryContainer: string;
    onPrimaryContainer: string;
  };
};

const SegmentedButtons: React.FC<SegmentedButtonsProps> = ({ options, selectedValue, onSelect, themeColors }) => {
  return (
    <View style={[styles.segmentedContainer]}>
      {options.map((option) => (
        <TouchableOpacity
          key={option.value}
          style={[
            styles.segmentButton,
            { backgroundColor: themeColors.surfaceVariant },
            selectedValue === option.value && {
              backgroundColor: themeColors.primaryContainer,
            },
          ]}
          onPress={() => onSelect(option.value)}
        >
          <ThemedText
            style={[
              styles.segmentText,
              selectedValue === option.value && {
                color: themeColors.onPrimaryContainer,
                fontWeight: '600',
              },
            ]}
          >
            {option.label}
          </ThemedText>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const AddScreen = () => {
  const colorScheme = useColorScheme();
  const THEME_COLORS = colorScheme === 'dark' ? MaterialTheme.schemes.dark : MaterialTheme.schemes.light;

  const [billAmount, setBillAmount] = useState('');
  const [numPeople, setNumPeople] = useState(1);
  const [animatedValue] = useState(new Animated.Value(0));
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const [location, setLocation] = useState('');

  const { data, isLoading, refetch, isError } = useCalculateElectricityCarbonEmissions(billAmount);

  useEffect(() => {
    // Reset any existing results
    if (data) {
      refetch();
    } 
  }, [selectedType]);


  const handleCalculate = () => {
    if (selectedType === 'electricity' && !billAmount) {
      ToastAndroid.show('Please enter a bill amount', ToastAndroid.SHORT);
      return;
    }
    if (selectedType === 'travel' && !location) {
      ToastAndroid.show('Please enter a location', ToastAndroid.SHORT);
      return;
    }

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

  useEffect(() => {
    console.log('selectedType: ' + selectedType);
  }, [selectedType]
);

const typeOptions = [
    { label: 'Electricity', value: 'electricity', icon: 'bolt' },
    { label: 'Travel', value: 'travel', icon: 'directions-car' },
  ] ;

  const LocationInput = () => (
    <View style={[styles.inputContainer, { backgroundColor: THEME_COLORS.surfaceVariant }]}>
      <MaterialIcons name="location-on" size={24} color={THEME_COLORS.primary} />
      <TextInput
        style={[styles.input, { color: THEME_COLORS.onSurface }]}
        value={location}
        onChangeText={setLocation}
        placeholder="Enter location"
        returnKeyType="done"
        selectionColor={THEME_COLORS.primary}
        placeholderTextColor={THEME_COLORS.onSurfaceVariant}
        accessible={true}
        accessibilityLabel="Location input"
        accessibilityHint="Enter your travel location"
      />
    </View>
  );

  const emissionsPerPerson = data ? (data.data / numPeople).toFixed(2) : 0;

  return (
    <ThemedView style={[styles.container]}>
      <ThemedText style={{textAlign: 'center', padding: 16, fontSize: 20}}>Find My Impact</ThemedText>
      
      {/* <SegmentedButtons
        options={typeOptions}
        selectedValue={selectedType}
        onSelect={setSelectedType}
        themeColors={THEME_COLORS}
      /> */}
      <View style={[styles.inputContainer, { backgroundColor: THEME_COLORS.surfaceVariant }]}>
            <MaterialIcons name="receipt-long" size={24} color={THEME_COLORS.primary} />
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
            <Text style={[styles.currency, { color: THEME_COLORS.onSurfaceVariant }]}>₹</Text>
          </View>

<SearchableDropdown
  options={typeOptions}
  onSelect={(value) => {
    setSelectedType(value);
   
    if (data) {
      refetch(); // This will clear the previous result
    }
  }}
  themeColors={THEME_COLORS}
/>

<View style={{ height: 64 }} />

<ThemedText style={{ textAlign: 'center', padding: 16, fontSize: 24, fontWeight: 'bold', color: THEME_COLORS.primary }}>
    {selectedType ? selectedType.charAt(0).toUpperCase() + selectedType.slice(1) : ''}
</ThemedText>


      {selectedType === 'electricity' && (
        <>
          
          
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
        </>
      ) }

        {selectedType === 'travel' && <LocationInput />}

        {selectedType && <Pressable 
        style={({pressed}) => [
          styles.calculateButton,
          { backgroundColor: MaterialTheme.schemes.light.primary },
          pressed && styles.buttonPressed
        ]}
        onPress={handleCalculate}
        disabled={selectedType === null}
        accessible={true}
        accessibilityLabel="Calculate emissions"
        accessibilityRole="button"
      >
        <ThemedText style={styles.buttonText}>Calculate Emission</ThemedText>
      </Pressable>}

    

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
    <View style={styles.resultIconContainer}>
      <MaterialIcons 
        name={typeOptions.find(opt => opt.value === selectedType)?.icon || 'bolt'} 
        size={32} 
        color={THEME_COLORS.onPrimaryContainer}
      />
    </View>
    <View style={styles.resultTextContainer}>
      <Text style={[styles.resultValue, { color: THEME_COLORS.onPrimaryContainer }]}>
        {emissionsPerPerson}
      </Text>
      <Text style={[styles.resultUnit, { color: THEME_COLORS.onPrimaryContainer }]}>
        kg CO₂ per person
      </Text>
      <Text style={[styles.resultType, { color: THEME_COLORS.onPrimaryContainer }]}>
        from {typeOptions.find(opt => opt.value === selectedType)?.label || 'Electricity'}
      </Text>
    </View>
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
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
    padding: 16,
    flex: 1,  
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    zIndex: 1,
  },
  segmentedContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 4,
    marginBottom: 16,
    gap: 8,
  },
  segmentButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmentText: {
    fontSize: 14,
    fontWeight: '500',
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
    backgroundColor: '#142800',
  },
  buttonText: {
    color: '#fff',
  },
  resultsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 28, 
    paddingLeft: 24,
    paddingTop: 12,
    paddingBottom: 12,
    marginTop: 16,
    elevation: 2, // Subtle elevation
  },
  resultIconContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Subtle container for icon
    padding: 16,
    borderRadius: 20,
    marginRight: 16,
  },
  resultTextContainer: {
    paddingLeft: 48,
    flex: 1,
  },
  resultValue: {
    fontSize: 34,
    fontWeight: '500',
    letterSpacing: 0.25, 
  },
  resultUnit: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 4,
    letterSpacing: 0.15,
    opacity: 0.9,
  },
  resultType: {
    fontSize: 14,
    fontWeight: '400',
    marginTop: 8,
    letterSpacing: 0.25, 
    opacity: 0.75,
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

export default AddScreen;