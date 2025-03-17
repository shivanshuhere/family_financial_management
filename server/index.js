import app from "./app.js"
import dbConnect from "./db/index.js"
const PORT = 5000;

dbConnect().then(()=>{   
    app.listen(PORT,()=>{
        console.log("Server is listening on the port "+ PORT);
    })
}
).catch((error)=>{
    console.log("Failed to start sever ::  ", error);

})