import React from "react";
import { Route, Switch } from "react-router-dom";
import Palette from "./components/Palette/Palette.jsx";
import PaletteList from "./components/PaletteList/PaletteList.jsx";
import seedPalettes from "./seedPalettes.js";
import { generatePalette } from "./colorHelpers.js";

import "./App.css";

function App() {
  const findPalette = (id) => {
    return seedPalettes.find(function (palette) {
      return palette.id === id;
    });
  };

  return (
    <Switch>
      <Route
        exact
        path="/"
        render={(routeProps) => (
          <PaletteList palettes={seedPalettes} {...routeProps} />
        )}
      />
      <Route
        exact
        path="/palette/:id"
        render={(routeProps) => (
          <Palette
            palette={generatePalette(findPalette(routeProps.match.params.id))}
          />
        )}
      />
      <Route
        exact
        path="/palette/:paletteId/:colorId"
        render={() => <h1>SINGLE COLOUR PAGE</h1>}
      />
    </Switch>
  );
}

export default App;
