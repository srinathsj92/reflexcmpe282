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
var DotSlice = (function () {
    function DotSlice() {
    }
    DotSlice.prototype.transform = function (value, args) {
        var start = parseInt(args[0]);
        var end = parseInt(args[1]);
        //TODO: Improve by adding args check
        //if(value && args[0] && args[1]) {
        if (value.length > end) {
            return [value.substring(start, end), "..."].join('');
        }
        //}
        return value;
    };
    DotSlice = __decorate([
        core_1.Pipe({
            name: 'dotSlice'
        }), 
        __metadata('design:paramtypes', [])
    ], DotSlice);
    return DotSlice;
}());
exports.DotSlice = DotSlice;
//# sourceMappingURL=dotSlicer.js.map