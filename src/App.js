import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import Palette from "./components/Palette/Palette.jsx";
import PaletteList from "./components/PaletteList/PaletteList.jsx";
import SingleColourPalette from "./components/SingleColourPalette/SingleColourPalette.jsx";
import NewPaletteForm from "./components/NewPaletteForm/NewPaletteForm.jsx";
import seedPalettes from "./seedPalettes.js";
import { generatePalette } from "./colorHelpers.js";

import "./App.css";

function App() {
  const localPalettes = JSON.parse(window.localStorage.getItem("palettes"));
  const [palettes, setPalettes] = useState(localPalettes || seedPalettes);

  const findPalette = (id) => {
    return palettes.find(function (palette) {
      return palette.id === id;
    });
  };

  const savePalette = (newPalette) => {
    setPalettes([...seedPalettes, newPalette]);
  };

  const deletePalette = (id) => {
    setPalettes(palettes.filter((palette) => palette.id !== id));
  };

  useEffect(() => {
    // save palettes to local storage
    window.localStorage.setItem("palettes", JSON.stringify(palettes));
  }, [palettes]);

  return (
    <Switch>
      <Route
        exact
        path="/palette/new"
        render={(routeProps) => (
          <NewPaletteForm
            savePalette={savePalette}
            {...routeProps}
            palettes={palettes}
          />
        )}
      />
      <Route
        exact
        path="/palette/:paletteId/:colorId"
        render={(routeProps) => (
          <SingleColourPalette
            colorId={routeProps.match.params.colorId}
            palette={generatePalette(
              findPalette(routeProps.match.params.paletteId)
            )}
          />
        )}
      />
      <Route
        exact
        path="/"
        render={(routeProps) => (
          <PaletteList
            palettes={palettes}
            deletePalette={deletePalette}
            {...routeProps}
          />
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
    </Switch>
  );
}

export default App;
