import { saveAs } from 'file-saver';
import htmlDocx from 'html-docx-js/dist/html-docx';

export const exportToDoc = (data) => {
  const html = `
    <html>
      <head><meta charset="utf-8"></head>
      <body>
        ${data.map((item, index) => `
          <h2>Item ${index + 1}</h2>
          <ul>
            ${Object.entries(item).map(([key, value]) => `
              <li><strong>${key}:</strong> ${typeof value === 'object' ? JSON.stringify(value) : value}</li>
            `).join('')}
          </ul>
        `).join('')}
      </body>
    </html>
  `;

  const converted = htmlDocx.asBlob(html);
  saveAs(converted, 'phinixcards-data.docx');
};
