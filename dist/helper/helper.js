"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.groupArray = exports.hashPassword = exports.saltRounds = exports.reg = exports.generateNumber = void 0;
const dotenv = __importStar(require("dotenv"));
const bcrypt = __importStar(require("bcrypt"));
dotenv.config();
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
const hashPassword = async function (password) {
    try {
        // @ts-ignore
        let hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    }
    catch (error) {
        return new Error("Error hash password");
    }
};
exports.hashPassword = hashPassword;
const groupArray = function (arr, quantity) {
    let chunkedArray = {}, key = 1, length = arr.length, track = quantity;
    for (let i = 0; i < length; i += track) {
        if (i >= quantity)
            quantity += track;
        chunkedArray[key] = arr.slice(i, quantity);
        key++;
    }
    return chunkedArray;
};
exports.groupArray = groupArray;
