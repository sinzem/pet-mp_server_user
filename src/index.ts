import 'dotenv/config';
import * as path from 'path';
import express from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';

import sequelize from './db/postgresql/postgresql';
import { corsConfig } from './configs/cors.config';
import router from './routes';

const app = express();
const port = process.env.PORT || 5001; 

app.use(express.json());
app.use(fileUpload({}));
// app.use(cors(corsConfig())); // - защищенный
app.use(cors());
app.use('/api', router);



const start = async () => { 
    try {
        await sequelize.authenticate();  
        // await sequelize.sync(); 
        app.listen(port, () => console.log(`Server started on port: ${port}`)); 
    } catch (e) {
        console.log(e);
    }
}

start(); 








