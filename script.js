// Import the color configuration for each Pokémon type (from colors.js)
import { typeColors } from "./colors.js";
let pokedex = []; // will store the full list of Pokémon from the JSON
let currentPokemon = null; // will store the Pokémon currently displayed
// Main function: called when the user searches (button click or Enter)
// - reads the input
// - fetches the Pokédex JSON
// - finds the Pokémon by name
// - calls renderPokemon() to update the UI
async function PokemonRes() {
  try {
    // 1. Get DOM elements we need
    const input = document.getElementById("pokemonName");
    // 2. If the input is empty, show an error outline and stop
    const name = input.value.trim().toLowerCase();
    const imgElement = document.getElementById("pokemonImage");
    const infoElement = document.getElementById("pokemonInfo");

    if (!name) {
      imgElement.style.display = "none";
      if (infoElement) infoElement.textContent = "";
      input.style.outline = "2px solid red";
      return;
    }

    // 3. Fetch the Pokédex data from the JSON URL (only reading, no edit)
    const response = await fetch("https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json");
    if (!response.ok) throw new Error("Could not fetch Pokédex data");

    const data = await response.json();
    // 4. On first search, save the full list of Pokémon in pokedex
    //    so we can reuse it later for prev/next evolution without refetching
    if (!pokedex.length) {
      pokedex = data.pokemon;
    }
    // 5. Find the Pokémon whose name matches the user input (case-insensitive)
    const pokemon = pokedex.find(p => p.name.toLowerCase() === name);

    // 6. If no Pokémon found, hide the image, clear info, and show red outline
    if (!pokemon) {
      imgElement.style.display = "none";
      if (infoElement) infoElement.textContent = "";
      input.style.outline = "2px solid red"; /* red outline on failure */
      return;
    }

    // 7. Save the found Pokémon and render it
    currentPokemon = pokemon;
    renderPokemon(pokemon);
  } catch (error) {
    console.error(error.message);
  }
}
// Render a single Pokémon:
// - update the image
// - build colored type chips
// - show prev/next evolution buttons if available
function renderPokemon(pokemon) {
  // Get DOM elements again (input, image, info container)
  const input = document.getElementById("pokemonName");
  const imgElement = document.getElementById("pokemonImage");
  const infoElement = document.getElementById("pokemonInfo");

  if (!pokemon || !imgElement || !infoElement) return;

  // Show the sprite and a green outline around the input to indicate success
  input.style.outline = "2px solid #4ade80";
  imgElement.src = pokemon.img;
  imgElement.alt = pokemon.name + " image";
  imgElement.style.display = "block";

  // Build the HTML for the colored type chips (Fire, Water, etc.)
  let typeLabels = "";

  for (let i = 0; i < pokemon.type.length; i++) {
    // Get the type name and look up its color in typeColors
    let typeName = pokemon.type[i];
    let color = typeColors[typeName];

    if (!color) {
      color = "#ffffff";
    }

    typeLabels += `<span class="type-label" style="background-color: ${color};">${typeName}</span>`;

    if (i < pokemon.type.length - 1) {
      typeLabels += ", ";
    }
  }

  // Check if this Pokémon has previous or next evolutions
  const hasPrev = pokemon.prev_evolution && pokemon.prev_evolution.length > 0;
  const hasNext = pokemon.next_evolution && pokemon.next_evolution.length > 0;

  // Build the HTML for the info block: name + evolution buttons + type + weight
  infoElement.innerHTML = `
    <div class="pokemon-header">
      <h2>${pokemon.name}</h2>
      <div class="evolution-nav">
        <button id="prevEvolutionBtn" ${hasPrev ? "" : "disabled"}>&lt; Prev</button>
        <button id="nextEvolutionBtn" ${hasNext ? "" : "disabled"}>Next &gt;</button>
      </div>
    </div>
    <p>Type: ${typeLabels}</p>
    <p>Weight: ${pokemon.weight}</p>
  `;

  // Get the evolution buttons and attach click handlers
  const prevBtn = document.getElementById("prevEvolutionBtn");
  const nextBtn = document.getElementById("nextEvolutionBtn");

  if (prevBtn && hasPrev) {
    prevBtn.addEventListener("click", () => showPrevEvolution(pokemon));
  }
  if (nextBtn && hasNext) {
    nextBtn.addEventListener("click", () => showNextEvolution(pokemon));
  }
}
// Helper: find a Pokémon in pokedex by its name (used for prev/next evolution)
function findPokemonByName(name) {
  if (!pokedex || !pokedex.length) return null;
  return pokedex.find(p => p.name.toLowerCase() === name.toLowerCase());
}
// Go to the previous evolution stage (if it exists) and re-render
function showPrevEvolution(pokemon) {
  if (!pokemon.prev_evolution || !pokemon.prev_evolution.length) return;
  const prevStage = pokemon.prev_evolution[pokemon.prev_evolution.length - 1];
  const target = findPokemonByName(prevStage.name);
  if (target) {
    currentPokemon = target;
    renderPokemon(target);
  }
}
// Go to the next evolution stage (if it exists) and re-render
function showNextEvolution(pokemon) {
  if (!pokemon.next_evolution || !pokemon.next_evolution.length) return;
  const nextStage = pokemon.next_evolution[0];
  const target = findPokemonByName(nextStage.name);
  if (target) {
    currentPokemon = target;
    renderPokemon(target);
  }
}
// Wire up events: Enter key and Search button both call PokemonRes()
const inputField = document.getElementById("pokemonName");
const btn = document.getElementById("searchBtn");

