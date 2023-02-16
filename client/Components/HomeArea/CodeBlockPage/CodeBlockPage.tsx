import { useEffect, useState} from "react";
import io, { Socket } from "socket.io-client";
import { CodeModel } from "../../../Models/code-model";
import { CodeActionType, codeStore } from "../../../Redux/CodeState";
import appConfig from "../../../Utils/Config";
import { v4 as uuidv4 } from 'uuid';
import "./CodeBlockPage.css";


function CodeBlockPage(): JSX.Element {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [code, setCode] = useState("");
    const [question] = useState(codeStore.getState().question);
    const [isFirstUser, setIsFirstUser] = useState(codeStore.getState().isFirst);


    useEffect(() => {
        // Connect to the socket when the component mounts
        const newSocket = io(appConfig.url);
        setSocket(newSocket);

        if (codeStore.getState().isFirst === false) {
            const clientId = uuidv4();
            newSocket.emit("client-connected", clientId);
            setIsFirstUser(false);
        }
        else {
            newSocket.emit("client-connected", 1);
            setIsFirstUser(true);
            codeStore.dispatch({ type: CodeActionType.AddIsFirst, payload: true });
        }

        newSocket.on("client-connected-response", ({ numConnectedClients, isFirst }) => {
            if (!sessionStorage.getItem("isFirst")) {
                if (isFirst === true) {
                    setIsFirstUser(isFirst);
                    sessionStorage.setItem("isFirst", "true");
                    codeStore.dispatch({ type: CodeActionType.AddIsFirst, payload: true });
                }
            }
        });

        return () => {
            // Disconnect the socket when the component unmounts
            newSocket.disconnect();
            setSocket(null);
        };
    }, []);

    useEffect(() => {
        if (socket) {
            socket.on("code-from-server", (codeFromServer: CodeModel) => {
                setCode(codeFromServer.code);
            });
        }
    }, [socket]);

    const handleCodeChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const codeToSendFromTextArea = new CodeModel();
        codeToSendFromTextArea.code = event.target.value;
        setCode(codeToSendFromTextArea.code);
        codeStore.dispatch({ type: CodeActionType.FetchCode, payload: codeToSendFromTextArea });

        if (socket) {
            socket.emit("code-from-client", codeToSendFromTextArea);
        }
    };

    useEffect(() => {
        if (code === "") {
            setCode(codeStore.getState().code.code);
        }
    }, [code]);

    useEffect(() => {
        if (socket) {
            socket.emit("code-from-client", codeStore.getState().code);
        }

        return () => {
            if (socket) {
                socket.disconnect();
                setSocket(null);
            }
        };
    }, [socket]);

    return (
        <div className="CodeBlockPage">
            <div>{question}</div>
            {isFirstUser ? (
                <pre className="hljs">
                    <textarea
                        onChange={handleCodeChange}
                        defaultValue={code}
                        disabled
                    />
                </pre>

            ) :  (
                <pre className="hljs">
                    <textarea
                        value={code}
                        onChange={handleCodeChange}
                    />
                </pre>
            )}
        </div>
    );
}
export default CodeBlockPage;