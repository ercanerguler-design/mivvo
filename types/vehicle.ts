export interface VehicleInfo {
  // Temel Bilgiler
  Make: string;
  Model: string;
  ModelYear: string;
  Manufacturer: string;
  VehicleType: string;
  PlantCountry: string;
  PlantState: string;
  PlantCity: string;
  Series: string;
  Trim: string;
  BodyClass: string;
  VehicleDescriptor: string;

  // Dış Özellikler
  ExteriorColor: string;
  PaintType: string;
  WindowType: string;
  RoofType: string;
  Sunroof: string;
  DoorType: string;
  MirrorStandards: string;

  // Motor ve Performans
  EngineModel: string;
  EngineMake: string;
  EngineHP: string;
  EngineKW: string;
  EngineCycles: string;
  EngineCylinders: string;
  EngineDisplacement: string;
  DisplacementL: string;
  DisplacementCC: string;
  EngineConfiguration: string;
  EngineVersion: string;
  EngineNumber: string;
  EngineTurbo: string;
  EngineCoolingType: string;
  EngineElectrification: string;
  HybridSystemType: string;
  BatteryType: string;
  BatteryCapacity: string;
  BatteryVoltage: string;
  TopSpeed: string;
  Acceleration: string;

  // Yakıt Sistemi
  FuelTypePrimary: string;
  FuelTypeSecondary: string;
  FuelDeliverySystem: string;
  FuelInjectionType: string;
  FuelQualityPremium: string;
  FuelTankCapacity: string;
  AlternativeFuel: string;
  FuelEconomyCity: string;
  FuelEconomyHighway: string;
  FuelEconomyCombined: string;

  // Güç Aktarma
  TransmissionStyle: string;
  TransmissionSpeeds: string;
  TransmissionType: string;
  TransmissionAutomaticType: string;
  TransmissionControlType: string;
  DriveType: string;
  DifferentialType: string;
  AxleConfiguration: string;

  // Süspansiyon ve Yürüyen Aksam
  SuspensionTypeFront: string;
  SuspensionTypeRear: string;
  SpringTypeFront: string;
  SpringTypeRear: string;
  SteeringType: string;
  SteeringLocation: string;
  TireSize: string;
  TireSizeFront: string;
  TireSizeRear: string;
  WheelMaterial: string;
  WheelSize: string;
  TrackWidth: string;
  WheelBaseLong: string;
  WheelBaseShort: string;

  // Boyutlar ve Kapasiteler
  Length: string;
  Width: string;
  Height: string;
  CurbWeight: string;
  GrossVehicleWeight: string;
  PayloadWeight: string;
  TowingCapacity: string;
  CargoVolume: string;
  PassengerVolume: string;
  SeatingCapacity: string;
  Doors: string;
  Windows: string;
  BedLengthIN: string;
  BedTypeName: string;
  CabType: string;
  LoadFloorHeight: string;

  // Güvenlik Sistemleri
  AirBagLocFront: string;
  AirBagLocSide: string;
  AirBagLocKnee: string;
  AirBagLocCurtain: string;
  AirBagLocSeat: string;
  ActiveSafetySystem: string;
  ParkingSensors: string;
  BackupCamera: string;
  BlindSpotMonitoring: string;
  LaneDepartureWarning: string;
  ForwardCollisionWarning: string;
  AdaptiveCruiseControl: string;
  NightVision: string;
  SecurityType: string;
  AlarmType: string;
  BrakeSystemType: string;
  BrakeSystemDesc: string;
  BrakeABS: string;
  BrakeAssist: string;
  TractionControl: string;
  StabilityControl: string;

  // Konfor ve İç Donanım
  ACType: string;
  ACZones: string;
  SeatType: string;
  SeatMaterial: string;
  SeatHeating: string;
  SeatVentilation: string;
  SeatMemory: string;
  SteeringAdjustment: string;
  AudioSystem: string;
  NavigationSystem: string;
  EntertainmentSystem: string;
  Bluetooth: string;
  USBPorts: string;
  WirelessCharging: string;

  // Üretim ve Belgelendirme
  ManufacturerId: string;
  PlantCompanyName: string;
  ProductionDate: string;
  ModelSeries: string;
  BasePrice: string;
  MSRP: string;
  CertificationLevel: string;
  SafetyRating: string;
  CrashTestRating: string;
  EmissionStandard: string;
  WarrantyBasic: string;
  WarrantyPowertrain: string;

  [key: string]: string | undefined;
}