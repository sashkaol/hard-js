/**
 * @param {number} x
 * @return {number}
 */
var reverse = function(x) {
    let reversedNumber = Math.abs(x).toString().split('').reverse().join('');

    reversedNumber = x >= 0 ? +reversedNumber : -reversedNumber;
    return reversedNumber <= -Math.pow(2, 31) || reversedNumber >= Math.pow(2, 31) -1
        ? 0 : reversedNumber;
};

console.log(reverse(-10)); // -1
console.log(reverse(0)); // 0
console.log(reverse(12345)); // 54321
console.log(reverse(-567)); // -765
console.log(reverse(4500)); // 54
