import mongoose from 'mongoose'

const connectDB =async (DATABASEURL) =>{
    try{
        const DB_OPTIONS = {
            user:'dheerajgautam',
            pass: '2tEMpNg5Hdpb1qvt',
            dbName:'tictactoedb',
            // authSource:'tictactoedb'
            
        }
       await mongoose.connect(DATABASEURL, DB_OPTIONS)
        console.log("MongoDB Connected")
    }catch(e){
        console.log(e)

        
    }
   
}


export default connectDB