"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
exports.__esModule = true;
var express = require("express");
var client_1 = require("@prisma/client");
var convert_hour_string_to_minutes_1 = require("./utils/convert-hour-string-to-minutes");
var app = express();
app.use(express.json());
var prisma = new client_1.PrismaClient({
    log: ['query']
});
// HTTP methods / API RESTful / HTTP Codes
// GET, POST, PUT, PATCH, DELETE
// Query: localhost:3333/ads?page=2&sort=title
// Route: localhost:3333/post/criar-api-em-node
// Body: localhost:3333/
app.get('/games', function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var games;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.game.findMany({
                    include: {
                        _count: {
                            select: {
                                ads: true
                            }
                        }
                    }
                })];
            case 1:
                games = _a.sent();
                return [2 /*return*/, response.json(games)];
        }
    });
}); });
app.post('/games/:id/ads', function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var gameId, body, ad;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                gameId = request.params.id;
                body = request.body;
                return [4 /*yield*/, prisma.ad.create({
                        data: {
                            gameId: gameId,
                            name: body.name,
                            yearsPlaying: body.yearsPlaying,
                            discord: body.discord,
                            weekDays: body.weekDays.join(','),
                            hourStart: (0, convert_hour_string_to_minutes_1.convertHourStringToMinutes)(body.hourStart),
                            hourEnd: (0, convert_hour_string_to_minutes_1.convertHourStringToMinutes)(body.hourEnd),
                            useVoiceChannel: body.useVoiceChannel
                        }
                    })];
            case 1:
                ad = _a.sent();
                return [2 /*return*/, response.status(201).json(ad)];
        }
    });
}); });
app.get('/games/:id/ads', function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var gameId, ads;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                gameId = request.params.id;
                return [4 /*yield*/, prisma.ad.findMany({
                        select: {
                            id: true,
                            name: true,
                            weekDays: true,
                            useVoiceChannel: true,
                            yearsPlaying: true,
                            hourStart: true,
                            hourEnd: true
                        },
                        where: {
                            gameId: gameId
                        },
                        orderBy: {
                            CreatedAt: 'desc'
                        }
                    })];
            case 1:
                ads = _a.sent();
                return [2 /*return*/, response.json(ads.map(function (ad) {
                        return __assign(__assign({}, ad), { weekDays: ad.weekDays.split(',') });
                    }))];
        }
    });
}); });
app.get('/ads/:id/discord', function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var adId, ad;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                adId = request.params.id;
                return [4 /*yield*/, prisma.ad.findUniqueOrThrow({
                        select: {
                            discord: true
                        },
                        where: {
                            id: adId
                        }
                    })];
            case 1:
                ad = _a.sent();
                return [2 /*return*/, response.json({
                        discord: ad.discord
                    })];
        }
    });
}); });
app.listen(3333);
