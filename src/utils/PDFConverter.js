import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const exportToPDF = (data) => {

  const doc = new jsPDF();
  const columns = Object.keys(data[0]);
  const rows = data.map(item => columns.map(col => item[col]));

  autoTable(doc, {
    head: [columns],
    body: rows,
  });

  doc.save('phenix-cards-data.pdf');
};
