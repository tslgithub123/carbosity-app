import { Button, Container, NumberInput, Paper, Space, Text, TextInput } from "@mantine/core";
import { useState } from "react";

export default function Electricity() {
  const [billAmount, setBillAmount] = useState(0);
  const [numberOfPeople, setNumberOfPeople] = useState(0);
  const [carbonEmission, setCarbonEmission] = useState(0);
  const emissionFactor = 0.716;


  function unitsConsumed(energyCharges: number)
  {
    const limits = [471,2529, 5439, 13759];
    const rates = [4.71, 10.29, 14.55, 16.64];

    // eg. 379


    if(energyCharges <= limits[0]) {
      return energyCharges / rates[0];
    } else if (energyCharges > limits[0] && energyCharges <= limits[1]) {
      //return (limits[0] / rates[0]) + ((energyCharges - limits[0]) / rates[1]);
      return (100 + ((energyCharges - limits[0]) / rates[1]));
    }

  }

  // i/p: 818 
  // function unitsConsumed(energyCharges: number) {
  //   const rate1 = 4.71;   // 0-100
  //   const rate2 = 10.29;  // 101-300
  //   const rate3 = 14.55;  // 301-500
  //   const rate4 = 16.64;  // >500

  //   const chargesBracket1 = Math.min(energyCharges, 100);
  //   const chargesBracket2 = Math.min(Math.max(energyCharges - 100, 0), 200);
  //   const chargesBracket3 = Math.min(Math.max(energyCharges - 100, 0), 200);
  //   const chargesBracket4 = Math.max(energyCharges - 500, 0);

  //   const unitsBracket1 = chargesBracket1 / rate1;
  //   const unitsBracket2 = chargesBracket2 / rate2;
  //   const unitsBracket3 = chargesBracket3 / rate3;
  //   const unitsBracket4 = chargesBracket4 / rate4;
  //   console.log({ unitsBracket1 })
  //   console.log({ unitsBracket2 })
  //   console.log({ unitsBracket3 })
  //   console.log({ unitsBracket4 })

  //   const totalUnits = unitsBracket1 + unitsBracket2 + unitsBracket3 + unitsBracket4;

  //   console.log({ totalUnits });
  //   return totalUnits;
  // }

  function getPercent(value: number, percent: number) {
    return ((value * (percent)) / 100)
  }



  function calculateCarbonEmission(billAmount: number) {
    console.log({ billAmount })
    const fixedCharges = (getPercent(billAmount, 18.43));
    console.log({ fixedCharges })
    const electricityDuty = (getPercent(billAmount, 15.76));
    console.log({ electricityDuty });
    const wheelingCharges = getPercent(billAmount, 13.42);
    console.log({ wheelingCharges });
    const fuelAdjustmentCharges = getPercent(billAmount, 5.53);
    console.log({ fuelAdjustmentCharges });

    const energyCharges = billAmount - fixedCharges - electricityDuty - wheelingCharges - fuelAdjustmentCharges;
    console.log("Energy charges: " + energyCharges)
    const uConsumed = unitsConsumed(energyCharges);
    console.log({ uConsumed })
    if (uConsumed === 0) {
      console.error('Invalid input');
      return;
    }
    const carbonEmssion = emissionFactor * (uConsumed ?? 0)
    console.log({ carbonEmssion })
    // / num of people
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