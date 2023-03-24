import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { PhotoVoiceAppBar } from "./components/app-bar/app-bar";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="root">
      <PhotoVoiceAppBar />
      <Outlet />
    </div>
  );
}

export default App;
