let generateNumber = function (quantity: number, maxValue: number): number {
    let phoneNumber: number[] = [0];

    for (let i = 0; i < quantity; i++) {
        phoneNumber.push(Math.floor(Math.random() * maxValue));
    }

    return parseInt(phoneNumber.join(""))
}

export {generateNumber};