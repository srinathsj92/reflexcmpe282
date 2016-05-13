"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
//Grab everything with import 'rxjs/Rx';
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
var DataService = (function () {
    function DataService(http) {
        this.http = http;
        this._baseUrl = '';
    }
    DataService.prototype.getCustomers = function () {
        var _this = this;
        if (!this.customers) {
            //return this.http.get(this._baseUrl + 'customers.json')
            return this.http.get("/sjsu/api/customer")
                .map(function (res) {
                _this.customers = res.json();
                return _this.customers; // JSON.parse(res.json());
            })
                .catch(this.handleError);
        }
        else {
            //return cached data
            return this.createObservable(this.customers);
        }
    };
    DataService.prototype.getCustomer = function (id) {
        var _this = this;
        if (this.customers) {
            //filter using cached data
            return this.findCustomerObservable(id);
        }
        else {
            //Query the existing customers to find the target customer
            return Observable_1.Observable.create(function (observer) {
                _this.getCustomers().subscribe(function (customers) {
                    _this.customers = customers;
                    var cust = _this.filterCustomers(id);
                    observer.next(cust);
                    observer.complete();
                });
            })
                .catch(this.handleError);
        }
    };
    DataService.prototype.getOrders = function (id) {
        var _this = this;
        console.log("In getOrders() function with ID = ", id);
        //return this.http.get(this._baseUrl + 'orders.json')
        var URL = ["/sjsu/api/customer", id, "orders"].join("/");
        console.log("In getOrders() : URL = ", URL);
        return this.http.get(URL)
            .map(function (res) {
            _this.orders = res.json();
            // return this.orders.filter((order: IOrder) => order.customerId === id);
            console.log("In getOrders() : Order Response = ", _this.orders);
            return _this.orders;
        })
            .catch(this.handleError);
    };
    DataService.prototype.updateCustomer = function (customer) {
        var _this = this;
        return Observable_1.Observable.create(function (observer) {
            _this.customers.forEach(function (cust, index) {
                if (cust.id === customer.id) {
                    var state = _this.filterStates(customer.state.abbreviation);
                    customer.state.abbreviation = state.abbreviation;
                    customer.state.name = state.name;
                    _this.customers[index] = customer;
                }
            });
            observer.next(true);
            observer.complete();
        });
    };
    DataService.prototype.getStates = function () {
        var _this = this;
        if (this.states) {
            return Observable_1.Observable.create(function (observer) {
                observer.next(_this.states);
                observer.complete();
            });
        }
        else {
            return this.http.get(this._baseUrl + 'states.json').map(function (response) {
                _this.states = response.json();
                return _this.states;
            })
                .catch(this.handleError);
        }
    };
    DataService.prototype.findCustomerObservable = function (id) {
        return this.createObservable(this.filterCustomers(id));
    };
    DataService.prototype.filterCustomers = function (id) {
        console.log("Filter Customers", id);
        var custs = this.customers.filter(function (cust) {
            //console.log("Matching ",cust.customerNumber ," to ", id);
            return cust.customerNumber === id;
        });
        return (custs.length) ? custs[0] : null;
    };
    DataService.prototype.createObservable = function (data) {
        return Observable_1.Observable.create(function (observer) {
            observer.next(data);
            observer.complete();
        });
    };
    DataService.prototype.filterStates = function (stateAbbreviation) {
        var filteredStates = this.states.filter(function (state) { return state.abbreviation === stateAbbreviation; });
        return (filteredStates.length) ? filteredStates[0] : null;
    };
    DataService.prototype.handleError = function (error) {
        console.error(error);
        return Observable_1.Observable.throw(error.json().error || 'Server error');
    };
    DataService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], DataService);
    return DataService;
}());
exports.DataService = DataService;
//# sourceMappingURL=data.service.js.map