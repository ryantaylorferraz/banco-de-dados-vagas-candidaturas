import { app } from "./app";

const port = process.env.Port || 3000;
app.listen(port, () => {
    console.log("API SUCESSO");
    
})