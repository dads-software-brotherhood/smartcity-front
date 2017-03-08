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

  customer: Customer;

  c: number = 1;

  constructor(private customerService: CustomerService ) { }

  ngOnInit() {
    this.errorMessage = null;

    this.customerService.count().subscribe(
      count => this.count = count,
      error => this.errorMessage = <any>error
    );

    this.customerService.getAll().subscribe(
      customers => this.customers = customers,
      error => this.errorMessage = <any>error
    );
  }

  add() {
    const customer: Customer = new Customer('Juan' + this.c,'Perez' + this.c);
    this.c++;

    this.customerService.insert(customer).then(
      customer => {this.customers.push(customer); this.count++},
      error =>  this.errorMessage = <any>error
    );
  }

}
