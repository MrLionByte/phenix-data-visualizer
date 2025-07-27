import { Document, Packer, Paragraph, TextRun } from 'docx';
import { saveAs } from 'file-saver';

export const exportToDoc = (data) => {
  const doc = new Document();

  data.forEach((item, index) => {
    doc.addSection({
      children: [
        new Paragraph({
          children: [
            new TextRun({ text: `Item ${index + 1}`, bold: true, size: 24 }),
          ],
        }),
        ...Object.entries(item).map(([key, value]) =>
          new Paragraph(`${key}: ${typeof value === 'object' ? JSON.stringify(value) : value}`)
        ),
        new Paragraph(''),
      ],
    });
  });

  Packer.toBlob(doc).then(blob => {
    saveAs(blob, 'data.docx');
  });
};
