// Temel rapor tipleri
export interface BaseReport {
  id: string;
  createdAt: Date;
  userId: string;
  vehicleInfo: {
    vin: string;
    manufacturer: string;
    model: string;
    year: string;
  };
}

// Ücretsiz rapor için kısıtlı analiz sonuçları
export interface FreeReport extends BaseReport {
  type: 'free';
  basicAnalysis: {
    generalCondition: string;
    majorIssuesCount: number;
    safetyScore: number;
  };
  paintAnalysis: {
    damagedAreasCount: number;
    overallCondition: string;
  };
}

// Premium rapor için detaylı analiz sonuçları
export interface PremiumReport extends BaseReport {
  type: 'premium';
  detailedAnalysis: {
    generalCondition: string;
    majorIssuesCount: number;
    minorIssuesCount: number;
    safetyScore: number;
    recommendedActions: string[];
    estimatedCosts: {
      repairs: number;
      maintenance: number;
    };
  };
  paintAnalysis: {
    damagedAreas: Array<{
      location: string;
      severity: 'low' | 'medium' | 'high';
      type: string;
      estimatedRepairCost: number;
    }>;
    overallCondition: string;
    repaintedPanels: string[];
    rustSpots: string[];
  };
  audioAnalysis: {
    engineHealth: string;
    components: Array<{
      name: string;
      condition: string;
      confidenceScore: number;
      recommendedAction?: string;
    }>;
    abnormalSounds: Array<{
      type: string;
      severity: string;
      location: string;
      possibleCauses: string[];
    }>;
  };
  additionalFeatures: {
    marketValue: {
      estimated: number;
      range: {
        min: number;
        max: number;
      };
      comparisonData: {
        averagePrice: number;
        sampleSize: number;
      };
    };
    maintenanceSchedule: Array<{
      service: string;
      dueDate: string;
      estimatedCost: number;
      priority: 'low' | 'medium' | 'high';
    }>;
    historicalData?: {
      previousOwners: number;
      accidentHistory: boolean;
      serviceRecords: boolean;
    };
  };
}

// Rapor erişim kontrolleri için
export interface ReportAccess {
  userId: string;
  reportId: string;
  type: 'free' | 'premium';
  purchasedAt?: Date;
  expiresAt?: Date;
  credits: number;
}