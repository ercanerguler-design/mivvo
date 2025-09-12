import { NextApiRequest, NextApiResponse } from 'next';
import { renderToStream } from '@react-pdf/renderer';
import { createCorporateReportTemplate } from './corporateReportTemplate';

// Mock data
const mockFreeReport = {
  companyInfo: {
    name: 'ABC Otomotiv A.Ş.',
    date: new Date().toLocaleDateString(),
    reportId: 'RPT-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
  },
  vehicleInfo: {
    vin: 'JH4DA9380PS000582',
    manufacturer: 'Toyota',
    model: 'Corolla',
    year: '2020'
  },
  basicAnalysis: {
    generalCondition: 'İyi',
    majorIssuesCount: 1,
    safetyScore: 85
  },
  paintAnalysis: {
    damagedAreasCount: 3,
    overallCondition: 'İyi'
  }
};

const mockPremiumReport = {
  companyInfo: {
    name: 'ABC Otomotiv A.Ş.',
    date: new Date().toLocaleDateString(),
    reportId: 'RPT-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
  },
  vehicleInfo: {
    vin: 'JH4DA9380PS000582',
    manufacturer: 'Toyota',
    model: 'Corolla',
    year: '2020'
  },
  detailedAnalysis: {
    generalCondition: 'İyi',
    majorIssuesCount: 1,
    minorIssuesCount: 3,
    safetyScore: 85,
    recommendedActions: [
      'Fren balatalarının kontrol edilmesi',
      'Sağ ön kapı boya hasarının onarılması',
      'Motor yağı değişimi'
    ],
    estimatedCosts: {
      repairs: 4500,
      maintenance: 1200
    }
  },
  paintAnalysis: {
    damagedAreas: [
      {
        location: 'Sağ Ön Kapı',
        severity: 'medium',
        type: 'Boya Hasarı',
        estimatedRepairCost: 1200
      },
      {
        location: 'Ön Tampon',
        severity: 'low',
        type: 'Çizik',
        estimatedRepairCost: 300
      },
      {
        location: 'Arka Tampon',
        severity: 'low',
        type: 'Ezik',
        estimatedRepairCost: 800
      }
    ],
    overallCondition: 'İyi',
    repaintedPanels: ['Sol Arka Çamurluk'],
    rustSpots: []
  },
  audioAnalysis: {
    engineHealth: 'Normal',
    components: [
      {
        name: 'Motor',
        condition: 'İyi',
        confidenceScore: 95
      },
      {
        name: 'Şanzıman',
        condition: 'İyi',
        confidenceScore: 92
      },
      {
        name: 'Frenler',
        condition: 'Kontrol Gerekli',
        confidenceScore: 85,
        recommendedAction: 'Fren balataları kontrol edilmeli'
      }
    ],
    abnormalSounds: [
      {
        type: 'Sürtünme',
        severity: 'Düşük',
        location: 'Ön Frenler',
        possibleCauses: ['Aşınmış fren balataları', 'Disk yüzeyinde aşınma']
      }
    ]
  },
  additionalFeatures: {
    marketValue: {
      estimated: 485000,
      range: {
        min: 460000,
        max: 510000
      },
      comparisonData: {
        averagePrice: 495000,
        sampleSize: 24
      }
    },
    maintenanceSchedule: [
      {
        service: 'Motor Yağı Değişimi',
        dueDate: '2023-10-15',
        estimatedCost: 1200,
        priority: 'high'
      },
      {
        service: 'Fren Kontrolü',
        dueDate: '2023-09-20',
        estimatedCost: 400,
        priority: 'high'
      },
      {
        service: 'Genel Bakım',
        dueDate: '2023-12-01',
        estimatedCost: 2500,
        priority: 'medium'
      }
    ],
    historicalData: {
      previousOwners: 1,
      accidentHistory: false,
      serviceRecords: true
    }
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Query param ile rapor tipini kontrol et
    const reportType = req.query.type as string || 'free';
    const mockReportData = reportType === 'premium' ? mockPremiumReport : mockFreeReport;

    const pdfStream = await renderToStream(
      createCorporateReportTemplate(mockReportData)
    );

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=mivvo-${reportType}-report-${mockReportData.companyInfo.reportId}.pdf`);

    return new Promise((resolve, reject) => {
      pdfStream.pipe(res);
      pdfStream.on('end', () => resolve(res.end()));
      pdfStream.on('error', reject);
    });
  } catch (error) {
    console.error('PDF generation error:', error);
    res.status(500).json({ message: 'Error generating PDF' });
  }
}