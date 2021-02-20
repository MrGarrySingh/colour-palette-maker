import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import Palette from "./components/Palette/Palette.jsx";
import PaletteList from "./components/PaletteList/PaletteList.jsx";
import SingleColourPalette from "./components/SingleColourPalette/SingleColourPalette.jsx";
import NewPaletteForm from "./components/NewPaletteForm/NewPaletteForm.jsx";
import seedPalettes from "./seedPalettes.js";
import { generatePalette } from "./colorHelpers.js";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Page from "./components/Page/Page.jsx";

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
          <CSSTransition
            key={location.pathname}
            classNames="page"
            timeout={500}
          >
            <Switch location={location}>
              <Route
                exact
                path="/palette/new"
                render={(routeProps) => (
                  <Page>
                    <NewPaletteForm
                      savePalette={savePalette}
                      {...routeProps}
                      palettes={palettes}
                    />
                  </Page>
                )}
              />
              <Route
                exact
                path="/palette/:paletteId/:colorId"
                render={(routeProps) => (
                  <Page>
                    <SingleColourPalette
                      colorId={routeProps.match.params.colorId}
                      palette={generatePalette(
                        findPalette(routeProps.match.params.paletteId)
                      )}
                    />
                  </Page>
                )}
              />
              <Route
                exact
                path="/"
                render={(routeProps) => (
                  <Page>
                    <PaletteList
                      palettes={palettes}
                      deletePalette={deletePalette}
                      {...routeProps}
                    />
                  </Page>
                )}
              />
              <Route
                exact
                path="/palette/:id"
                render={(routeProps) => (
                  <Page>
                    <Palette
                      palette={generatePalette(
                        findPalette(routeProps.match.params.id)
                      )}
                    />
                  </Page>
                )}
              />
              <Route
                render={(routeProps) => (
                  <Page>
                    <PaletteList
                      palettes={palettes}
                      deletePalette={deletePalette}
                      {...routeProps}
                    />
                  </Page>
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
