import React from "react";
import { Router, Link } from "@reach/router";

import SearchParams from "./components/SearchParams";
import Details from "./components/Details";

const App = () => (
  <React.StrictMode>
    <div>
      <header>
        <Link to="/">Adopt Me!</Link>
      </header>

      <Router>
        <SearchParams path="/" />
        <Details path="/details/:id" />
      </Router>
    </div>
  </React.StrictMode>
);

export default App;
