"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateNumber = void 0;
let generateNumber = function (quantity, maxValue) {
    let phoneNumber = [0];
    for (let i = 0; i < quantity; i++) {
        phoneNumber.push(Math.floor(Math.random() * maxValue));
    }
    return parseInt(phoneNumber.join(""));
};
exports.generateNumber = generateNumber;
