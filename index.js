const express = require('express');
const config = require('./src/config')
const app = express();
const mongoose = require('mongoose')
const morgan = require('morgan');
const bodyParser = require('body-parser');
const products = require('./routes/product');
const orders = require('./routes/orders');

const env = config.get('env');
console.log('Env: ', config.get('env'))
if (env === 'development') {
    app.use(morgan('dev'));
}

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// TO HANDLE CORS ERRORS
app.use((req,res, next) => {
    res.header("Access-Control-Allow-Origin", "*"),
    res.header(
          'Access-Control-Allow-Headers', 
        'X-Requested-with, Content-Type, Accept, Authorization')
        if(req.methods === 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, DELETE, PATCH, GET')
                returnres.status(200).json({})
            };
            next(   );
}); 

app.use('/api/orders', orders);
app.use('/api/products', products);

app.use((req, res, next)=>{ 
    const error = new Error(' Not found')
    error.status= 404;
    next(error)
    });
    app.use((error, req, res, next)=>{
        res.status(error.status || 500);
        res.json({
            error: {
                message: error.message
            }
        })
    });

    //const url = process.env.MONGO_CONNECT
    const url = config.get('mongo_connect')

    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log("Conntected to mongodb"))
        .catch(err => console.error('Error connecting to mongo db'))

 const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`Listening on port ${port}..`))

module.exports = app