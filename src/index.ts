import 'dotenv/config';
import * as path from 'path';
import express, {Request, Response} from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';

import { corsConfig } from './configs/cors.config';

const app = express();
const port = process.env.PORT || 5001; 

app.use(express.json());
app.use(fileUpload({}));
// app.use(cors(corsConfig())); // - защищенный
app.use(cors());

app.get('/', (req, res) => {
    res.json({ message: 'Данные из API' });
});

const start = async () => { 
    try {
        app.listen(port, () => console.log(`Server started on port: ${port}`)); 
    } catch (e) {
        console.log(e);
    }
}

start(); 








