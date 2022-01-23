const express =require('express')
const app = express()
const port = 3000
require('./db/mongoose')
app.use(express.json())


const reportrouter = require('./routers/reporter_router')
app.use(reportrouter)

const newsnrouter = require('./routers/news')
app.use(newsnrouter)


app.listen(port,()=>{console.log('listining on port 3000')})