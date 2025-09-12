import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Define TypeScript interfaces
interface PaintAnalysisDetail {
  area: string;
  damage: string;
  severity: string;
}

interface AudioAnalysisIssue {
  component: string;
  status: string;
  confidence: string;
}

interface VinAnalysis {
  manufacturer: string;
  model: string;
  year: string;
  verificationStatus: string;
  previousDamage: string;
}

interface PaintAnalysis {
  totalAreas: number;
  damagedAreas: number;
  condition: string;
  details: PaintAnalysisDetail[];
}

interface AudioAnalysis {
  engineHealth: string;
  issues: AudioAnalysisIssue[];
}

interface CompanyInfo {
  name: string;
  date: string;
  reportId: string;
}

interface AnalysisResults {
  paintAnalysis: PaintAnalysis;
  audioAnalysis: AudioAnalysis;
  vinAnalysis: VinAnalysis;
}

interface CorporateReportProps {
  companyInfo: CompanyInfo;
  analysisResults: AnalysisResults;
}

const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: '#ffffff'
  },
  header: {
    marginBottom: 20,
    borderBottom: 1,
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    color: '#1a237e',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  section: {
    margin: 10,
    padding: 10,
    borderRadius: 3,
  },
  sectionTitle: {
    fontSize: 16,
    marginBottom: 10,
    color: '#1a237e',
    borderBottom: 1,
    paddingBottom: 5,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  label: {
    width: 120,
    color: '#666',
  },
  value: {
    flex: 1,
  },
  table: {
    width: 'auto',
    marginVertical: 10,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomColor: '#bbb',
    borderBottomWidth: 1,
    alignItems: 'center',
    minHeight: 24,
  },
  tableHeader: {
    backgroundColor: '#f0f0f0',
  },
  tableCol: {
    width: '33%',
    padding: 5,
  },
});

interface CorporateReportProps {
  companyInfo: {
    name: string;
    date: string;
    reportId: string;
  };
  analysisResults: {
    paintAnalysis: {
      totalAreas: number;
      damagedAreas: number;
      condition: string;
      details: Array<{
        area: string;
        damage: string;
        severity: string;
      }>;
    };
    audioAnalysis: {
      engineHealth: string;
      issues: Array<{
        component: string;
        status: string;
        confidence: string;
      }>;
    };
    vinAnalysis: {
      manufacturer: string;
      model: string;
      year: string;
      verificationStatus: string;
      previousDamage: string;
    };
  };
}

export const createCorporateReport = ({ companyInfo, analysisResults }: CorporateReportProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>{companyInfo.name}</Text>
        <Text style={styles.subtitle}>Rapor No: {companyInfo.reportId}</Text>
        <Text style={styles.subtitle}>Tarih: {companyInfo.date}</Text>
      </View>

      {/* VIN Analizi */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Araç Bilgileri</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Üretici:</Text>
          <Text style={styles.value}>{analysisResults.vinAnalysis.manufacturer}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Model:</Text>
          <Text style={styles.value}>{analysisResults.vinAnalysis.model}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Yıl:</Text>
          <Text style={styles.value}>{analysisResults.vinAnalysis.year}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Doğrulama Durumu:</Text>
          <Text style={styles.value}>{analysisResults.vinAnalysis.verificationStatus}</Text>
        </View>
      </View>

      {/* Boya Analizi */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Boya Analizi</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Toplam Alan:</Text>
          <Text style={styles.value}>{analysisResults.paintAnalysis.totalAreas}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Hasarlı Alan:</Text>
          <Text style={styles.value}>{analysisResults.paintAnalysis.damagedAreas}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Genel Durum:</Text>
          <Text style={styles.value}>{analysisResults.paintAnalysis.condition}</Text>
        </View>

        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={styles.tableCol}>Bölge</Text>
            <Text style={styles.tableCol}>Hasar Tipi</Text>
            <Text style={styles.tableCol}>Şiddet</Text>
          </View>
          {analysisResults.paintAnalysis.details.map((detail, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCol}>{detail.area}</Text>
              <Text style={styles.tableCol}>{detail.damage}</Text>
              <Text style={styles.tableCol}>{detail.severity}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Ses Analizi */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ses Analizi</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Motor Durumu:</Text>
          <Text style={styles.value}>{analysisResults.audioAnalysis.engineHealth}</Text>
        </View>

        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={styles.tableCol}>Bileşen</Text>
            <Text style={styles.tableCol}>Durum</Text>
            <Text style={styles.tableCol}>Güven Oranı</Text>
          </View>
          {analysisResults.audioAnalysis.issues.map((issue, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCol}>{issue.component}</Text>
              <Text style={styles.tableCol}>{issue.status}</Text>
              <Text style={styles.tableCol}>{issue.confidence}</Text>
            </View>
          ))}
        </View>
      </View>
    </Page>
  </Document>
);