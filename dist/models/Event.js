"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.Event = void 0;
var typeorm_1 = require("typeorm");
var type_graphql_1 = require("type-graphql");
var User_1 = require("./User");
var Booking_1 = require("./Booking");
var Event = /** @class */ (function (_super) {
    __extends(Event, _super);
    function Event() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        type_graphql_1.Field(function () { return type_graphql_1.ID; }),
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Event.prototype, "id", void 0);
    __decorate([
        type_graphql_1.Field(),
        typeorm_1.Column({ unique: true }),
        __metadata("design:type", String)
    ], Event.prototype, "title", void 0);
    __decorate([
        type_graphql_1.Field(),
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Event.prototype, "description", void 0);
    __decorate([
        type_graphql_1.Field(function () { return type_graphql_1.Float; }),
        typeorm_1.Column({ type: 'float' }),
        __metadata("design:type", Number)
    ], Event.prototype, "price", void 0);
    __decorate([
        type_graphql_1.Field(),
        typeorm_1.Column(),
        __metadata("design:type", Date)
    ], Event.prototype, "date", void 0);
    __decorate([
        type_graphql_1.Field(function () { return User_1.User; }),
        typeorm_1.ManyToOne(function () { return User_1.User; }, function (user) { return user.createdEvents; }, { onDelete: 'CASCADE' }),
        __metadata("design:type", User_1.User)
    ], Event.prototype, "creator", void 0);
    __decorate([
        type_graphql_1.Field(function () { return [Booking_1.Booking]; }),
        typeorm_1.OneToMany(function () { return Booking_1.Booking; }, function (booking) { return booking.event; }),
        __metadata("design:type", Array)
    ], Event.prototype, "bookings", void 0);
    Event = __decorate([
        typeorm_1.Entity(),
        type_graphql_1.ObjectType()
    ], Event);
    return Event;
}(typeorm_1.BaseEntity));
exports.Event = Event;
