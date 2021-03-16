import React, { useState, useEffect } from "react";
import { Router, Link } from "@reach/router";
import ThemeContext from "./components/ThemeContext";

import SearchParams from "./components/SearchParams";
import Details from "./components/Details";

const App = () => {
  const themeHook = useState("#ad343e");
  return (
    <React.StrictMode>
      <ThemeContext.Provider value={themeHook}>
        <div>
          <header>
            <Link to="/">Adopt Me!</Link>
          </header>

          <Router>
            <SearchParams path="/" />
            <Details path="/details/:id" />
          </Router>
        </div>
      </ThemeContext.Provider>
    </React.StrictMode>
  );
};

export default App;
