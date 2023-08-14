import express  from "express"
import connectDB from "./db/connect_db.js"
import game_api_routes from "./routes/game_api_routes.js"
import http from 'http'
import {Server} from 'socket.io'
import appSocket from "./app_sockets/app_socket_con.js"
import cors from 'cors'
const app = express()
const port = process.env.port || 3000
const DATABASE_URL = "mongodb+srv://dheerajgautam:2tEMpNg5Hdpb1qvt@cluster0.jf0lua3.mongodb.net/?retryWrites=true&w=majority"
// const DATABASE_URL =   "mongodb://115.240.127.98/32" // "mongodb://localhost:27017"


app.use(express.json())

// * << socket 
const server = http.createServer(app)
const io = new Server(server)
appSocket(io)
// *  >>


app.use(cors({
    origin: "*",
    credentials: true
}));

// Database connection
connectDB(DATABASE_URL)


app.use(express.urlencoded({extended:false}))


app.use('/api', game_api_routes)
app.get('/', (req, res)=>{
    res.send("Tic Tac Toe")
})
server.listen(port, ()=> {
    console.log(`Server listening http://localhost:${port}`)


})