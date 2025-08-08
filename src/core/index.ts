import 'dotenv/config';
import * as path from 'path';
import cors from 'cors';
import express from 'express';
import router from '../routes';
import fileUpload from 'express-fileupload';
import cookieParser from 'cookie-parser';
import { setupSwagger } from "../configs/swagger";
import { createServer, Server } from "http";

import { corsConfig } from '../configs/cors.config';
import { errorHandler } from '../middleware/errorHandler';
import db from '../db/postgresql/postgresql';
import { createCardDataTableQuery } from '../entities/card/schemas/index';
import { createUserDataTableQuery, createUserProgressTableQuery } from '../entities/user/schemas/index';
import { logger, morganMiddleware } from '../configs/logger';


class App {
    public port: number
    public host: string

    private app: express.Application
    private server: Server

    constructor(port = 5001, host = "localhost") {
        this.port = port;
        this.host = host
  
        this.app = this.createApp()
        this.server = this.createServer()
    }
  
    private createApp(): express.Application {
        const app = express();

        setupSwagger(app);
        app.use(express.json());
        app.use(cookieParser());
        app.use(fileUpload({}));
        // app.use(morganMiddleware); // - request logging
        // app.use(cors(corsConfig())); // - protected
        app.use(cors());
        app.use('/api', router);
        app.use(errorHandler);
    
        return app
    }
  
    private createServer(): Server {
        const server = createServer(this.app)
  
        return server
    }

    private createTablesInDB(): void { // (initialize tables without migrations node-pg-migrate)
        db.none(createUserDataTableQuery)
            .then(() => console.log('Table user_data is connected'))
            .catch((e) => console.log(`Error creating UserData table: ${e}`));
        db.none(createUserProgressTableQuery)
            .then(() => console.log('Table user_progress is connected'))
            .catch((e) => console.log(`Error creating UserProgress table: ${e}`));
        db.none(createCardDataTableQuery)
            .then(() => console.log('Table card_data is connected'))
            .catch((e) => console.log(`Error creating CardData table: ${e}`));
    }
 
    public start(): void {
        try {
            // this.createTablesInDB();  // (already created with node-pg-migrate)
            this.server.listen(this.port, () => {
                // logger.info(`Server started on port: ${this.port}`);
                console.log(`Server started on port: ${this.port}`);
                console.log(`Swagger is available on: ${this.port}/api-docs`);
            })
        } catch (e) {
            console.log(e);
        }
    }
}

export default App