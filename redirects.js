// Auto-generated file. Do not edit directly.
window._IFfRpjWyOpSA = {
  "P5hb8X": {d: "LQQefC8EAXoANXUlLRQCIBV/HiMufwJ8LRt5IgAhAjouH3UiFhsCPi47cXE=", k: 76},
  "CLie1R": {d: "SWB6GEtgZR5kURFFTW9mXmRFZkBkGkRcclERW0oaTF5kfHEYTWxxGGRGal1yXxUV", k: 40}
};

// Decoder
(function(){
  function decodeEntry(e) {
    try {
      const decodedBase64 = atob(e.d);
      const xored = decodedBase64.split("").map(ch =>
        String.fromCharCode(ch.charCodeAt(0) ^ e.k)
      ).join("");
      return atob(xored);
    } catch {
      return null;
    }
  }
  window._CqiOqvVOhtZY = function(shortKey) {
    if (window._IFfRpjWyOpSA && window._IFfRpjWyOpSA[shortKey]) {
      return decodeEntry(window._IFfRpjWyOpSA[shortKey]);
    }
    return null;
  };
})();
