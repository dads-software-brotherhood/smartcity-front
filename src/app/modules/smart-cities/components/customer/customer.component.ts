import { Component, OnInit } from '@angular/core';

import { Customer } from '../../../../core/models/customer';
import { CustomerService } from '../../../../core/services/customer/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.sass']
})
export class CustomerComponent implements OnInit {

  errorMessage: string;
  customers: Customer[];
  count: number;

  constructor(private customerService: CustomerService ) { }

  ngOnInit() {
    this.errorMessage = null;

    this.customerService.count().subscribe(
      count => this.count = count,
      error => this.errorMessage = <any>error
    );

    if (this.errorMessage) {
      console.log('Error: ' + this.errorMessage);
    }

    this.errorMessage = null;

    this.customerService.getAll().subscribe(
      customers => this.customers = customers,
      error => this.errorMessage = <any>error
    );

    if (this.errorMessage) {
      console.log('Error: ' + this.errorMessage);
    } else {
      console.log('customers: ' + this.customers);
    }
  }

}
