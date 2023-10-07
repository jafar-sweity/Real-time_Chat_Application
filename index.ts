import express from 'express'
import dataSource from './dataBase/dataSource.js';
import register from './routes/register.js'
import login from './routes/login.js'
const app = express();

app.use(express.json());

app.use('/user',register);
app.use('/user',login);

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`hello from PORT ${PORT}`);
    dataSource.initializeDB()
})
