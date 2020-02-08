const fs = require('fs');
const dataBuffer = fs.readFileSync('1-json.json');
const dataJson = dataBuffer.toString();
const data = JSON.parse(dataJson);

data.name = 'harshal';
data.age=17

console.log(data);

dataToWrite = JSON.stringify(data);
fs.writeFileSync('1-json.json', dataToWrite);