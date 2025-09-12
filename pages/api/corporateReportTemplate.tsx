import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Styles for PDF
const styles = StyleSheet.create({
  page: { 
    padding: 30,
    backgroundColor: '#ffffff'
  },
  section: { 
    margin: 10,
    padding: 10,
    flexGrow: 1 
  },
  title: { 
    fontSize: 24,
    marginBottom: 10,
    color: '#1a237e',
    fontWeight: 'bold'
  },
  subtitle: { 
    fontSize: 16,
    marginBottom: 8,
    color: '#1a237e',
    borderBottom: 1,
    paddingBottom: 5
  },
  text: { 
    fontSize: 12,
    marginBottom: 5,
    color: '#333333'
  },
  header: {
    marginBottom: 20,
    borderBottom: 1,
    paddingBottom: 10,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  label: {
    width: 150,
    fontWeight: 'bold',
    color: '#666666'
  },
  value: {
    flex: 1,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
    paddingVertical: 5,
  },
  tableHeader: {
    backgroundColor: '#F3F4F6',
    fontWeight: 'bold',
  },
  tableCell: {
    flex: 1,
    padding: 5,
  }
});

export const createCorporateReportTemplate = (reportData: any) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.title}>{reportData.companyInfo.name}</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Rapor No:</Text>
          <Text style={styles.value}>{reportData.companyInfo.reportId}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Rapor Tarihi:</Text>
          <Text style={styles.value}>{reportData.companyInfo.date}</Text>
        </View>
      </View>

      {/* Vehicle Information */}
      <View style={styles.section}>
        <Text style={styles.subtitle}>Araç Bilgileri</Text>
        <View style={styles.row}>
          <Text style={styles.label}>VIN:</Text>
          <Text style={styles.value}>{reportData.vehicleInfo.vin}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Üretici:</Text>
          <Text style={styles.value}>{reportData.vehicleInfo.manufacturer}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Model:</Text>
          <Text style={styles.value}>{reportData.vehicleInfo.model}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Model Yılı:</Text>
          <Text style={styles.value}>{reportData.vehicleInfo.year}</Text>
        </View>
      </View>

      {/* Basic Analysis - Free Version */}
      {reportData.basicAnalysis && (
        <View style={styles.section}>
          <Text style={styles.subtitle}>Genel Durum Analizi</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Genel Durum:</Text>
            <Text style={styles.value}>{reportData.basicAnalysis.generalCondition}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Önemli Sorun Sayısı:</Text>
            <Text style={styles.value}>{reportData.basicAnalysis.majorIssuesCount}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Güvenlik Skoru:</Text>
            <Text style={styles.value}>{reportData.basicAnalysis.safetyScore}/100</Text>
          </View>
        </View>
      )}

      {/* Detailed Analysis - Premium Version */}
      {reportData.detailedAnalysis && (
        <>
          <View style={styles.section}>
            <Text style={styles.subtitle}>Detaylı Analiz</Text>
            <View style={styles.row}>
              <Text style={styles.label}>Genel Durum:</Text>
              <Text style={styles.value}>{reportData.detailedAnalysis.generalCondition}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Önemli Sorunlar:</Text>
              <Text style={styles.value}>{reportData.detailedAnalysis.majorIssuesCount}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Minor Sorunlar:</Text>
              <Text style={styles.value}>{reportData.detailedAnalysis.minorIssuesCount}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Güvenlik Skoru:</Text>
              <Text style={styles.value}>{reportData.detailedAnalysis.safetyScore}/100</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.subtitle}>Önerilen İşlemler</Text>
            {reportData.detailedAnalysis.recommendedActions.map((action: string, index: number) => (
              <View key={index} style={styles.row}>
                <Text style={styles.label}>{index + 1}.</Text>
                <Text style={styles.value}>{action}</Text>
              </View>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.subtitle}>Tahmini Maliyetler</Text>
            <View style={styles.row}>
              <Text style={styles.label}>Onarım:</Text>
              <Text style={styles.value}>{reportData.detailedAnalysis.estimatedCosts.repairs} TL</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Bakım:</Text>
              <Text style={styles.value}>{reportData.detailedAnalysis.estimatedCosts.maintenance} TL</Text>
            </View>
          </View>
        </>
      )}

      {/* Market Analysis - Premium Only */}
      {reportData.additionalFeatures && (
        <View style={styles.section}>
          <Text style={styles.subtitle}>Piyasa Analizi</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Tahmini Değer:</Text>
            <Text style={styles.value}>{reportData.additionalFeatures.marketValue.estimated} TL</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Değer Aralığı:</Text>
            <Text style={styles.value}>{reportData.additionalFeatures.marketValue.range.min} TL - {reportData.additionalFeatures.marketValue.range.max} TL</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Piyasa Ortalaması:</Text>
            <Text style={styles.value}>{reportData.additionalFeatures.marketValue.comparisonData.averagePrice} TL</Text>
          </View>
        </View>
      )}
    </Page>
  </Document>
);