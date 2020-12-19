import React from "react";

function Footer({ paletteName, emoji }) {
  return (
    <footer className="palette__footer">
      {paletteName}
      <span className="palette__footerEmoji">{emoji}</span>
    </footer>
  );
}

export default Footer;
