import express  from 'express';
import {routes} from "./routes/main.routes.js";

export default async () => {
    const port = process.env.SERVER_PORT;
    const app = express();
    app.use(express.json({limit: '20mb'}));
    app.use(express.urlencoded({extended: true, limit: '20mb'}));

    routes(app)
    app.listen(port, () => {
        console.log('server running in:', port)
    })

}