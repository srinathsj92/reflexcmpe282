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
var data_service_1 = require('../shared/services/data.service');
var capitalize_pipe_1 = require('../shared/pipes/capitalize.pipe');
var CustomerDetailsComponent = (function () {
    function CustomerDetailsComponent(router, dataService) {
        this.router = router;
        this.dataService = dataService;
    }
    CustomerDetailsComponent.prototype.routerOnActivate = function (current, prev, currTree, prevTree) {
        var _this = this;
        var id = +currTree.parent(current).getParam('id');
        console.log("Getting data for user with ID = ", id);
        this.dataService.getCustomer(id)
            .subscribe(function (customer) { return _this.customer = customer; });
    };
    CustomerDetailsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'customer-details',
            templateUrl: 'customerDetails.component.html',
            directives: [router_1.ROUTER_DIRECTIVES],
            pipes: [capitalize_pipe_1.CapitalizePipe]
        }), 
        __metadata('design:paramtypes', [router_1.Router, data_service_1.DataService])
    ], CustomerDetailsComponent);
    return CustomerDetailsComponent;
}());
exports.CustomerDetailsComponent = CustomerDetailsComponent;
//# sourceMappingURL=customerDetails.component.js.map