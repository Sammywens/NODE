
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path') 
const http = require('http');



const logEvents = require('../middleware/logEvents');
const EventEmitter = require('events');
class Emmiter extends EventEmitter {};

//initialize object

const myEmmiter = new Emmiter();
myEmmiter.on('log', (msg, fileName) => logEvents(msg, fileName));


//add listener for log events

myEmmiter.on('log', (msg) => logEvents(msg));

setTimeout(() => {

    myEmmiter.emit('log', 'log event Emmited');

}, 2000);



const PORT = process.env.PORT || 3500;

const serveFile = async (filePath, contentType, response) => {
    try {
        const rawData = await  fsPromises.readFile(
            filePath,
             'utf8');
            !contentType.includes('image' ? 'utf8' : '') ;
        const data = contentType === 'application/json'
        ? JSON.parse(rawData) : rawData;
        response.writeHead(200, { 'Content-Type': contentType });
        response.end(data);
    } catch (err) {
        console.log(err); 
        myEmmiter.emit('log', `${err.name}: ${err.message}`, 'errLog.txt');
        response.statusCode = 500;
        response.end();
    }


//Creates the server
const server = http.createServer((req, res) => {
    console.log(req.url, req.method);
    myEmmiter.emit('log', `${req.url}\t${req.method}`, 'reqLog.txt');

}); 


const extension = path.extname(req.url);

//let contentType;

switch (extension) {    
    case 'css':
        contentType = 'text/css';
        break;
    case 'js':
        contentType = 'text/javascript';
        break;
    case 'png':
        contentType = 'image/png';
        break;
    case 'jpg':
        contentType = 'image/jpg';
        break;
    case 'html':
        contentType = 'text/html';
        break;
    case 'txt':
        contentType = 'text/plain';
        break;
    case 'json':
        contentType = 'application/json';
        break;
    default:
        contentType = 'text/plain';
}

server.listen(PORT, () => console.log(`Running on port ${PORT}`));

    let filepath = 
    contentType === 'text/html'  && require.url === '/'
    ? path.join(__dirname, 'views', 'index.html')
    : contentType === 'text/html' && req.url.slice(-1) === '/'
        ? path.join(__dirname, 'views', req.url, 'index.html')
        : contentType === 'text/html'
            ? path.join(__dirname, 'views', req.url)
            : path.join(__dirname,  req.url);

//makes the .html extension not required in the browser
if (!extension && req.url.slice(-1) !== '/') {
    filepath += '.html';
};

const fileExists = fs.existsSync(filepath);

if (fileExists) {
    serveFile(filepath, contentType, res);

} else {
    switch(path.parse(filepath).base) {
        case 'old-page.html':
            res.writeHead(301, { 'Location': '/new-page.html' });
            res.end();
            break;
        case 'www-page.html':    
            res.writeHead(301, { 'Location': '/' });
            res.end();
            break;
         default:
            serveFile(path.join(__dirname, 'views', '404.html'), 'txt/html' , res)
 
            }
    }

}
//server.listen(PORT, () => console.log(`Running on port ${PORT}`));