import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import {ActivatedRoute, Router, CanDeactivate } from '@angular/router'
import { NgForm } from '@angular/forms';

import { Customer } from '../../../../core/models/customer';
import { CustomerService } from '../../../../core/services/customer/customer.service';


@Component({
    templateUrl: './customer-form.component.html',
    providers: [CustomerService],
    styleUrls: ['./customer.component.css']
})

export class CustomerFormComponent implements OnInit {
    public customerForm: FormGroup;
    public submitted: boolean;
    public events: any[] = [];
    public id: string;
    public title: string;
    customers: Customer[] = [];
    errorMessage: string;


    customer = new Customer(); //// Material model used for add/edit/delete

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private _service: CustomerService
        
    ) {
        
                         this.customerForm = this.fb.group({ //// Make Model driven form
            id: [],
            "firstName": [null, Validators.required],
            "lastName": [null, Validators.required],
            "isEdit": [false]

        })
    }

    private sub: any;

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.id = params["id"];
        })

        if (this.id != "") { //// Based on id decide Title add/edit
            this.title = "Edit Customer"
        } else {
            this.title = "Add Customer"
        }

        if (!this.id) {
            return;
        }

        this._service.loadById(this.id) //// If id is passed get material for edit.
            .then(customer => {
                this.customer = customer
                console.log(customer.id);
                console.log(customer.firstName);
                console.log(customer.lastName);
                // this.MapFormToModel(this.materialForm.controls, material);
                let Form = (this.customerForm);
                if (this.id != "") { 
                    //// If valid id is found (EDIT) fill Model form by material data passed by service.
                    customer.isEdit = true;
                    (<FormGroup>this.customerForm).setValue(customer, { onlySelf: false });

                }
            }
            // success
            // (data) => {
            //     debugger
            //     // redirect here...
            // },
            //user => this.material = user
            // (mateial) => {
            //     debugger
            //     this.material=material
            // }
            // response => {
            //     if (response.status == 404) {
            //         this._router.navigate(['NotFound']);
            //     }
            // }
            )

       
    }

   

    save(form, isValid: boolean) {
            console.log(form);
            if(!form.isEdit)
            {
                     this._service.insert(form)
             .then(
        form => this.customers.push(form),
        error =>  this.errorMessage = <any>error
        
      );
            }
            else
            {
                this._service.update(form).then(res => this.customer.isEdit,
                error =>  this.errorMessage = <any>error);
            }
    
       this.router.navigate(["/smart-cities/customers"]);
    }

    routerCanDeactivate(next, previous) {
        debugger;
        return confirm("Are u sure?");
    }


}

