import express from 'express'


const app = express()


app.get('/',(req,res)=>{
    console.log('connected!!')
})


export default app;