import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { Customer } from '../../../../core/models/customer';
import { CustomerService } from '../../../../core/services/customer/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.sass']
})
export class CustomerComponent implements OnInit {

  errorMessage: string;
  customers: Customer[] = [];
  customer: Customer;

  loadingIndicator: boolean = true;

  columns = [
    { prop: 'id', name: 'ID' },
    { prop: 'firstName', name: 'Firts name' },
    { prop: 'lastName', name: 'Last name' }
  ];

  selected = [];

  constructor(private customerService: CustomerService ) { }

  ngOnInit() {
    this.customerService.getAll().subscribe(
      customers => {
        this.customers = customers;
        this.loadingIndicator = false;
      },
      error => this.errorMessage = <any>error
    );
  }

  add() {
    const names = ['Juan', 'Maria', 'Pedro', 'John', 'Mary', 'Peter'];
    const lastNames = ['Perez', 'Hernandez', 'Martinez', 'Smith', 'Brown', 'Jones'];

    const customer: Customer = new Customer(names[this.randomNum(0, names.length)], lastNames[this.randomNum(0, lastNames.length)]);

    this.customerService.insert(customer).then(
      customer => this.customers.push(customer),
      error =>  this.errorMessage = <any>error
    );
  }

  randomNum(start: number, end: number): number {
    return Math.floor(Math.random() * end) + start;
  }

  onSelect({ selected }) {
    console.log('Select Event', selected, this.selected);
  }

  onActivate(event) {
    console.log('Activate Event', event);
  }
}
