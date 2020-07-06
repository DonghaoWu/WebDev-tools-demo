"use strict";
exports.__esModule = true;
var func1 = function (a, b) {
    return a + b;
};
// console.log(func1(1, 2));
// boolean
var isCool = true;
// string
var color = 'black';
// array
var pets = ['cat', 'dog', 'pig'];
var foods = ['apple', 'bread', 'noodle'];
// object
var wizard = {
    a: 'John'
};
// undefined & null
var med = undefined;
var noo = null;
// tuple
var basket;
basket = ['pet', 'food'];
// enum
var size;
(function (size) {
    size[size["Small"] = 1] = "Small";
    size[size["Medium"] = 2] = "Medium";
    size[size["Large"] = 3] = "Large";
})(size || (size = {}));
;
var sizeName = size[2];
var sizeNum = size.Small;
// any
var whatever = 'ahhhh';
whatever = 5;
// function without return & end point: never
var error = function () {
    throw Error('oooops!');
};
// function only without return
var sing = function () {
    console.log('ha');
};
var fightRobotArmy1 = function (robots) {
    console.log('Robot1');
};
var fightRobotArmy2 = function (robots) {
    console.log('Robot2');
};
var fightCatArmy1 = function (robots) {
    console.log('Cat1');
};
var fightCatArmy2 = function (robots) {
    console.log('Cat2');
};
// function
var func2 = function () {
    return 5;
};
// class
var Animal = /** @class */ (function () {
    function Animal(sound) {
        this.sing = 'lalala';
        this.sing = sound;
    }
    Animal.prototype.greet = function () {
        return "Hello " + this.sing;
    };
    return Animal;
}());
var lion = new Animal('Rawwwwww');
console.log(lion.greet());
// Union
var confused = true;
// 默认模式，相当于 const 的作用。
var x = 4;
// x = 'hello' 
