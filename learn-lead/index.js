// import express from 'express';
import express from 'express';
import pgrouter from './routes/postgres.js';
import seqRouter from './routes/sequalize.js'
// const pgrouter = require('./routes/postgres.js');
// const seqRouter = require('./routes/sequalize.js');

import dotenv from 'dotenv';
dotenv.config();
console.log('debug');
import bodyParser from 'body-parser';
const app = express();
// const port = 3000;

app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));
// app.use('/seq', sequelize);
// console.log('welcome nepal')
app.get('/', (req, res)=> {
    res.send(('Hello world'));
})

app.use('/api', pgrouter);
app.use('/seq', seqRouter);


app.listen(process.env.PORT, ()=> {
    console.log(`server is listening on port ${process.env.PORT}`);
})
