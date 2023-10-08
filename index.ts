import express from 'express'
import dataSource from './dataBase/dataSource.js';
import register from './routes/register.js'
import login from './routes/login.js'
import rmUser from './routes/rmUser.js'
const app = express();

app.use(express.json());

app.use('/user',register);
app.use('/user',login);
app.use('/user',rmUser);

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`hello from PORT ${PORT}`);
    dataSource.initializeDB()
})
