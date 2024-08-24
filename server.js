const express = require('express');
const app = express();
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const path = require('path');
const {logger} = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const PORT = process.env.PORT || 3500;

//custom middleware
app.use (logger);

//Cross Origin Resource Sharing
app.use(cors(corsOptions));

//built-in middleware for handling urlencoded data (form data)
app.use(express.urlencoded({ extended : false }));

//built in middleware for json

app.use(express.json());

//tells server where to look for static files
//express.static is a middleware for static files
app.use('/',express.static(path.join (__dirname, 'public')));

//Route Handlers
app.use('/', require('./routes/root'));
 app.use('/api/employees', require('./routes/api/employees'));

//app.use('/')
app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'))
    }else if (req.accepts('json')) { 
        res.json({ error: "404 Not Found"})
    }else
    { 
        res.type('txt').send("404 Not Found")
    }
});

    app.use(errorHandler);
        
app.listen(PORT, () => console.log(`Running on port ${PORT}`));