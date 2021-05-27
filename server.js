require('./models/User')
const express = require('express')
const mongoose = require('mongoose')
const authRoutes = require('./routes.js/authRoutes')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())

app.use(authRoutes)

const mongoUri = 'mongodb+srv://Admin:kundi@1998@cluster0.5uxtl.mongodb.net/deepalert?retryWrites=true&w=majority'

const dummyValues ={
    "ips": {
    "eth0": "192.168.101.171/24",
    "wlan0": "192.168.42.1/24",
    "br-de82f751fff9": "172.18.0.1/16",
    "tun2": "10.53.0.6/32"
    },
    "vpn_connected": false,
    "messaging_ok": true,
    "hub_name": "TSTAAAA"
   }
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
mongoose.connection.on('connected',()=>{
    console.log('connected to mongo instance')
})

mongoose.connection.on('error', (err)=>{
    console.error('Error connecting to mongo', err)
} )

app.get('/hub_info',(req,res)=>{
    res.send(dummyValues)
})

app.listen(4000,()=>{
    console.log('server running on port 4000')
})