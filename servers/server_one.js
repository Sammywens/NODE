
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path') 
const http = require('http');


const fileOps = async () => {
    try {
        const data = await fsPromises.readFile(path.join(__dirname, 'files', 'starter.txt'), 'utf8');
        console.log(data);
        await fsPromises.writeFile(path.join(__dirname, 'files', 'promiseWrite.txt'), data);
        await fsPromises.appendFile(path.join(__dirname, 'files', 'promiseWrite.txt'), '/n/nNice to meet you');
        await fsPromises.rename(path.join(__dirname, 'files', 'promiseWrite.txt'), path.join(__dirname, 'files', 'promiseComplete.txt'));
    const newData = await fsPromises.readFile(path.join(__dirname, 'files', 'promiseComplete.txt', 'utf8'));
console.log(newData);

}catch (err) {
    console.log(err);
}; 
};


const { format } = require('date-fns');
const { v4: uuid} = require('uuid');

console.log(format(new Date(), 'yyyy-MM-dd\tHH:mm:ss'));

console.log(uuid())


const logEvents = require('../logEvents');

const EventEmitter = require('events');

class MyEmmmiter extends EventEmitter {};

//initialize object

const myEmmiter = new MyEmmmiter();

//add listener for log events

myEmmiter.on('log', (msg) => logEvents(msg));

setTimeout(() => {

    myEmmiter.emit('log', 'log event Emmited');

}, 2000);



const PORT = process.env.PORT || 3500;

const server = http.createServer((req, res) => {
    console.log(req.url, req.method);
}); 


server.listen(PORT, () => console.log(`Running on port ${PORT}`));