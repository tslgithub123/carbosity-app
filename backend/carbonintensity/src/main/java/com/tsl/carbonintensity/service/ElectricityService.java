package com.tsl.carbonintensity.service;

import com.tsl.carbonintensity.utils.Constant;
import org.springframework.stereotype.Service;

@Service
public class ElectricityService {

    public double calculateEnergyCharges(double billAmount) {
        double electricityDuty = (billAmount * Constant.E_DUTY_PERCENT) / 100;
        double wheelingCharges = (billAmount * Constant.E_WHEELING_CHARGE_PERCENT) / 100;
        double fuelAdjustmentCharges = ((billAmount - Constant.E_FIXED_CHARGES - electricityDuty) * Constant.E_FUEL_ADJUSTMENT_CHARGE_PERCENT) / 100;
        return billAmount - Constant.E_FIXED_CHARGES - electricityDuty - wheelingCharges - fuelAdjustmentCharges;
    }

    public double calculateUnitsConsumed(double energyCharges) {
        double[] limits = Constant.E_LIMITS;
        double[] rates = Constant.E_RATES;
        if (energyCharges <= limits[0]) {
            return energyCharges / rates[0];
        } else if (energyCharges > limits[0] && energyCharges <= limits[1]) {
            return 100 + ((energyCharges - limits[0]) / rates[1]);
        } else if (energyCharges > limits[1] && energyCharges <= limits[2]) {
            return 300 + ((energyCharges - limits[1]) / rates[2]);
        } else if (energyCharges > limits[2]) {
            return 500 + ((energyCharges - limits[2]) / rates[3]);
        }
        return 0;
    }

    public double calculateCarbonEmission(double unitsConsumed) {
        return Constant.E_EMISSION_FACTOR * unitsConsumed;
    }
}
