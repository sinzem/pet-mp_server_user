import 'dotenv/config';
import * as path from 'path';
import express from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';

import { corsConfig } from './configs/cors.config';
import router from './routes';
import { errorHandler } from './middleware/errorHandler';
// import { createUserDataTableQuery, createUserProgressTableQuery } from './entities/user/schemas/postgresql/model';
// import { createUserDataTableQuery, createUserProgressTableQuery } from './entities/user/schems/postgresql/model';
// import { createCardDataTableQuery } from './entities/card/schemas/postgresql/model';
// import db from './db/postgresql/postgresql';
import { setupSwagger } from "./swagger";

const app = express();
const port = process.env.PORT || 5001; 

setupSwagger(app);
app.use(express.json());
app.use(fileUpload({}));
// app.use(cors(corsConfig())); // - защищенный
app.use(cors());
app.use('/api', router);
app.use(errorHandler);


const start = async () => { 
    try {
        // (инициализация таблиц без миграций node-pg-migrate)
        // db.none(createUserDataTableQuery)
        //     .then(() => console.log('Table user_data is connected'))
        //     .catch((e) => console.log(`Error creating UserData table: ${e}`));
        // db.none(createUserProgressTableQuery)
        //     .then(() => console.log('Table user_progress is connected'))
        //     .catch((e) => console.log(`Error creating UserProgress table: ${e}`));
        // db.none(createCardDataTableQuery)
        //     .then(() => console.log('Table card_data is connected'))
        //     .catch((e) => console.log(`Error creating CardData table: ${e}`));
        app.listen(port, () => {
            console.log(`Server started on port: ${port}`)
            console.log(`Swagger is available on: ${port}/api-docs`);
        }); 
        
    } catch (e) {
        console.log(e);
    }
}

start(); 








