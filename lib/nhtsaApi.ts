import { VehicleInfo } from '@/types/vehicle';

export class NHTSAApi {
  private static readonly BASE_URL = 'https://vpic.nhtsa.dot.gov/api/vehicles';

  private static getVariableMapping(): { [key: string]: keyof VehicleInfo } {
    return {
      'Make': 'Make',
      'Model': 'Model',
      'Model Year': 'ModelYear',
      'Manufacturer Name': 'Manufacturer',
      'Vehicle Type': 'VehicleType',
      'Plant Country': 'PlantCountry',
      'Plant State': 'PlantState',
      'Plant City': 'PlantCity',
      'Series': 'Series',
      'Body Class': 'BodyClass',
      'Trim Level': 'Trim',
      'Vehicle Descriptor': 'VehicleDescriptor',
      'Engine Model': 'EngineModel',
      'Engine Manufacturer': 'EngineMake',
      'Engine Horse Power': 'EngineHP',
      'Engine kW': 'EngineKW',
      'Engine Number of Cylinders': 'EngineCylinders',
      'Displacement (L)': 'DisplacementL',
      'Displacement (CC)': 'DisplacementCC',
      'Engine Configuration': 'EngineConfiguration',
      'Turbo': 'EngineTurbo',
      'Engine Cooling Type': 'EngineCoolingType',
      'Other Engine Info': 'EngineElectrification',
      'Hybrid/Electric Type': 'HybridSystemType',
      'Fuel Type - Primary': 'FuelTypePrimary',
      'Fuel Type - Secondary': 'FuelTypeSecondary',
      'Fuel Delivery / Fuel Injection Type': 'FuelDeliverySystem',
      'Fuel Tank Volume': 'FuelTankCapacity',
      'City mileage': 'FuelEconomyCity',
      'Highway mileage': 'FuelEconomyHighway',
      'Combined mileage': 'FuelEconomyCombined',
      'Transmission Style': 'TransmissionStyle',
      'Transmission Speeds': 'TransmissionSpeeds',
      'Transmission Type': 'TransmissionType',
      'Drive Type': 'DriveType',
      'Front Suspension Type': 'SuspensionTypeFront',
      'Rear Suspension Type': 'SuspensionTypeRear',
      'Front Spring Type': 'SpringTypeFront',
      'Rear Spring Type': 'SpringTypeRear',
      'Tire Size': 'TireSize',
      'Tire Size Front': 'TireSizeFront',
      'Tire Size Rear': 'TireSizeRear',
      'Wheel Material': 'WheelMaterial',
      'Overall Length': 'Length',
      'Overall Width': 'Width',
      'Overall Height': 'Height',
      'Wheel Base, Long': 'WheelBaseLong',
      'Wheel Base, Short': 'WheelBaseShort',
      'Track Width': 'TrackWidth',
      'Curb Weight': 'CurbWeight',
      'Gross Vehicle Weight Rating': 'GrossVehicleWeight',
      'Maximum Payload Capacity': 'PayloadWeight',
      'Maximum Towing Capacity': 'TowingCapacity',
      'Cargo Volume': 'CargoVolume',
      'Passenger Volume': 'PassengerVolume',
      'Air Bag Loc Front': 'AirBagLocFront',
      'Air Bag Loc Side': 'AirBagLocSide',
      'Air Bag Loc Knee': 'AirBagLocKnee',
      'Air Bag Loc Curtain': 'AirBagLocCurtain',
      'Anti-Theft Type': 'SecurityType',
      'Brake System Type': 'BrakeSystemType',
      'Brake System Description': 'BrakeSystemDesc',
      'Anti-Lock Braking System (ABS)': 'BrakeABS',
      'Traction Control': 'TractionControl',
      'Stability Control': 'StabilityControl',
      'Air Conditioning Type': 'ACType',
      'Seat Type': 'SeatType',
      'Seat Material': 'SeatMaterial',
      'Entertainment System': 'EntertainmentSystem',
      'Doors': 'Doors',
      'Windows': 'Windows',
      'Steering Location': 'SteeringLocation',
      'Seating Capacity': 'SeatingCapacity',
      'Base Price ($)': 'BasePrice',
      'MSRP': 'MSRP'
    };
  }

  private static getVariableValue(results: any[], variableName: string): string {
    const result = results.find(item => item.Variable === variableName);
    if (result && result.Value && result.Value !== 'Not Applicable' && result.Value !== 'null') {
      return result.Value;
    }
    return '';
  }

  public static async decodeVIN(vin: string): Promise<VehicleInfo | null> {
    try {
      const response = await fetch(
        `${this.BASE_URL}/DecodeVin/${vin}?format=json`
      );

      if (!response.ok) {
        console.error('NHTSA API request failed with status:', response.status);
        throw new Error('NHTSA API request failed');
      }

      const data = await response.json();
      console.log('Raw NHTSA Response:', JSON.stringify(data, null, 2));
      
      if (!data.Results || data.Results.length === 0) {
        console.error('No results found in NHTSA response');
        return null;
      }

      // Initialize vehicleInfo with empty strings for all properties
      const vehicleInfo = Object.fromEntries(
        Object.entries(this.getVariableMapping()).map(([_, key]) => [key, ''])
      ) as VehicleInfo;

      // Map NHTSA results to our vehicle info structure
      console.log('Raw NHTSA Response:', JSON.stringify(data.Results, null, 2));
      
      // Display available NHTSA variables with values for debugging
      console.log('Available NHTSA Variables:');
      data.Results.forEach((item: { Variable: string; Value: string }) => {
        if (item.Value && item.Value !== 'Not Applicable' && item.Value !== 'null') {
          console.log(`${item.Variable}: ${item.Value}`);
        }
      });

      const variableMap = this.getVariableMapping();

      // Map NHTSA data to our vehicle info structure
      data.Results.forEach((item: { Variable: string; Value: string }) => {
        if (item.Value && item.Value !== 'Not Applicable' && item.Value !== 'null') {
          const key = variableMap[item.Variable];
          if (key) {
            console.log(`Mapping ${item.Variable} -> ${key}: ${item.Value}`);
            vehicleInfo[key] = item.Value;
          }
        }
      });

      return vehicleInfo;
    } catch (error) {
      console.error('Error decoding VIN:', error);
      return null;
    }
  }

  public static validateVIN(vin: string): boolean {
    // VIN must be 17 characters
    if (vin.length !== 17) {
      return false;
    }

    // VIN should only contain alphanumeric characters
    const validVINRegex = /^[A-HJ-NPR-Z0-9]{17}$/;
    return validVINRegex.test(vin);
  }
}