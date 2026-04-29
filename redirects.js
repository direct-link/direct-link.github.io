// Auto-generated file. Do not edit directly.
window._lfHeuittJgUA = {
  "P5hb8X": {d: "w4PDqsOwwpLDgcOqw6/ClMOuw5vCm8OLw4PDusOsw47Du8KRw7DDjcOAwpHDrMKSw4PDtcKXw4zDrsOPw6zDlMOAw7HCm8OMw7jDtcOsw5DDgMOVwp/Cnw==", k: 162},
  "CLie1R": {d: "w4/DpsO8wp7DjcOmw6PCmMOiw5fCl8ODw4vDqcOgw5jDosODw6DDhsOiwpzDgsOaw7TDl8KXw53DjMKcw4rDmMOiw7rDt8Kew4vDqsO3wp7DosOAw6zDm8O0w5nCk8KT", k: 174}
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
  window._hahEjbiUhHoX = function(shortKey) {
    if (window._lfHeuittJgUA && window._lfHeuittJgUA[shortKey]) {
      return decodeEntry(window._lfHeuittJgUA[shortKey]);
    }
    return null;
  };
})();
