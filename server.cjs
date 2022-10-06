import jsonServer from "json-server";
import cors from "cors";

const routers = jsonServer.router("db.json");
const server = jsonServer.create();
server.use(routers);
server.use(cors());

export default server;
