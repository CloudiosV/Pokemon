let cache = {};

const getPokemons = async () => {
	const promises = [];
	for (let i = 1; i <= totalPokemon; i++) {
		let pokemon = fetch(`${APIURL}/${i}`).then((res) => res.json());
		promises.push(pokemon);
	}
	Promise.all(promises).then((res) => {
		res.forEach((poke) => (cache[poke.id] = poke));
		displayPokemons();
	});
};

const displayPokemons = async () => {
	const pokemons = Object.values(cache);
	pokedex.innerHTML = "";
	pokemons.forEach((poke) => {
		const elementString = `<div class="pokemon" onclick="openModal(${poke.id})">
            <img src="${poke.sprites.front_default}" alt="">
            <h4 class="name">${poke.name}</h4>
        </div>`;
		let element = document.createElement("div");
		element.innerHTML = elementString;
		element = element.firstElementChild;
		const types = poke.types.map((type) => type.type.name).join(" - ");
		setColorType(types.split(" - ")[0], element);
		pokedex.append(element);
	});
};

getPokemons();

// async function fetchData(){
// 	try{

// 		const pokemonName = document.getElementById("pokemonName").value.toLowerCase();
// 		const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)

// 		if(!response.ok){
// 			throw new Error("Could not fetch resource");
// 		}

// 		const data = await response.json();
// 		const pokemonSprite = data.sprites.front_default;
// 		const imgElement = document.getElementById("pokedex");

// 	}
// }

const setCustomProperty = (element, prop, value) => {
	element.style.setProperty(prop, value);
};

const setColorType = (type, element) => {
	switch (type) {
		case "poison":
		case "grass":
		case "bug":
			setCustomProperty(element, "--border-color", "#43c81a");
			return;
		case "normal":
			setCustomProperty(element, "--border-color", "white");
			return;
		case "fire":
			setCustomProperty(element, "--border-color", "#ff3b3b");
			return;
		case "water":
			setCustomProperty(element, "--border-color", "#3b5fff");
			return;
		case "ground":
			setCustomProperty(element, "--border-color", "#d37531");
			return;
		case "fairy":
			setCustomProperty(element, "--border-color", "#e540e0");
			return;
		case "psychic":
			setCustomProperty(element, "--border-color", "rgb(226, 226, 19)");
			return;
		case "fighting":
			setCustomProperty(element, "--border-color", "red");
			return;
	}
};

const openModal = (pokeId) => {
	modal.classList.remove("hide");
	const pokemon = cache[pokeId];
	console.log(pokemon);
	modalImage.src = pokemon.sprites.front_default;
	modalName.innerHTML = pokemon.name;

	const types = pokemon.types.map((type) => type.type.name).join(" - ");
	const abilities = pokemon.abilities
		.map((ab) => ab.ability.name)
		.join(" - ");
	modalDescription.innerHTML = `Height: ${pokemon.height}cm <br> Type: ${types} <br> Abilities: ${abilities}`;

	setColorType(types.split(" - ")[0], document.documentElement);

	modal.addEventListener("click", function (e) {
		if (e.currentTarget != e.target) return;
		e.currentTarget.classList.add("hide");
	});
};

modalClose.addEventListener("click", () => modal.classList.add("hide"));
