import { Navigate, Route, Routes } from "react-router-dom";
import CodeBlockPage from "../../HomeArea/CodeBlockPage/CodeBlockPage";
import Lobby from "../../HomeArea/Lobby/Lobby";
import PageNotFound from "../PageNotFound/PageNotFound";
import "./Routing.css";

function Routing(): JSX.Element {
    return (
        <div className="Routing">
			<Routes>
                <Route path="/lobby" element={<Lobby />} />
                <Route path="/code-block-page" element={<CodeBlockPage />} />
                <Route path="/" element={<Navigate to="/lobby" />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </div>
    );
}

export default Routing;
