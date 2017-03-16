import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {RouterLink, Router} from '@angular/router';
import { Customer } from '../../../../core/models/customer';
import { CustomerService } from '../../../../core/services/customer/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  errorMessage: string;
  customers: Customer[] = [];
  Objcustomer = new Customer();

  loadingIndicator: boolean = true;
  showDialog: boolean;

  // columns = [
  //   { prop: 'id', name: 'ID' },
  //   { prop: 'firstName', name: 'Firts name' },
  //   { prop: 'lastName', name: 'Last name' }
  // ];

  // selected = [];

  constructor(private customerService: CustomerService, private _router: Router ) { 
  }

  ngOnInit() {
    console.log('carga datos');
    this.loadingIndicator = true;
    this.bindTable();
  }

  bindTable() { //// Bind material Grid
        this.customerService.getAll().subscribe(
      customers => {
        this.customers = customers;
        this.loadingIndicator = false;

      },
      error => this.errorMessage = <any>error
    );
    }

   confirmDelete() {
        this.showDialog = false; /// Close dialog
        this.deleteCustomer(this.Objcustomer);
                this.bindTable();
    }

    deleteCustomer(customer) {
        console.log(customer);
        var flag = 0;
        console.log(customer.id);
        this.customerService.delete(customer.id)
            .then(res => true,
                error =>  this.errorMessage = <any>error);

    }

  // add() {
  //   const names = ['Juan', 'Maria', 'Pedro', 'John', 'Mary', 'Peter'];
  //   const lastNames = ['Perez', 'Hernandez', 'Martinez', 'Smith', 'Brown', 'Jones'];

  //   const customer: Customer = new Customer(names[this.randomNum(0, names.length)], lastNames[this.randomNum(0, lastNames.length)]);

  //   this.customerService.insert(customer).then(
  //     customer => this.customers.push(customer),
  //     error =>  this.errorMessage = <any>error
  //   );
  // }

  // randomNum(start: number, end: number): number {
  //   return Math.floor(Math.random() * end) + start;
  // }

  // onSelect({ selected }) {
  //   console.log('Select Event', selected, this.selected);
  // }

  // onActivate(event) {
  //   console.log('Activate Event', event);
  // }
}
