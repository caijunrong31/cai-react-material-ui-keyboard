"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.alphaNumericKeyboard = [
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'Backspace'],
    ['Escape', 'CapsLock', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'Enter']
];
exports.extendedKeyboard = [
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'Backspace'],
    ['CapsLock', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '-', 'CapsLock'],
    ['Escape', '@', '#', '     ', '.', 'Enter']
];
exports.numericKeyboard = [
    ['Escape', '-', 'Backspace'],
    ['7', '8', '9'],
    ['4', '5', '6'],
    ['1', '2', '3'],
    ['0', '.', 'Enter']
];
function kyeboardCapsLockLayout(layout, caps) {
    return layout.map(function (row) {
        return row.map(function (key) {
            return (key.length === 1) ? (caps ? key.toUpperCase() : key.toLowerCase()) : key;
        });
    });
}
exports.kyeboardCapsLockLayout = kyeboardCapsLockLayout;
