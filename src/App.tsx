import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { PhotoVoiceAppBar } from "./components/app-bar/app-bar";
import { Outlet, useLocation } from "react-router-dom";
import { Home } from "./components/home/home";

function App() {
  const location = useLocation();

  return (
    <div className="root">
      <PhotoVoiceAppBar />
      {location.pathname === "/" && <Home />}
      <Outlet />
    </div>
  );
}

export default App;
