exports.isPositiveInt = n => {
    let isInt = Number.isInteger(n);
    let isPositive = n > 0 ? true : false;
    return isInt && isPositive ? true : false;
};

