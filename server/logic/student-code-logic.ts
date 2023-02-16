import { Server as HttpServer } from "http";
import { Socket, Server as SocketIoServer } from "socket.io";
import CodeModel from "../models/code-model";

// Entire logic of the server chat:
function studentCodeLogic(httpServer: HttpServer): void {

    // Create CORS options:
    const options = { cors: { origin: "*" } };

    // Create the socket.io server:
    const socketIoServer = new SocketIoServer(httpServer, options);

    // Store connected client IDs in a Set
    const connectedClientIds = new Set<string>();

    // Listen to client connections:
    socketIoServer.sockets.on("connection", (socket: Socket) => {
        console.log("Client has been connected to socket.io...");

        // Listen for the client's unique identifier
        socket.on("client-connected", (clientId: string) => {
            // Add the client's ID to the Set
            connectedClientIds.add(clientId);
            console.log(`Client ${clientId} has been added. Total number of clients: ${connectedClientIds.size}`);

            // If this is the first client to connect, let them know
            if (connectedClientIds.size === 1) {
                socket.emit("client-connected-response", { numConnectedClients: connectedClientIds.size, isFirst: true });
            } else {
                socket.emit("client-connected-response", { numConnectedClients: connectedClientIds.size, isFirst: false });
            }
        });

        // Listen to student messages:
        socket.on("code-from-client", (code: CodeModel) => {
            // Send that message to all clients:
            socket.broadcast.emit("code-from-server", code);
        });

        // Listen on client disconnect:
        socket.on("disconnect", () => {
            console.log("Client has been disconnected from socket.io...");
            // Remove the client's ID from the Set
            connectedClientIds.delete(socket.id);
            console.log(`Client ${socket.id} has been removed. Total number of clients: ${connectedClientIds.size}`);
        });
    });
}

export default studentCodeLogic;
