import chroma from "chroma-js";
const levels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

const generatePalette = (starterPalette) => {
  let newPalette = {
    paletteName: starterPalette.paletteName,
    id: starterPalette.id,
    emoji: starterPalette.emoji,
    colors: {},
  };

  // Loop over levels and add empty array to colors object
  for (let level of levels) {
    newPalette.colors[level] = [];
  }

  // Fill out colors from lightest (50) to darkest (900)
  for (let color of starterPalette.colors) {
    let scale = getScale(color.color, 10).reverse();
    for (let i in scale) {
      newPalette.colors[levels[i]].push({
        name: `${color.name} ${levels[i]}`,
        id: color.name.toLowerCase().replace(/ /g, "-"),
        hex: scale[i],
        rgb: chroma(scale[i]).css(),
        rgba: chroma(scale[i])
          .css()
          .replace("rgb", "rgba")
          .replace(")", ",1.0)"),
      });
    }
  }

  return newPalette;
};

const getRange = (hexColor) => {
  const end = "#fff";

  // Return an array with 3 hex values
  // Some dark color, our hex color and white
  return [chroma(hexColor).darken(1.4).hex(), hexColor, end];
};

// Return some number of colors based on the hex color
const getScale = (hexColor, numberOfColors) => {
  return chroma.scale(getRange(hexColor)).mode("lab").colors(numberOfColors);
};

export { generatePalette };
