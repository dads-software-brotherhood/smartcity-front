import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Customer } from '../../models/customer';
import { LoginService } from '../login/login.service';

import { RemoteUtils } from '../../common/rempote-utils';

import { environment } from '../../../../environments/environment';

const customerUrl = environment.backend_sdk + '/customers';
const customersCountUrl = customerUrl + '/count'

@Injectable()
export class CustomerService extends RemoteUtils {

  constructor(private http: Http, private loginService: LoginService) {
    super(loginService);
  }

  count(): Observable<number> {
    const requestOptions: RequestOptions = this.buildRequestOptions();

    return this.http.get(customersCountUrl, requestOptions)
    .map(this.extractNumberBody)
    .catch(this.handleError);
  }

  getAll(limit?: number, offset?: number): Observable<Customer[]> {
    const requestOptions: RequestOptions = this.buildRequestOptions();

    return this.http.get(customerUrl, requestOptions)
    .map(this.extractDataArray)
    .catch(this.handleError);
  }

  loadById(id: string): Promise<Customer> {
    const requestOptions: RequestOptions = this.buildRequestOptions();

    return this.http.get(this.buildByIdUrl(id), requestOptions).toPromise()
    .then(this.extractData)
    .catch(this.handleError);
  }

  insert(customer: Customer): Promise<Customer> {
    const requestOptions: RequestOptions = this.buildRequestOptions(null, 'application/json');

    return this.http.post(customerUrl, JSON.stringify(customer), requestOptions).toPromise()
    .then(this.extractData)
    .catch(this.handleError);
  }

  update(customer: Customer): Promise<boolean> {
    const requestOptions: RequestOptions = this.buildRequestOptions(null, 'application/json');

    return this.http.put(this.buildByIdUrl(customer.id), JSON.stringify(customer), requestOptions).toPromise()
    .then((res: Response) => {return true;})
    .catch(this.handleError);
  }

  delete(id: string): Promise<boolean> {
    const requestOptions: RequestOptions = this.buildRequestOptions();

    return this.http.delete(this.buildByIdUrl(id), requestOptions).toPromise()
    .then((res: Response) => {return true;})
    .catch(this.handleError);
  }

  private buildByIdUrl(id: string) {
    return customerUrl + '/' + id;
  }

}
