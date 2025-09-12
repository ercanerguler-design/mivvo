import type { NextApiRequest, NextApiResponse } from 'next';
import PDFDocument from 'pdfkit';

export const config = { api: { bodyParser: { sizeLimit: '6mb' } } };

export default async function handler(req: NextApiRequest, res: NextApiResponse){
  if(req.method !== 'POST') return res.status(405).end();
  const { vin, paintResults, audioScore, imageDataUrl } = req.body || {};

  const doc = new PDFDocument({ size: 'A4', margin: 36 });
  const chunks: Buffer[] = [];
  doc.on('data', c => chunks.push(c));
  doc.on('end', () => {
    const pdf = Buffer.concat(chunks);
    res.setHeader('Content-Type','application/pdf');
    res.setHeader('Content-Disposition','attachment; filename="mivvo-rapor.pdf"');
    res.send(pdf);
  });

  // Header
  doc.image('public/sample-report-bg.png', 0, 0, { width: doc.page.width, height: 120 });
  doc.fillColor('#111').fontSize(24).text('Mivvo Araç Ekspertiz Raporu', { align: 'left' });
  doc.moveDown(0.3);
  doc.fontSize(10).fillColor('#555').text(new Date().toLocaleString());

  // VIN
  if(vin){
    doc.moveDown().fontSize(14).fillColor('#111').text('🔎 VIN Bilgisi');
    doc.fontSize(11).fillColor('#333').text(`VIN: ${vin}`);
  }

  // Paint
  if(Array.isArray(paintResults)){
    doc.moveDown().fontSize(14).fillColor('#111').text('🖌️ Boya & Göçük');
    doc.fontSize(11).fillColor('#333');
    paintResults.forEach((r:any, i:number)=>{
      doc.text(`• ${r.part}: ${r.status} (${Math.round((r.confidence||0)*100)}%)`);
    });
  }

  // Audio
  if(typeof audioScore === 'number'){
    doc.moveDown().fontSize(14).fillColor('#111').text('🎧 Motor Sesi Analizi');
    doc.fontSize(11).fillColor('#333').text(`Anomali Skoru: ${audioScore}`);
  }

  // Image
  if(typeof imageDataUrl === 'string' && imageDataUrl.startsWith('data:image')){
    try{
      const base64 = imageDataUrl.split(',')[1];
      const buf = Buffer.from(base64, 'base64');
      doc.moveDown().fontSize(14).fillColor('#111').text('🚗 Araç Görseli');
      doc.image(buf, { width: 360, align: 'left' });
    }catch{}
  }

  doc.end();
}
