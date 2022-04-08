import "./App.scss";
import { Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import ClusterIndex from "./views/ClusterIndex";
import DispositionIndex from "./views/DispositionIndex";
import GlobalReducer from "./hooks/useReducer";
import DispositionModal from "./components/DispositionModal";
import Viewport from "./hooks/useViewport";
import AreaModal from "./components/AreaModal";
import ThemeFilterModal from "./components/ThemeFilterModal";
import ThemeDetail from "./views/ThemeDetail";
import VideoModal from "./components/VideoModal";

function App() {
  return (
    <div className="App">
      <GlobalReducer>
        <Viewport>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/themas" element={<ClusterIndex />} />
            <Route path="/themas/:id" element={<ThemeDetail />} />
            <Route path="/maatregelen" element={<DispositionIndex />} />
          </Routes>
          <DispositionModal />
          <AreaModal />
          <ThemeFilterModal />
          <VideoModal />
        </Viewport>
      </GlobalReducer>
    </div>
  );
}

export default App;
