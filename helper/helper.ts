import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();

const reg = new RegExp(/^(?=.*[?@#$%&])(?=.*[A-Z])(?=.*\d).{8,16}/);
const saltRounds = parseInt(process.env.SALT_ROUNDS || "10");

const generateNumber = function (quantity: number, maxValue: number): number {
    let phoneNumber: number[] = [0];

    for (let i = 0; i < quantity; i++) {
        phoneNumber.push(Math.ceil(Math.random() * maxValue));
    }

    return parseInt(phoneNumber.join(""));
};

const hashPassword = async function (password: String) {
    try {
        // @ts-ignore
        let hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        return new Error("Error hash password");
    }
};

const groupArray = function (arr: object[], quantity: number): object {
    let chunkedArray: { [key: number]: object[] } = {}, length = arr.length, key = 1;

    for (let i = 0; i < length; i += quantity) {
        if (i + quantity >= length) quantity = length;
        chunkedArray[key] = arr.slice(i, quantity)
        key++;
    }

    return chunkedArray;
}

export {generateNumber, reg, saltRounds, hashPassword, groupArray};
