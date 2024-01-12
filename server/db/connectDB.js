import mongoose from "mongoose";

 const connectDB = async () => {
    try {
      
        const connect = await mongoose.connect("mongodb+srv://Muhammedsouban:souban10374@cluster0.it4k2gj.mongodb.net/talkflow?retryWrites=true&w=majority", { 
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex:true
               
        })
        console.log(`monogoDB Connected: ${connect.connection.host}`)  
    } catch (error) {
        console.error(`Error ${error.message}`)
        process.exit(1)
        
    }
}
export default connectDB