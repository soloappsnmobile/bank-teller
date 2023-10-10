import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { InfoI, TransactionI } from '../interface/customer';


@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  API_URL = environment.API_URL;

  constructor(
    private _http: HttpClient
  ) { }

  getCustomers() {
    return this._http.get(`${this.API_URL}/customers`);
  }

  getCustomerById(id: string) {
    return this._http.get(`${this.API_URL}/customers/${id}`);
  }

  getCustomerAccounts(id: string) {
    return this._http.get(`${this.API_URL}/accounts/${id}`);
  }

  getCustomerTransactions(id: number) {
    return this._http.get(`${this.API_URL}/${id}/transactions/info`);
  }

  deposit(paload: InfoI, uid: number) {
    const transactionUrl = `${this.API_URL}/${uid}/transactions/info`;

    return this._http.post(transactionUrl, paload);
  }

  withdraw(paload: InfoI, uid: number) {
    const transactionUrl = `${this.API_URL}/${uid}/transactions/info`;

    return this._http.post(transactionUrl, paload);
  }
}
