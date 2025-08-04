#!/usr/bin/env node

/**
 * generateRedirects.js
 * - Randomizes the JS variable name each run
 * - Randomizes the lookup function name each run
 * - Scrambles Base64 output so it changes every build
 * - Rewrites 404.html with the new lookup function name
 */

const fs = require("fs");
const path = require("path");

const sourceFile = path.join(__dirname, "../../redirects.json");
const outputFile = path.join(__dirname, "../../redirects.js");
const htmlFile = path.join(__dirname, "../../404.html");

function randomName(len = 12) {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let name = "_";
    for (let i = 0; i < len; i++) {
        name += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return name;
}

function scrambleBase64(str) {
    // Normal base64
    const base64 = Buffer.from(str, "utf8").toString("base64");
    // XOR scramble with a random byte
    const key = Math.floor(Math.random() * 256);
    const scrambled = Buffer.from(base64.split("").map(ch =>
        String.fromCharCode(ch.charCodeAt(0) ^ key)
    ).join(""), "utf8").toString("base64");
    return { scrambled, key };
}

// Check if source exists
if (!fs.existsSync(sourceFile)) {
    console.error("redirects.json not found.");
    process.exit(1);
}

// Load JSON
let redirects;
try {
    redirects = JSON.parse(fs.readFileSync(sourceFile, "utf8"));
} catch (err) {
    console.error("Failed to parse redirects.json:", err);
    process.exit(1);
}

// Generate obfuscated mapping
const varName = randomName();
const funcName = randomName();
const encodedEntries = Object.entries(redirects).map(([key, url]) => {
    const { scrambled, key: scrambleKey } = scrambleBase64(url);
    return `  "${key}": {d: "${scrambled}", k: ${scrambleKey}}`;
});

// Write redirects.js
const outputContent = `// Auto-generated file. Do not edit directly.
window.${varName} = {
${encodedEntries.join(",\n")}
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
  window.${funcName} = function(shortKey) {
    if (window.${varName} && window.${varName}[shortKey]) {
      return decodeEntry(window.${varName}[shortKey]);
    }
    return null;
  };
})();
`;

fs.writeFileSync(outputFile, outputContent, "utf8");

// Patch 404.html
if (!fs.existsSync(htmlFile)) {
    console.error("404.html not found — skipping HTML update.");
} else {
    let html = fs.readFileSync(htmlFile, "utf8");
    // Replace placeholder in HTML
    html = html.replace(/__LOOKUP_FUNC__/g, funcName);
    fs.writeFileSync(htmlFile, html, "utf8");
    console.log(`Updated 404.html to use new lookup function`);
}