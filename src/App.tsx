import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

import SearchPage from "./SearchPage";
import CheckoutPage from "./CheckoutPage";
import MovieShape from "./shapes/MovieShape";

function App() {
  const [selectedMovies, setSelectedMovies] = useState([] as MovieShape[]);

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <SearchPage
              selectedMovies={selectedMovies}
              setSelectedMovies={setSelectedMovies}
            />
          </Route>
          <Route path="/checkout">
            <CheckoutPage
              selectedMovies={selectedMovies}
              setSelectedMovies={setSelectedMovies}
            />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
