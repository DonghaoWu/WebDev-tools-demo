export { };

const func1 = (a: number, b: number) => {
    return a + b;
}

// console.log(func1(1, 2));

// boolean
let isCool: boolean = true;

// string
let color: string = 'black';

// array
let pets: string[] = ['cat', 'dog', 'pig'];
let foods: Array<string> = ['apple', 'bread', 'noodle'];

// object
let wizard: object = {
    a: 'John'
}

// undefined & null
let med: undefined = undefined;
let noo: null = null;

// tuple
let basket: [string, string];
basket = ['pet', 'food'];

// enum
enum size { Small = 1, Medium = 2, Large = 3 };
let sizeName: string = size[2];
let sizeNum: number = size.Small;

// any
let whatever: any = 'ahhhh';
whatever = 5;

// function without return & end point: never
const error = (): never => {
    throw Error('oooops!');
}

// function only without return
const sing = (): void => {
    console.log('ha');
}

// interface
interface RobotArmy {
    count: number,
    type: string,
    magic: string
}

let fightRobotArmy1 = (robots: RobotArmy) => {
    console.log('Robot1');
}

let fightRobotArmy2 = (robots: { count: number, type: string, magic: string }) => {
    console.log('Robot2');
}

// type
type CatArmy = {
    count: number,
    type: string,
    magic: string
}

let fightCatArmy1 = (robots: CatArmy) => {
    console.log('Cat1');
}

let fightCatArmy2 = (robots: { count: number, type: string, magic: string }) => {
    console.log('Cat2');
}

// omit if statement
type DogArmy = {
    count: number,
    type: string,
    magic?: string
}

// function
const func2 = (): number => {
    return 5;
}

// class
class Animal {
    private sing: string = 'lalala';
    constructor(sound: string) {
        this.sing = sound;
    }
    greet() {
        return `Hello ${this.sing}`;
    }
}

let lion = new Animal('Rawwwwww');
console.log(lion.greet());

// Union
let confused: string | number | boolean = true;

// 默认模式，相当于 const 的作用。
let x = 4;
// x = 'hello' 