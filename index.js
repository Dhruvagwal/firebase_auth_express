const bodyParser = require('body-parser')
const express =  require('express');

const app =  express();
app.use(bodyParser.json())

app.use(require('./src/routes/authRoutes'))


app.listen(3000, ()=>{
    console.log('Listening on port 3000')
})