package com.tsl.carbonintensity.controller;

import com.tsl.carbonintensity.api.ApiResponse;
import com.tsl.carbonintensity.api.ResponseHelper;
import com.tsl.carbonintensity.service.ElectricityService;
import com.tsl.carbonintensity.utils.Constant;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/electricity")
public class ElectricityController {

    private final ElectricityService electricityService;

    public ElectricityController(ElectricityService electricityService) {
        this.electricityService = electricityService;
    }

    @GetMapping("/calculate-emission")
    public ResponseEntity<ApiResponse<Object>> calculateCarbonEmission(@RequestParam("billAmount") double billAmount) {
        if (billAmount <= 0) {
            return ResponseHelper.buildErrorResponse("ERROR", "INVALID_BILL_AMOUNT", HttpStatus.BAD_REQUEST);
        }
        double energyCharges = electricityService.calculateEnergyCharges(billAmount);
        if (energyCharges <= 0) {
            return ResponseHelper.buildErrorResponse("ERROR", "INVALID_ENERGY_CHARGES", HttpStatus.BAD_REQUEST);
        }
        double unitsConsumed = electricityService.calculateUnitsConsumed(energyCharges);
        if (unitsConsumed <= 0) {
            return ResponseHelper.buildErrorResponse("ERROR", "INVALID_UNITS_CONSUMED", HttpStatus.BAD_REQUEST);
        }
        double carbonEmission = electricityService.calculateCarbonEmission(unitsConsumed);
        System.out.println("Carbon Emission: " + carbonEmission);
        return ResponseHelper.buildSuccessResponse("SUCCESS", "CARBON_EMISSION_CALCULATED", carbonEmission);
    }




}
