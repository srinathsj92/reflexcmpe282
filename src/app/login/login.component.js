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
var router_1 = require('@angular/router');
//import { IOrder, IOrderItem } from '../shared/interfaces';
//import { CustomerOrdersComponent } from './customerOrders.component';
//import { CustomerDetailsComponent } from './customerDetails.component';
//import { CustomerEditComponent } from './customerEdit.component';
var LoginComponent = (function () {
    //displayMode: CustomerDisplayModeEnum;
    //displayModeEnum = CustomerDisplayModeEnum;
    function LoginComponent(router) {
        this.router = router;
    }
    LoginComponent.prototype.routerOnActivate = function (current, prev, currTree, prevTree) {
        //var path = currTree.children(current)[0].stringifiedUrlSegments;
        //switch (path) {
        //  case 'details':
        //    this.displayMode = CustomerDisplayModeEnum.Details;
        //    break;
        //  case 'orders':
        //    this.displayMode = CustomerDisplayModeEnum.Orders;
        //    break;
        //  case 'edit':
        //    this.displayMode = CustomerDisplayModeEnum.Edit;
        //    break;
        //}
    };
    LoginComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'login',
            templateUrl: 'login.component.html',
            directives: [router_1.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [router_1.Router])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//enum CustomerDisplayModeEnum {
//  Details=0,
//  Orders=1,
//  Edit=2
//}
//# sourceMappingURL=login.component.js.map