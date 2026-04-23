let url = "https://restcountries.com/v4/all?fields=cca2,name,flag";
let allCountries = [];

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    data.forEach((country) => {
      const desc = country.flag.alt;
      const keywords = desc.toLowerCase().split(/[^a-zA-Z'-]+/);
      country.keywords = keywords;
    });

    allCountries = data;
    renderFlags(allCountries);
  })
  .catch((error) => console.error("Error:", error));

function renderFlags(countries) {
  const container = document.getElementById("flags-container");
  container.innerHTML = "";

  // Sort countries alphabetically
  countries.sort((a, b) => a.name.common.localeCompare(b.name.common));

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  alphabet.forEach((letter) => {
    // Filter countries starting with current letter
    const countriesByLetter = countries.filter((country) => {
      const firstChar = country.name.common
        .normalize("NFD") // Decompose characters like "Å" into "A" + diacritical mark
        .charAt(0)
        .toUpperCase();
      return firstChar === letter;
    });

    if (countriesByLetter.length > 0) {
      const letterCard = document.createElement("div");

      // Use same class for letters and flag
      letterCard.className = "flag-card letter-header";
      letterCard.textContent = letter;
      container.appendChild(letterCard);

      countriesByLetter.forEach((country) => {
        // Create a container for each flag + name
        const flagCard = document.createElement("div");
        flagCard.className = "flag-card"; // For styling

        // Create the flag image
        const img = document.createElement("img");
        img.src = country.flag.png;
        img.alt = country.cca2;

        // Create the country name
        const name = document.createElement("p");
        name.textContent = country.name.common;

        // Append both to the card
        flagCard.appendChild(img);
        flagCard.appendChild(name);

        // Append the card to the main container
        container.appendChild(flagCard);
      });
    }
  });
}
// Search function
function filterCountries(searchTerm) {
  const fullTerm = searchTerm.toLowerCase().trim();

  if (!fullTerm) return allCountries;

  // Split search term by comma or space
  const searchTerms = fullTerm
    .split(/[,\s]+/)
    .filter((token) => token.length > 0);

  return allCountries.filter((country) => {
    return searchTerms.every(
      (term) =>
        country.keywords.includes(term) ||
        country.name.common.toLowerCase().includes(term),
    );
  });
}

// Add event listener for the existing search input
const searchInput = document.getElementById("search-bar");
searchInput.addEventListener("input", () => {
  const filteredData = filterCountries(searchInput.value.trim());
  renderFlags(filteredData);
});

// Toggle names button
const toggleNamesButton = document.getElementById("toggle-names");
if (toggleNamesButton) {
  toggleNamesButton.addEventListener("click", () => {
    // Find all <p> elements inside the flag-card class
    const names = document.querySelectorAll(".flag-card p");
    const isHidden = names[0].style.display === "none";
    // Set <p> to block (visible) or none (hidden)
    names.forEach((name) => {
      name.style.display = isHidden ? "block" : "none";
    });
    toggleNamesButton.textContent = isHidden ? "Hide Names" : "Show Names";
  });
}

// Toggle mode button
const toggleModeButton = document.getElementById("toggle-mode");
if (toggleModeButton) {
  toggleModeButton.addEventListener("click", () => {
    // Check current status of button
    const isOverviewMode = toggleModeButton.textContent === "Detail Mode";
    // Depending on mode decide which style to use in body
    if (isOverviewMode) {
      toggleModeButton.textContent = "Overview Mode";
      document.body.classList.remove("overview-mode");
    } else {
      toggleModeButton.textContent = "Detail Mode";
      document.body.classList.add("overview-mode");
    }
  });
}

function applyWave(id, amplitude) {
  const el = document.getElementById(id);
  const text = el.getAttribute("data-text");

  el.innerHTML = text
    .split("")
    .map((ch, i) => {
      const amp = amplitude * (0.4 + (i / text.length) * 0.6);
      const delay = i * 0.07;
      const char = ch === " " ? "&nbsp;" : ch;
      return `<span class="wave-char" style="--amp:${amp}px; animation-delay:${delay}s">${char}</span>`;
    })
    .join("");
}

applyWave("cyber-header", 8);