if (inputField) {
  inputField.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      PokemonRes();
    }
  });
}

if (btn) {
  btn.addEventListener("click", () => {
    PokemonRes();
  });
}








// https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json
// const root = document.getElementById("root");
// async function PokemonRes() {
//   const res = await fetch(
//     "https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json"
//   );
//   const data = await res.json();
//   console.log(data.pokemon.length);
//   for (let i = 0; i < data.pokemon.length; i++) {
//     const pkmData = data.pokemon[i].name;
//     const pkmList = document.createElement("li");
//     pkmList.innerHTML = pkmData;
//     console.log(pkmList);
//     root.appendChild(pkmList);
//   }
// }

// PokemonRes();

// const root2 = document.getElementById("root2");
// async function PokemonType() {
//     const type = await fetch (
//         "https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json"
//     );
//     const data = await type.json();
//     console.log(data.pokemon.length);
//     const ul =document.createElement("ul")
//     for (let i = 0; i < data.pokemon.length; i++) {
//       const pkm = data.pokemon[i];
//       const li = document.createElement("li");
//       let nameText = pkm.name;
//       let typeText = pkm.type.join(", ");
//       li.textContent = nameText + " (" + typeText + ")";
//       ul.appendChild(li);
//       root2.appendChild(li);
//     }
// } 

// PokemonType()

// https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json
// const root = document.getElementById("root");
// async function PokemonRes() {
//   const res = await fetch(
//     "https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json"
//   );
//   const data = await res.json();
//   console.log(data.pokemon.length);
//   for (let i = 0; i < data.pokemon.length; i++) {
//     const pkmData = data.pokemon[i];
//     const pkmPrevEv = document.createElement("li");
//     const pkmList = document.createElement("li");
//     if (pkmData.prev_evolution) {
//       for (let idx = 0; idx < pkmData.prev_evolution.length; idx++) {
//         console.log(pkmData.prev_evolution[idx].name);
//         pkmPrevEv.innerHTML = `pre-évolution ${pkmData.prev_evolution[idx].name}`;
//       }
//       root.appendChild(pkmPrevEv);
//     }
//     pkmList.innerHTML = `nom : ${pkmData.name} type : ${pkmData.type}`;
//     root.appendChild(pkmList);
//   }
// }

// PokemonRes();

// https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json
// const root = document.getElementById("root");
// async function PokemonRes() {
//   const res = await fetch(
//     "https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json"
//   );
//   const data = await res.json();
//   console.log(data.pokemon.length);
//   for (let i = 0; i < data.pokemon.length; i++) {
//     const pkmData = data.pokemon[i];
//     const pkmPrevEv = document.createElement("li");
//     const pkmList = document.createElement("li");
//     if (pkmData.prev_evolution) {
//       pkmData.prev_evolution.forEach((element) => {
//         console.log(element.name);
//       });
//       for (let idx = 0; idx < pkmData.prev_evolution.length; idx++) {
//         pkmPrevEv.innerHTML = `pre-évolution ${pkmData.prev_evolution[idx].name}`;
//       }
//       root.appendChild(pkmPrevEv);
//     }
//     pkmList.innerHTML = `nom : ${pkmData.name} type : ${pkmData.type}`;
//     root.appendChild(pkmList);
//   }
// }

// PokemonRes();

// // https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json
// const root = document.getElementById("root");
// async function PokemonRes() {
//   const res = await fetch(
//     "https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json"
//   );
//   const data = await res.json();
//   console.log(data.pokemon.length);
//   for (let i = 0; i < data.pokemon.length; i++) {
//     const pkmData = data.pokemon[i];
//     const pkmPrevEv = document.createElement("li");
//     const pkmList = document.createElement("li");
//     if (pkmData.prev_evolution) {
//       pkmData.prev_evolution.forEach((element) => {
//         pkmPrevEv.innerHTML = `pre-évolution ${element.name}`;
//       });
//       root.appendChild(pkmPrevEv);
//     }
//     pkmList.innerHTML = `nom : ${pkmData.name} type : ${pkmData.type}`;
//     root.appendChild(pkmList);
//   }
// }

// PokemonRes();

// async function PokemonRes() {
//   try {
//     // const pokemonName = document.getElementById("pokemonName").value.toLowerCase();

