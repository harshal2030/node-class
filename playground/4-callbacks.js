// setTimeout(() => {
//     console.log('Two seconds passed');
// }, 2000);

// const name = ['harshal', 'kav', 'jess'];
// const shortName = name.filter((names) => {
//     return names.length <= 4;
// })

// const geoCode = (address, callback) => {
//     setTimeout(() => {
//         const data = {
//             latitiude: 0,
//             longitude: 0,
//         }
    
//         callback(data)
//     }, 2000)
// }

// geoCode('nimach', (data) => {
//     console.log(data);
// });


// const add  = (a, b, callback) => {
//     setTimeout(() => {
//         sum = a + b;
//         callback(sum);
//     }, 2000)
// }

// add(1, 4, (sum) => {
//     console.log(sum);
// })
const doWorkCallback = (callback) => {
    setTimeout(() => {
        // callback('This is my error!', undefined);
        callback(undefined, [1, 4, 5])
    }, 2000)
}

doWorkCallback((error, result) => {
    if (error) {
        return console.log(error);
    }

    console.log(result)
})