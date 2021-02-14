import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import Palette from "./components/Palette/Palette.jsx";
import PaletteList from "./components/PaletteList/PaletteList.jsx";
import SingleColourPalette from "./components/SingleColourPalette/SingleColourPalette.jsx";
import NewPaletteForm from "./components/NewPaletteForm/NewPaletteForm.jsx";
import seedPalettes from "./seedPalettes.js";
import { generatePalette } from "./colorHelpers.js";
import { CSSTransition, TransitionGroup } from "react-transition-group";

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
    <Route
      render={({ location }) => (
        <TransitionGroup>
          <CSSTransition key={location.key} classNames="fade" timeout={500}>
            <Switch location={location}>
              <Route
                exact
                path="/palette/new"
                render={(routeProps) => (
                  <div className="page">
                    <NewPaletteForm
                      savePalette={savePalette}
                      {...routeProps}
                      palettes={palettes}
                    />
                  </div>
                )}
              />
              <Route
                exact
                path="/palette/:paletteId/:colorId"
                render={(routeProps) => (
                  <div className="page">
                    <SingleColourPalette
                      colorId={routeProps.match.params.colorId}
                      palette={generatePalette(
                        findPalette(routeProps.match.params.paletteId)
                      )}
                    />
                  </div>
                )}
              />
              <Route
                exact
                path="/"
                render={(routeProps) => (
                  <div className="page">
                    <PaletteList
                      palettes={palettes}
                      deletePalette={deletePalette}
                      {...routeProps}
                    />
                  </div>
                )}
              />
              <Route
                exact
                path="/palette/:id"
                render={(routeProps) => (
                  <div className="page">
                    <Palette
                      palette={generatePalette(
                        findPalette(routeProps.match.params.id)
                      )}
                    />
                  </div>
                )}
              />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      )}
    />
  );
}

export default App;
