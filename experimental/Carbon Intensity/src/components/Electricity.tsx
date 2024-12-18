import { Button, Container, NumberInput, Paper, Space, Text, TextInput } from "@mantine/core";
import { useState } from "react";

export default function Electricity() {
  const [billAmount, setBillAmount] = useState(0);
  const [numberOfPeople, setNumberOfPeople] = useState(0);
  const [carbonEmission, setCarbonEmission] = useState(0);
  const emissionFactor = 0.716;


  function unitsConsumed(energyCharges: number) {
    const limits = [471, 2529, 5439, 13759];
    const rates = [4.71, 10.29, 14.55, 16.64];
    if (energyCharges <= limits[0]) {
      return energyCharges / rates[0];
    } else if (energyCharges > limits[0] && energyCharges <= limits[1]) {
      return (100 + ((energyCharges - limits[0]) / rates[1]));
    } else if (energyCharges > limits[1] && energyCharges <= limits[2]) {
      return (300 + ((energyCharges - limits[1]) / rates[2]));
    } else if (energyCharges > limits[2]) {
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
    <Container size={'xs'}>
      <h1>Electricity</h1>
      <TextInput
        label="Enter Bill Amount"
        placeholder="Rs."
        required
        onChange={(event) => setBillAmount(Number(event.currentTarget.value))}
      />
      <br />
      <NumberInput
        label="Number of people in the house"
        placeholder="Count"
        required
        onChange={(value) => setNumberOfPeople(Number(value))}
      />
      <br />
      <Button onClick={() => calculateCarbonEmission(billAmount)}>Submit</Button>
      <br />
      <br />
      <Paper
        p="md"
        radius='md'
        bg='blue.1'
        style={{
          textAlign: 'center'
        }}
      >
        <Text size="xl" fw={700} c="green.8">
          Carbon Emission
        </Text>
        <Space h="xs" />
        <Text size="lg" c="dark.6">
          {carbonEmission.toFixed(2)} kg CO₂e
        </Text>
        {numberOfPeople > 0 && (
          <Text size="sm" c="dimmed">
            Per person: {(carbonEmission / numberOfPeople).toFixed(2)} kg CO₂e
          </Text>
        )}
      </Paper>

    </Container>
  );
}