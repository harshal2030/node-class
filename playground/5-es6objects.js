const name = 'Andrew';
const userAge = 27;

const user = {
    name,
    age: userAge,
    location: 'Philadephia'
}

console.log(user);

//object destructuring

const product = {
    label: 'Red notebook',
    price: 3,
    stock: 201,
    salePrice: undefined
}

const {label, stock} = product;
console.log(label)
console.log(stock)