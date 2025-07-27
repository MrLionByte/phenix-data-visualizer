import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const exportToPDF = (data) => {
  const doc = new jsPDF();
  const columns = Object.keys(data[0]);
  const rows = data.map(item => columns.map(col => item[col]));

  doc.autoTable({
    head: [columns],
    body: rows,
  });

  doc.save('phinixcards-data.pdf');
};

