import express from 'express'


const app = express.Router();


app.get('/',(req,res)=>{
    console.log('connected!!')
})


export default app;