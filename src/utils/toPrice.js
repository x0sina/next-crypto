const toFixed = (num) => {
    if (Math.abs(num) < 1.0) {
        let e = parseInt(num.toString().split('e-')[1]);
        if (e) {
            num *= Math.pow(10, e - 1);
            num = '0.' + (new Array(e)).join('0') + num.toString().substring(2);
        }
    } else {
        let e = parseInt(num.toString().split('+')[1]);
        if (e > 20) {
            e -= 20;
            num /= Math.pow(10, e);
            num += (new Array(e + 1)).join('0');
        }
    }
    return num;
}

const fixPrice = (num, len) => {
    return num.toFixed(len).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}
const threeDots = (num) => {
    const stringNum = toFixed(num)
    const index = stringNum.search(/[1-9]/);
    const last4Digits = String(stringNum).slice(index, index + 5)
    return '0.0...' + last4Digits
}

const toPrice = (price) => {
    if (price >= 1) {
        return fixPrice(price, 2)
    }
    else if (price < 1 && price >= 0.98) {
        return fixPrice(price, 3)
    }
    else if (price < 0.98 && price >= 0.01) {
        return fixPrice(price, 4)
    }
    else if (price < 0.01 && price >= 0.001) {
        return fixPrice(price, 6)
    }
    else if (price < 0.001 && price >= 0.0001) {
        return fixPrice(price, 7)
    }
    else if (price < 0.0001 && price >= 0.000001) {
        return fixPrice(price, 8)
    }
    else if (price < 0.000001 && price >= 0.00000001) {
        return fixPrice(price, 11)
    }
    else return threeDots(price)
}

export default toPrice