import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

function BodyClassUpdater() {
  const location = useLocation();

  useEffect(() => {
    const pageClasses = {
      "": "bg-white",
      "/": "bg-white",
      "/about": "bg-slate-100",
      "/contact": "bg-yellow-100",
    };

    document.body.className = pageClasses[location.pathname] || "bg-white";
  }, [location]);

  return null;
}

export default function App() {
  return (
    <>
      <Router>
        <BodyClassUpdater />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
