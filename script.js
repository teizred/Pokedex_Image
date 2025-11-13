async function PokemonRes() {
  try {
    const input = document.getElementById("pokemonName");
    const name = input.value.trim().toLowerCase();
    const imgElement = document.getElementById("pokemonImage");
    const infoElement = document.getElementById("pokemonInfo");

    if (!name) {
      imgElement.style.display = "none";
      if (infoElement) infoElement.textContent = "";
      input.style.outline = "2px solid red";
      return;
    }

    const response = await fetch("https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json");
    if (!response.ok) throw new Error("Could not fetch Pokédex data");

    const data = await response.json();
    const pokemon = data.pokemon.find(p => p.name.toLowerCase() === name);

    if (!pokemon) {
      imgElement.style.display = "none";
      if (infoElement) infoElement.textContent = "";
      input.style.outline = "2px solid red"; /* red outline on failure */
      return;
    }

    input.style.outline = "2px solid #4ade80"; /* green outline on success */
    imgElement.src = pokemon.img;
    imgElement.alt = pokemon.name + " image";
    imgElement.style.display = "block";
    if (infoElement) {
      infoElement.innerHTML = `
        <h2>${pokemon.name}</h2>
        <p>Type: ${pokemon.type.join(", ")}</p>
        <p>Weight: ${pokemon.weight}</p>
      `;
    }
  } catch (error) {
    console.error(error.message);
  }
}


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


