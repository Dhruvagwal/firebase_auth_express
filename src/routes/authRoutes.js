require('dotenv').config()

const express =  require('express');
const app =  express();
const jwt = require('jsonwebtoken');

const firebase = require('../../firebase')

app.post('/signup',async (req,res)=>{
    const {email, password} = req.body;
    try{
        const { user } = await firebase.addUser(email, password)
        const token = jwt.sign({userId: user.uid}, process.env.ACCESS_TOKEN_SECERT)
        res.send({token})
    }catch(err){
        res.status(401).send(err.message)
    }

})
app.post('/signin', async (req,res)=>{
    const {email, password} = req.body;
    try{
        if(!email || !password){
            return res.status(422).send({err:'Must provide email and password'})
        }
        const user = await firebase.authenticate(email, password)
        const token = jwt.sign({userId: user.uid}, process.env.ACCESS_TOKEN_SECERT)
        res.status(200).send({token})
    }catch(err){
        res.status(401).send(err.message)
    }

})

app.post('/verifyToken', (req, res) =>{
    const {authorization} = req.headers;
    if(!authorization) return res.status(401).send({err:"You must be Logged in."})
    const token = authorization.replace('Bearer ','')
    jwt.verify(token, process.env.ACCESS_TOKEN_SECERT,async (err, payload)=>{
        if(err){
            return res.status(401).send({err:"You must be Logged in."})
        }
        res.status(200).send("sucess")
    })
})

app.delete('/signout', async (req,res)=>{
    const {token} = req.body;
    try{
        if(!token){
            return res.status(422).send({err:'Please Log in'})
        }
        await firebase.signOut()
    }catch(err){
        res.status(401).send(err.message)
    }

})


module.exports = app
