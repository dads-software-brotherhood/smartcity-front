import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Customer } from '../../models/customer';

import { environment } from '../../../../environments/environment';

const customerUrl = environment.backend_sdk + '/customers';
const customersCountUrl = customerUrl + '/count'

@Injectable()
export class CustomerService {

  constructor(private http: Http) { }

  count(): Observable<number> {
    return this.http.get(customersCountUrl)
      .map(this.extractNumberBody)
      .catch(this.handleError);
  }

  getAll(limit?: number, offset?: number): Observable<Customer[]> {
    return this.http.get(customerUrl)
      .map(this.extractDataArray)
      .catch(this.handleError);
  }

  loadById(id: string): Customer {
    return null;
  }

  insert(customer: Customer): Customer {
    return null;
  }

  update(customer: Customer): boolean {
    return null;
  }

  delete(id: string): boolean {
    return null;
  }

  private extractNumberBody(res: Response): number {
    return Number(res.text());
  }

  private extractTextBody(res: Response): string {
    return res.text();
  }

  private extractDataArray(res: Response) {
    const body = res.json();
    return body || [];
  }

  private extractData(res: Response) {
    const body = res.json();
    return body || {};
  }

  private handleError (error: Response | any) {
      // In a real world app, we might use a remote logging infrastructure
      let errMsg: string;
      if (error instanceof Response) {
        const body = error.json() || '';
        const err = body.error || JSON.stringify(body);
        errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
      } else {
        errMsg = error.message ? error.message : error.toString();
      }
      console.error(errMsg);
      return Observable.throw(errMsg);
    }
}
