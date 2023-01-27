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

export const fixPrice = (num, len) => {
    if (!len || len === 0) return Math.round(num).toLocaleString('en-US');
    return num.toFixed(len).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}
const threeDots = (num) => {
    const stringNum = toFixed(num)
    const index = stringNum.search(/[1-9]/);
    const last4Digits = String(stringNum).slice(index, index + 5)
    return '0.0...' + last4Digits
}

export const toPrice = (price) => {
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

export const isWhatPercentOf = (x, y) => {
    return (x / y) * 100
}

export const formatCash = n => {
    if (n < 1e3) return n;
    if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(2) + "K";
    if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(2) + "M";
    if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(2) + "B";
    if (n >= 1e12) return +(n / 1e12).toFixed(2) + "T";
};

export const capitalizateFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

export const formatAMPM = (time) => {
    const date = new Date(Number(time) * 1000);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    const strTime = hours + ':' + minutes + ':00' + ' ' + ampm;
    return strTime;
}

export const getAverageRGB = (imgEl) => {

    let blockSize = 5, // only visit every 5 pixels
        defaultRGB = { r: 0, g: 0, b: 0 }, // for non-supporting envs
        canvas = document.createElement('canvas'),
        context = canvas.getContext && canvas.getContext('2d'),
        data, width, height,
        i = -4,
        length,
        rgb = { r: 0, g: 0, b: 0 },
        count = 0;

    if (!context) {
        return defaultRGB;
    }

    height = canvas.height = imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
    width = canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;

    context.drawImage(imgEl, 0, 0);

    try {
        data = context.getImageData(0, 0, width, height);
    } catch (e) {
        /* security error, img on diff domain */alert('x');
        return defaultRGB;
    }

    length = data.data.length;

    while ((i += blockSize * 4) < length) {
        ++count;
        rgb.r += data.data[i];
        rgb.g += data.data[i + 1];
        rgb.b += data.data[i + 2];
    }

    // ~~ used to floor values
    rgb.r = ~~(rgb.r / count);
    rgb.g = ~~(rgb.g / count);
    rgb.b = ~~(rgb.b / count);

    return rgb;

}

export const getDate = (time) => {
    const date = new Date(Number(time) * 1000)
    return `${date.getMonth() + 1}/${date.getDay()}/${date.getFullYear()}`
}