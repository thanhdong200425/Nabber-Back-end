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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPassword = exports.saltRounds = exports.reg = exports.generateNumber = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const bcrypt_1 = __importDefault(require("bcrypt"));
dotenv_1.default.config();
const reg = new RegExp(/^(?=.*[?@#$%&])(?=.*[A-Z])(?=.*\d).{8,16}/);
exports.reg = reg;
const saltRounds = parseInt(process.env.SALT_ROUNDS || "10");
exports.saltRounds = saltRounds;
const generateNumber = function (quantity, maxValue) {
    let phoneNumber = [0];
    for (let i = 0; i < quantity; i++) {
        phoneNumber.push(Math.ceil(Math.random() * maxValue));
    }
    return parseInt(phoneNumber.join(""));
};
exports.generateNumber = generateNumber;
const hashPassword = function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // @ts-ignore
            let hashedPassword = yield bcrypt_1.default.hash(password, saltRounds);
            return hashedPassword;
        }
        catch (error) {
            return new Error("Error hash password");
        }
    });
};
exports.hashPassword = hashPassword;
