import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { InfoI } from 'src/app/interface/customer';
import { CustomersService } from 'src/app/services/customers.service';
import { ngxCsv } from 'ngx-csv/ngx-csv';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-teller-transaction',
  templateUrl: './teller-transaction.component.html',
  styleUrls: ['./teller-transaction.component.scss']
})
export class TellerTransactionComponent implements OnInit {
  @ViewChild('reportContent') reportContent!: ElementRef;

  transactions: InfoI[] = [];
  isGettingTransactions: boolean = false;
  constructor(
    private _customerService: CustomersService,
  ) { }

  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers() {
    this.isGettingTransactions = true;
    this._customerService.getAllTransactions().subscribe({
      next: (response: any) => {
        this.transactions = response.reverse();
        this.isGettingTransactions = false;        
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  exportCSV() {
    let options = {
      headers: ["Id", "Account Id", "Transaction Type", "Amount", "Date", "Reference"],
    };
    new ngxCsv(this.transactions, 'Transactions', options);
  }


  generatePDF() {
    const pdf = new jsPDF('p', 'mm', 'a4'); // Create a new PDF document
    const content = this.reportContent.nativeElement; // Get the report content element

    html2canvas(content).then(canvas => {
      // Convert the report content to an image (canvas)
      const imgData = canvas.toDataURL('image/png');

      // Add the image to the PDF
      pdf.addImage(imgData, 'PNG', 10, 10, 190, 280); // Adjust the coordinates and dimensions as needed

      // Save or display the PDF
      pdf.save('teller-report.pdf'); // Save the PDF with a specific name
      // Alternatively, you can use pdf.output('datauristring') to get the PDF as a base64 data URL
    });
  }
}
