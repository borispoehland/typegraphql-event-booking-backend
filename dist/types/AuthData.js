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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthData = void 0;
var type_graphql_1 = require("type-graphql");
/* eslint-disable @typescript-eslint/explicit-function-return-type */
var AuthData = /** @class */ (function () {
    function AuthData() {
    }
    __decorate([
        type_graphql_1.Field(function () { return type_graphql_1.ID; }),
        __metadata("design:type", String)
    ], AuthData.prototype, "userId", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", String)
    ], AuthData.prototype, "token", void 0);
    __decorate([
        type_graphql_1.Field(function () { return type_graphql_1.Int; }),
        __metadata("design:type", Number)
    ], AuthData.prototype, "tokenExpiration", void 0);
    AuthData = __decorate([
        type_graphql_1.ObjectType()
    ], AuthData);
    return AuthData;
}());
exports.AuthData = AuthData;
/* eslint-enable @typescript-eslint/explicit-function-return-type */
