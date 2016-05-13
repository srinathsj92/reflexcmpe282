import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
//Grab everything with import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import 'rxjs/add/operator/map'; 
import 'rxjs/add/operator/catch';

import { ICustomer, IOrder, IState } from '../interfaces';

@Injectable()
export class DataService {
  
    _baseUrl: string = '';
    customers: ICustomer[];
    orders: IOrder[];
    states: IState[];

    constructor(private http: Http) { }
    
    getCustomers() : Observable<ICustomer[]> {
        if (!this.customers) {
            //return this.http.get(this._baseUrl + 'customers.json')
            return this.http.get("/sjsu/api/customer")
                        .map((res: Response) => {
                            this.customers = res.json();
                            return  this.customers;// JSON.parse(res.json());
                        })
                        .catch(this.handleError);
        }
        else {
            //return cached data
            return this.createObservable(this.customers);
        }
    }
    
    getCustomer(id: number) : Observable<ICustomer> {
        if (this.customers) {
            //filter using cached data
            return this.findCustomerObservable(id);
        } else {
            //Query the existing customers to find the target customer
            return Observable.create((observer: Observer<ICustomer>) => {
                    this.getCustomers().subscribe((customers: ICustomer[]) => {
                        this.customers = customers;                
                        const cust = this.filterCustomers(id);
                        observer.next(cust);
                        observer.complete();
                })
            })
            .catch(this.handleError);
        }
    }

    getOrders(id: number) : Observable<IOrder[]> {

        console.log("In getOrders() function with ID = ",id);

      //return this.http.get(this._baseUrl + 'orders.json')
        let URL = ["/sjsu/api/customer",id,"orders"].join("/");
        console.log("In getOrders() : URL = ",URL);
        return this.http.get(URL)
                .map((res: Response) => {
                    this.orders = res.json();
                   // return this.orders.filter((order: IOrder) => order.customerId === id);
                    console.log("In getOrders() : Order Response = ",this.orders);
                    return this.orders;
                })
                .catch(this.handleError);               
    }
    
    updateCustomer(customer: ICustomer) : Observable<boolean> {
        return Observable.create((observer: Observer<boolean>) => {
            this.customers.forEach((cust: ICustomer, index: number) => {
               if (cust.id === customer.id) {
                   const state = this.filterStates(customer.state.abbreviation);
                   customer.state.abbreviation = state.abbreviation;
                   customer.state.name = state.name;
                   this.customers[index] = customer;
               }
            });
            observer.next(true);
            observer.complete();
        });
    }
    
    getStates(): Observable<IState[]> {
        if (this.states) {
            return Observable.create((observer: Observer<IState[]>) => {
                observer.next(this.states);
                observer.complete();
            });
        } else {
            return this.http.get(this._baseUrl + 'states.json').map((response: Response) => {
                this.states = response.json();
                return this.states;
            })
            .catch(this.handleError);
        }
    }
    
    private findCustomerObservable(id: number) : Observable<ICustomer> {        
        return this.createObservable(this.filterCustomers(id));
    }
    
    private filterCustomers(id: number) : ICustomer {
        console.log("Filter Customers",id);
        const custs = this.customers.filter((cust) =>{

            //console.log("Matching ",cust.customerNumber ," to ", id);
            return cust.customerNumber === id;
        });
        return (custs.length) ? custs[0] : null;
    }
    
    private createObservable(data: any) : Observable<any> {
        return Observable.create((observer: Observer<any>) => {
            observer.next(data);
            observer.complete();
        });
    }
    
    private filterStates(stateAbbreviation: string) {
        const filteredStates = this.states.filter((state) => state.abbreviation === stateAbbreviation);
        return (filteredStates.length) ? filteredStates[0] : null;
    }
    
    private handleError(error: any) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

}
