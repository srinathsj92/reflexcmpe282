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
var customerOrders_component_1 = require('./customerOrders.component');
var customerDetails_component_1 = require('./customerDetails.component');
var customerEdit_component_1 = require('./customerEdit.component');
var CustomerComponent = (function () {
    function CustomerComponent(router) {
        this.router = router;
        this.displayModeEnum = CustomerDisplayModeEnum;
    }
    CustomerComponent.prototype.routerOnActivate = function (current, prev, currTree, prevTree) {
        var path = currTree.children(current)[0].stringifiedUrlSegments;
        switch (path) {
            case 'details':
                this.displayMode = CustomerDisplayModeEnum.Details;
                break;
            case 'orders':
                this.displayMode = CustomerDisplayModeEnum.Orders;
                break;
            case 'edit':
                this.displayMode = CustomerDisplayModeEnum.Edit;
                break;
        }
    };
    CustomerComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'orders',
            templateUrl: 'customer.component.html',
            directives: [router_1.ROUTER_DIRECTIVES]
        }),
        router_1.Routes([
            { path: '/orders', component: customerOrders_component_1.CustomerOrdersComponent },
            { path: '/details', component: customerDetails_component_1.CustomerDetailsComponent },
            { path: '/edit', component: customerEdit_component_1.CustomerEditComponent }
        ]), 
        __metadata('design:paramtypes', [router_1.Router])
    ], CustomerComponent);
    return CustomerComponent;
}());
exports.CustomerComponent = CustomerComponent;
var CustomerDisplayModeEnum;
(function (CustomerDisplayModeEnum) {
    CustomerDisplayModeEnum[CustomerDisplayModeEnum["Details"] = 0] = "Details";
    CustomerDisplayModeEnum[CustomerDisplayModeEnum["Orders"] = 1] = "Orders";
    CustomerDisplayModeEnum[CustomerDisplayModeEnum["Edit"] = 2] = "Edit";
})(CustomerDisplayModeEnum || (CustomerDisplayModeEnum = {}));
//# sourceMappingURL=customer.component.js.map