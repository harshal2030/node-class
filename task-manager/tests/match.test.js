const {calTip, fahrenheitToCelsius, celsiusToFahrenheit, add} = require('../src/math')

test('Should calculate total with tip', () => {
    const total = calTip(10, 0.3)
    expect(total).toBe(13)

    // if (total !== 13) {
    //     throw new Error('Total tip should be 13. Got' + total)
    // } 
})

test('Should calculate total with default tip', () => {
    const total = calTip(10)
    expect(total).toBe(12.5)
})

test('should convert 32 faren to 0 celc', () => {
    const ans = fahrenheitToCelsius(32);
    expect(ans).toBe(0)
})

test('should convert 0 celc to 32 faren', () => {
    const ans = celsiusToFahrenheit(0);
    expect(ans).toBe(32)
})

// test('testing async', (done) => {
//     setTimeout(() => {
//         expect(1).toBe(2)
//         done()
//     }, 2000)
// })

test('Should add two numbers', (done) => {
    add(2, 3).then((sum) => {
        expect(sum).toBe(5)
        done()
    })
})

test('should add two numbers async/await', async () => {
    const sum = await add(10, 22)
    expect(sum).toBe(32)
})