import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export interface Invoice {
  created_at:string;
  studentName:string;
  product_type:string;
  order_ref_no:string;
  total_amount:string;
  product:{productName:string,amount:string}[]
}
export interface InvoiceUser {
  created_at:string;
  studentName:string;
  product_type:string;
  order_ref_no:string;
  total_amount:string;
  product:{productName:string,amount:string}[]
}

export async function generateAppointmentLetter(data:Invoice) {
  const doc = new jsPDF();
  let finalY = 50;

  doc.setFontSize(12);
  doc.setTextColor(100);
  doc.text(`For ${data.studentName}`, 10, 20);
  doc.text(`${data.created_at}`, 170, 20);

  doc.setFontSize(16);
  doc.setTextColor(50);
  doc.text(`${data.product_type}`, 10, 35);
  doc.setFontSize(10);
  doc.setTextColor(150);
  doc.text(`${(data.product.map((item)=> item.productName).join(","))}`, 10, 42);

  autoTable(doc, {
    body: data.product.map((item) => [item.productName, `AED ${item.amount}`]),
    theme: 'plain',
    styles: {
      fontSize: 12,
      textColor: [50, 50, 50],
      halign: 'left',
      valign: 'middle',
    },
    columnStyles: {
      0: { cellWidth: 120 },
      1: { cellWidth: 50, halign: 'right' },
    },
    margin: { top: 50 },
    startY: 50,
    didDrawPage: function (dat) {
      finalY =  dat.cursor ? dat.cursor.y : 0;
    },
  });

  doc.setFontSize(14);
  doc.setTextColor(30);
  doc.text('Amount', 10, finalY + 10);
  doc.setTextColor(30);
  doc.text(`AED ${data.total_amount}`, 10, finalY + 20);
  return doc.output();
}

generateAppointmentLetter(
    {
  created_at:"28/09/2002",
  studentName:"Prathmesh Tikle",
  product_type:"Clothes",
  order_ref_no:"dfcghvjbjhgcf4522",
  total_amount:"500000",
  product:[{
    productName:"Tshirt",
    amount:"400"},{
    productName:"Tshirt",
    amount:"400"}
]}
)