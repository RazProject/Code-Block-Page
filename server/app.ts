import cors from "cors";
import express from "express";
import { Server as HttpServer } from "http";
import path from "path";
import codeLogic from "./logic/student-code-logic";

// Create express server: 
const expressServer = express();

expressServer.use(cors());

expressServer.use(express.static(path.join(__dirname, "./_front-end")))

// Listen on HTTP:
const port = process.env.PORT || 3001;
const httpServer: HttpServer = expressServer.listen(port, () => console.log(`Listening on http://localhost:${port}`));

// Init code logic:
codeLogic(httpServer);

expressServer.use("*", (request, response) => {
    response.sendFile(path.join(__dirname, "./_front-end/index.html"));
})


