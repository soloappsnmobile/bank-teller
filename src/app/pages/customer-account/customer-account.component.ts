import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerI } from 'src/app/interface/customer';
import { CustomersService } from 'src/app/services/customers.service';

@Component({
  selector: 'app-customer-account',
  templateUrl: './customer-account.component.html',
  styleUrls: ['./customer-account.component.scss']
})
export class CustomerAccountComponent implements OnInit{
  isGettingAccounts: boolean = false;
  customers: CustomerI[] = [];
  constructor(
    private _customerService: CustomersService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.getCustomers();
  }

  // Get all accounts
  getCustomers() {
    this.isGettingAccounts = true;
    this._customerService.getCustomers().subscribe({
      next: (response: any) => {
        this.customers = response;        
        this.isGettingAccounts = false;
      },
      error: (error: any) => {
        console.log(error);
        this.isGettingAccounts = false;
      }
    });
  }

  // Navigate to details page
  goToDetails(customerId: number) {
    this._router.navigate(['/accounts', customerId]);
  }
}