//     const response = await fetch("https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json");
//     if (!response.ok) throw new Error("Could not fetch resource");

//     const data = await response.json();
//     console.log(data)
//     const pokemon = data.pokemon.find(p => p.name.toLowerCase() === pokemonName);

//     const imgElement = document.getElementById("pokemonImage");

//     if (!pokemon) {
//       imgElement.style.display = "none";
//       throw new Error("Pokémon not found!");
//     }

//     imgElement.src = pokemon.img;
//     imgElement.style.display = "block";

//   } catch (error) {
//     console.error(error.message);
//   }
// }
// PokemonRes();
// https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json
// const root = document.getElementById("root");
// async function PokemonRes() {
//   const res = await fetch(
//     "https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json"
//   );
//   const data = await res.json();
//   console.log(data.pokemon.length);
//   for (let i = 0; i < data.pokemon.length; i++) {
//     const pkmData = data.pokemon[i].name;
//     const pkmList = document.createElement("li");
//     pkmList.innerHTML = pkmData;
//     console.log(pkmList);
//     root.appendChild(pkmList);
//   }
// }

// PokemonRes();

// const root2 = document.getElementById("root2");
// async function PokemonType() {
//     const type = await fetch (
//         "https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json"
//     );
//     const data = await type.json();
//     console.log(data.pokemon.length);
//     const ul =document.createElement("ul")
//     for (let i = 0; i < data.pokemon.length; i++) {
//       const pkm = data.pokemon[i];
//       const li = document.createElement("li");
//       let nameText = pkm.name;
//       let typeText = pkm.type.join(", ");
//       li.textContent = nameText + " (" + typeText + ")";
//       ul.appendChild(li);
//       root2.appendChild(li);
//     }
// } 

// PokemonType()

// https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json
// const root = document.getElementById("root");
// async function PokemonRes() {
//   const res = await fetch(
//     "https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json"
//   );
//   const data = await res.json();
//   console.log(data.pokemon.length);
//   for (let i = 0; i < data.pokemon.length; i++) {
//     const pkmData = data.pokemon[i];
//     const pkmPrevEv = document.createElement("li");
//     const pkmList = document.createElement("li");
//     if (pkmData.prev_evolution) {
//       for (let idx = 0; idx < pkmData.prev_evolution.length; idx++) {
//         console.log(pkmData.prev_evolution[idx].name);
//         pkmPrevEv.innerHTML = `pre-évolution ${pkmData.prev_evolution[idx].name}`;
//       }
//       root.appendChild(pkmPrevEv);
//     }
//     pkmList.innerHTML = `nom : ${pkmData.name} type : ${pkmData.type}`;
//     root.appendChild(pkmList);
//   }
// }

// PokemonRes();

// https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json
// const root = document.getElementById("root");
// async function PokemonRes() {
//   const res = await fetch(
//     "https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json"
//   );
//   const data = await res.json();
//   console.log(data.pokemon.length);
//   for (let i = 0; i < data.pokemon.length; i++) {
//     const pkmData = data.pokemon[i];
//     const pkmPrevEv = document.createElement("li");
//     const pkmList = document.createElement("li");
//     if (pkmData.prev_evolution) {
//       pkmData.prev_evolution.forEach((element) => {
//         console.log(element.name);
//       });
//       for (let idx = 0; idx < pkmData.prev_evolution.length; idx++) {
//         pkmPrevEv.innerHTML = `pre-évolution ${pkmData.prev_evolution[idx].name}`;
//       }
//       root.appendChild(pkmPrevEv);
//     }
//     pkmList.innerHTML = `nom : ${pkmData.name} type : ${pkmData.type}`;
//     root.appendChild(pkmList);
//   }
// }

// PokemonRes();

// // https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json
// const root = document.getElementById("root");
// async function PokemonRes() {
//   const res = await fetch(
//     "https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json"
//   );
//   const data = await res.json();
//   console.log(data.pokemon.length);
//   for (let i = 0; i < data.pokemon.length; i++) {
//     const pkmData = data.pokemon[i];
//     const pkmPrevEv = document.createElement("li");
//     const pkmList = document.createElement("li");
//     if (pkmData.prev_evolution) {
//       pkmData.prev_evolution.forEach((element) => {
//         pkmPrevEv.innerHTML = `pre-évolution ${element.name}`;
//       });
//       root.appendChild(pkmPrevEv);
//     }
//     pkmList.innerHTML = `nom : ${pkmData.name} type : ${pkmData.type}`;
//     root.appendChild(pkmList);
//   }
// }

// PokemonRes();

// async function PokemonRes() {
//   try {
//     const response = await fetch("https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json");
//     if (!response.ok) throw new Error("Could not fetch resource");

//     const data = await response.json();
//     console.log(data);
//   } catch (error) {
//     console.error(error.message);
//   }
// }
// PokemonRes();
