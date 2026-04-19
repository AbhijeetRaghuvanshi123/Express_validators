import express from 'express';
import path from 'node:path'
import usersRouter from './routes/usersRouter.js';
import indexRouter from './routes/indexRouter.js';
import emailUserRouter from './routes/emailUserRouter.js';
import { fileURLToPath } from 'node:url';
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}));
app.use('/', indexRouter);
app.use('/', usersRouter);
app.use('/', emailUserRouter);


const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
    if(error){
        throw error;
    }
    console.log("Listening on Port: "+PORT);
})