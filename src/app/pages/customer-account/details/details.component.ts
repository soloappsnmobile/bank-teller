import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AccountI, CustomerI, InfoI,  } from 'src/app/interface/customer';
import { CustomersService } from 'src/app/services/customers.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  customerId: string = '';
  isGettingCustomer: boolean = false;
  customer!: CustomerI
  accounts!: AccountI;
  transaction!: InfoI[];
  showModal: boolean = false;
  trasactionType: string = '';
  amountForm!: FormGroup;
  accountId!: number;
  totalAmount: number = 0;
  isLoading: boolean = false;
  // inputAmount: number = 0;
  constructor(
    private _route: ActivatedRoute,
    private _customerService: CustomersService,
    private _formBuilder: FormBuilder,
  ) {
    this.amountForm = this._formBuilder.group({
      amount: ['']
    });
  }

  ngOnInit(): void {
    this.getCustomerIdFromRoute();
    this.getCustomerById();
    this.getCustomerAccounts();
  }

  getCustomerIdFromRoute() {
    this._route.params.subscribe(params => {
      this.customerId = params['id'];
    });
  }

  // Get value from input
  get amount() {
    return this.amountForm.get('amount')?.value;
  }

  getCustomerById() {
    this.isGettingCustomer = true;
    this._customerService.getCustomerById(this.customerId).subscribe({
      next: (response: any) => {
        this.customer = response;
        this.isGettingCustomer = false;
      },
      error: (error: any) => {
        console.log(error);
        this.isGettingCustomer = false;
      }
    });
  }

  getCustomerAccounts() {
    this.isGettingCustomer = true;
    this._customerService.getCustomerAccounts(this.customerId).subscribe({
      next: (response: any) => {
        this.accounts = response;
        this.accountId = this.accounts.id;        
        this.getCustomerTransactions(this.accountId);
        this.isGettingCustomer = false;
      },
      error: (error: any) => {
        console.log(error);
        this.isGettingCustomer = false;
      }
    });
  }

  getCustomerTransactions(accountId: number) {

    this.isGettingCustomer = true;
    this._customerService.getCustomerTransactions(accountId).subscribe({
      next: (response: any) => {
        // Calculate total amount
        if (response && Array.isArray(response)) {
          response.forEach((transaction: InfoI) => {
            if (transaction.type === 'Deposit') {
              this.totalAmount += transaction.amount;
            } else {
              this.totalAmount -= transaction.amount;
            }
          });
        } else {
          // Handle the case where response is undefined or not an array
          console.log('Invalid response:', response);
        }
        // Push response to transaction array 
        this.transaction = response;
        this.isGettingCustomer = false;
      },
      error: (error: any) => {
        console.log(error);
        this.isGettingCustomer = false;
      }
    });
  }



  deposit() {
    //Id's should be number from 1 to 100 
    this.isLoading = true;
    const payload: InfoI = {
      id: Math.floor(Math.random() * 1000) + 1,
      accountId: this.accountId,
      type: 'Deposit',
      amount: this.amount,
      date: new Date().toISOString()
    }
    this._customerService.deposit(payload, this.accountId).subscribe({
      next: (response: any) => {
        // this.getCustomerAccounts();
        window.location.reload();
        this.closeModal();
        this.isLoading = false;
      },
      error: (error: any) => {
        console.log(error);
        this.isLoading = false;
      }
    });
  }

  withdrawal() {
    //Id's should be number from 1 to 100 
    this.isLoading = true;
    const payload: InfoI = {
      id: Math.floor(Math.random() * 1000) + 1,
      accountId: this.accountId,
      type: 'Withdrawal',
      amount: this.amount,
      date: new Date().toISOString()
    }
    this._customerService.withdraw(payload, this.accountId).subscribe({
      next: (response: any) => {
        // this.getCustomerAccounts();
        window.location.reload();
        this.closeModal();
        this.isLoading = false;
      },
      error: (error: any) => {
        console.log(error);
        this.isLoading = false;
      }
    });
  }


  // Show Deposit or Withdrawal Modal
  showDepositOrWithdrawalModal(transactionType: string) {
    this.trasactionType = transactionType;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }




}
