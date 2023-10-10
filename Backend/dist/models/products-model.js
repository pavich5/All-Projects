"use strict";
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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
exports.ProductModel = void 0;
var app_data_source_1 = require("../app.data-source");
var product_entity_1 = require("../entites/product.entity");
var customError_1 = require("../utils/customError");
var ProductModel = /** @class */ (function () {
    function ProductModel() {
    }
    ProductModel.getAllProducts = function () {
        return __awaiter(this, void 0, void 0, function () {
            var productsRepo, allProducts, productsCount;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        productsRepo = app_data_source_1.dataSource.getRepository(product_entity_1.ProductEntity);
                        return [4 /*yield*/, productsRepo.find({})];
                    case 1:
                        allProducts = _a.sent();
                        return [4 /*yield*/, productsRepo.createQueryBuilder().getCount()];
                    case 2:
                        productsCount = _a.sent();
                        return [2 /*return*/, { allProducts: allProducts, productsCount: productsCount }];
                }
            });
        });
    };
    ProductModel.findProductById = function (productId) {
        return __awaiter(this, void 0, void 0, function () {
            var productsRepo, foundProduct;
            return __generator(this, function (_a) {
                productsRepo = app_data_source_1.dataSource.getRepository(product_entity_1.ProductEntity);
                foundProduct = productsRepo.findOne({ where: { id: productId } });
                if (!foundProduct)
                    throw new customError_1.CustomError("Product not found", 404);
                return [2 /*return*/, foundProduct];
            });
        });
    };
    ProductModel.createProduct = function (productData) {
        return __awaiter(this, void 0, void 0, function () {
            var productsRepo, newProduct;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        productsRepo = app_data_source_1.dataSource.getRepository(product_entity_1.ProductEntity);
                        return [4 /*yield*/, productsRepo.insert(productData)];
                    case 1:
                        newProduct = _a.sent();
                        return [2 /*return*/, newProduct];
                }
            });
        });
    };
    ProductModel.updateProduct = function (productData, productId) {
        return __awaiter(this, void 0, void 0, function () {
            var productsRepo, foundUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        productsRepo = app_data_source_1.dataSource.getRepository(product_entity_1.ProductEntity);
                        return [4 /*yield*/, this.findProductById(Number(productId))];
                    case 1:
                        foundUser = _a.sent();
                        if (foundUser.id)
                            throw new customError_1.CustomError("ID cannot be changed", 400);
                        Object.assign(foundUser, productData);
                        productsRepo.save(foundUser);
                        return [2 /*return*/, foundUser];
                }
            });
        });
    };
    ProductModel.deleteProduct = function (productId) {
        return __awaiter(this, void 0, void 0, function () {
            var productsRepo, foundUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        productsRepo = app_data_source_1.dataSource.getRepository(product_entity_1.ProductEntity);
                        return [4 /*yield*/, this.findProductById(Number(productId))];
                    case 1:
                        foundUser = _a.sent();
                        return [4 /*yield*/, productsRepo.remove(foundUser)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return ProductModel;
}());
exports.ProductModel = ProductModel;
