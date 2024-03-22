import {google} from "./google.routes.js";


const currentVersion = 'v1'

export const routes = (server) => {
    server.use(`/api/${currentVersion}/google`, google);
}