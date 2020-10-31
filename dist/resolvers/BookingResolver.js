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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingResolver = void 0;
var type_graphql_1 = require("type-graphql");
var Event_1 = require("../models/Event");
var User_1 = require("../models/User");
var Booking_1 = require("../models/Booking");
/* eslint-disable @typescript-eslint/explicit-function-return-type, @typescript-eslint/explicit-module-boundary-types */
var BookingResolver = /** @class */ (function () {
    function BookingResolver() {
    }
    BookingResolver.prototype.bookersOf = function (eventId) {
        return __awaiter(this, void 0, void 0, function () {
            var event, bookings;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Event_1.Event.findOne({ where: { id: eventId }, relations: ['bookings'] })];
                    case 1:
                        event = _a.sent();
                        if (!event)
                            throw new Error('Event does not exist!');
                        return [4 /*yield*/, Booking_1.Booking.find({ where: { event: event }, relations: ['user'] })];
                    case 2:
                        bookings = _a.sent();
                        return [2 /*return*/, bookings.map(function (booking) { return booking.user; })];
                }
            });
        });
    };
    BookingResolver.prototype.bookingsOf = function (ctx, userId) {
        return __awaiter(this, void 0, void 0, function () {
            var id, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = userId || ctx.userId;
                        return [4 /*yield*/, User_1.User.findOne({ where: { id: id }, relations: ['bookings'] })];
                    case 1:
                        user = _a.sent();
                        if (!user)
                            throw new Error('User does not exist!');
                        return [2 /*return*/, Booking_1.Booking.find({ where: { user: user }, relations: ['event'] })];
                }
            });
        });
    };
    BookingResolver.prototype.createBooking = function (eventId, ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var event, userId, user, booking;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Event_1.Event.findOne({ where: { id: eventId } })];
                    case 1:
                        event = _a.sent();
                        if (!event)
                            throw new Error('Event does not exist!');
                        userId = ctx.userId;
                        return [4 /*yield*/, User_1.User.findOne({ where: { id: userId }, relations: ['bookings', 'bookings.event'] })];
                    case 2:
                        user = _a.sent();
                        if (!user)
                            throw new Error('User does not exist!');
                        if (user.bookings.filter(function (booking) { return booking.event.id === eventId; }).length) {
                            throw new Error('You already booked this event!');
                        }
                        return [4 /*yield*/, Booking_1.Booking.create({ user: user, event: event })];
                    case 3:
                        booking = _a.sent();
                        return [4 /*yield*/, booking.save()];
                    case 4:
                        _a.sent();
                        return [2 /*return*/, booking];
                }
            });
        });
    };
    BookingResolver.prototype.cancelBooking = function (bookingId) {
        return __awaiter(this, void 0, void 0, function () {
            var booking, event;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Booking_1.Booking.findOne({ where: { id: bookingId }, relations: ['event'] })];
                    case 1:
                        booking = _a.sent();
                        if (!booking)
                            throw new Error('The booking does not exist!');
                        event = booking.event;
                        return [4 /*yield*/, Booking_1.Booking.remove(booking)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, event];
                }
            });
        });
    };
    __decorate([
        type_graphql_1.Authorized(),
        type_graphql_1.Query(function () { return [User_1.User]; }),
        __param(0, type_graphql_1.Arg('eventId', function () { return type_graphql_1.ID; })),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], BookingResolver.prototype, "bookersOf", null);
    __decorate([
        type_graphql_1.Authorized(),
        type_graphql_1.Query(function () { return [Booking_1.Booking]; }),
        __param(0, type_graphql_1.Ctx()), __param(1, type_graphql_1.Arg('userId', function () { return type_graphql_1.ID; }, { nullable: true })),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, String]),
        __metadata("design:returntype", Promise)
    ], BookingResolver.prototype, "bookingsOf", null);
    __decorate([
        type_graphql_1.Authorized(),
        type_graphql_1.Mutation(function () { return Booking_1.Booking; }),
        __param(0, type_graphql_1.Arg('eventId', function () { return type_graphql_1.ID; })), __param(1, type_graphql_1.Ctx()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, Object]),
        __metadata("design:returntype", Promise)
    ], BookingResolver.prototype, "createBooking", null);
    __decorate([
        type_graphql_1.Authorized(),
        type_graphql_1.Mutation(function () { return Event_1.Event; }),
        __param(0, type_graphql_1.Arg('bookingId', function () { return type_graphql_1.ID; })),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], BookingResolver.prototype, "cancelBooking", null);
    BookingResolver = __decorate([
        type_graphql_1.Resolver()
    ], BookingResolver);
    return BookingResolver;
}());
exports.BookingResolver = BookingResolver;
/* eslint-enable @typescript-eslint/explicit-function-return-type, @typescript-eslint/explicit-module-boundary-types */
