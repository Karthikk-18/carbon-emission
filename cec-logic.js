// Main Logic to calculate Car
export function calculateCarbonStats(data) {
    const {
        electricityUsageKwh,
        transportationUsagePerMonth,
        shortFlight,
        mediumFlight,
        largeFlight,
        dietaryChoice
    } = data;

    const electricityFactor = 0.3978;
    const transportationFactor = 9.087;
    const shortFlightFactor = 100;
    const mediumFlightFactor = 200;
    const largeFlightFactor = 300;
    const dietaryChoiceFactor = {
        vegetarian: 400,
        non_vegetarian: 800
    };

    const year = 12;

    const electricityEmission = electricityUsageKwh * electricityFactor;
    const transportationEmission = transportationUsagePerMonth * transportationFactor;

    const airTravelShortFlight = shortFlight * shortFlightFactor;
    const airTravelMediumFlight = mediumFlight * mediumFlightFactor;
    const airTravelLargeFlight = largeFlight * largeFlightFactor;

    const dietaryChoiceEmission = dietaryChoiceFactor[dietaryChoice] || 0;

    const totalEmissionFlight = airTravelShortFlight + airTravelMediumFlight + airTravelLargeFlight;

    const totalElectricityUsage = electricityEmission * year;
    const totalTransportationUsage = transportationEmission * year;

    const totalYearlyEmissions = dietaryChoiceEmission + totalEmissionFlight + totalElectricityUsage + totalTransportationUsage;

    return {
        totalYearlyEmissions: { value: totalYearlyEmissions, unit: 'kgCO2/year' },
        totalElectricityUsage: { value: totalElectricityUsage, unit: 'kgCO2/year' },
        totalTransportationUsage: { value: totalTransportationUsage, unit: 'kgCO2/year' },
        totalEmissionFlight: { value: totalEmissionFlight, unit: 'kgCO2/year' },
        dietaryChoiceEmission: { value: dietaryChoiceEmission, unit: 'kgCO2/year' }
    };
}