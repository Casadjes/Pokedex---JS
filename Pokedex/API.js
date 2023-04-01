const btnLeft = document.querySelector(".controls .arrows .arrow-left");
const btnRight = document.querySelector(".controls .arrows .arrow-right");
let id = 0;

document.addEventListener("DOMContentLoaded", () => {
	fetchData();

	const btnSearch = document.getElementById("btn-search");
	const searchInput = document.getElementById("search-pokemon");
	const pokemonList = document.getElementById("pokemon-list");

	const pokemonFilter = async () => {
		const url = await fetch(
			"https://pokeapi.co/api/v2/pokemon?offset=0&limit=150"
		);
		const filterData = await url.json();
		searchInput.addEventListener("keyup", () => {
			const searchTerm = searchInput.value.toLowerCase();

			const filteredResults = filterData.results.filter((pokemon) =>
				pokemon.name.includes(searchTerm)
			);

			showResults(filteredResults);
		});
	};
	pokemonFilter();

	btnSearch.addEventListener("click", async (e) => {
		e.preventDefault();

		try {
			const resPokemon = await fetch(
				"https://pokeapi.co/api/v2/pokemon/" + searchInput.value.toLowerCase()
			);
			const dataPokemon = await resPokemon.json();
			const resAbility = await fetch(
				"https://pokeapi.co/api/v2/ability/" + dataPokemon.id
			);
			const dataAbility = await resAbility.json();

			mostrarPokemon(dataPokemon);
			mostrarInfo(dataAbility);
		} catch (error) {
			console.log(error);
		}
	});

	document.addEventListener("click", (e) => {
		if (e.target === searchInput) {
			pokemonList.classList.add("active");
		} else {
			pokemonList.classList.remove("active");
		}
	});

	const showResults = (results) => {
		pokemonList.innerHTML = "";
		results.forEach((pokemon) => {
			const li = document.createElement("li");
			li.addEventListener("click", () => {
				searchInput.value = `${li.textContent}`;
			});
			li.textContent = pokemon.name;
			pokemonList.appendChild(li);
		});
	};

	// searchInput.addEventListener("keyup", () => {
	// 	const searchTerm = searchInput.value.toLowerCase();

	// 	const filteredResults = filterData.results.filter((pokemon) =>
	// 		pokemon.name.includes(searchTerm)
	// 	);

	// 	showResults(filteredResults);
	// });
});

const fetchData = async () => {
	try {
		// Pokemon
		const resPokemon = await fetch(
			"https://pokeapi.co/api/v2/pokemon/" + (id + 1)
		);
		const dataPokemon = await resPokemon.json();

		// abilities
		const resAbility = await fetch(
			"https://pokeapi.co/api/v2/ability/" + (id + 1)
		);
		const dataAbility = await resAbility.json();

		console.log(dataPokemon);
		console.log(dataAbility);

		mostrarPokemon(dataPokemon);
		mostrarInfo(dataAbility);
		actualizarBotones();
	} catch (error) {
		console.log(error);
	}
};

// document.addEventListener("DOMContentLoaded", () => {
// 	fetchData();

// });

// const fetchData = async () => {
// 	try {
// 		// Pokemon
// 		const resPokemon = await fetch(
// 			"https://pokeapi.co/api/v2/pokemon/" + (id + 1)
// 		);
// 		const dataPokemon = await resPokemon.json();

// 		// abilities
// 		const resAbility = await fetch(
// 			"https://pokeapi.co/api/v2/ability/" + (id + 1)
// 		);
// 		const dataAbility = await resAbility.json();

// 		console.log(dataPokemon);
// 		console.log(dataAbility);

// 		mostrarPokemon(dataPokemon);
// 		mostrarInfo(dataAbility);
// 		actualizarBotones();
// 	} catch (error) {
// 		console.log(error);
// 	}
// };

const mostrarInfo = (data) => {
	/* Professor Oak */
	const professorScreen = document.getElementById("professorScreen");
	const professorTemplate =
		document.getElementById("professorTemplate").content;
	const professorFragment = document.createDocumentFragment();
	const cloneProfessor = professorTemplate.cloneNode(true);
	cloneProfessor.querySelector("p").innerText = data.effect_entries[1].effect;

	professorScreen.innerText = "";
	professorFragment.appendChild(cloneProfessor);
	professorScreen.appendChild(professorFragment);
};

const mostrarPokemon = (data) => {
	/* main screen */
	const screenImg = document.getElementById("screen-content");
	const ImgTemplate = document.getElementById("screenImgTemplate").content;
	const screenFragment = document.createDocumentFragment();
	const cloneImg = ImgTemplate.cloneNode(true);
	cloneImg.querySelector("img").setAttribute("src", data.sprites.front_default);

	/* Info screen */
	const infoScreen = document.getElementById("info-content");
	const infoTemplate = document.getElementById("infoScreenTemplate").content;
	const cloneInfo = infoTemplate.cloneNode(true);
	const infoFragment = document.createDocumentFragment();

	cloneInfo.getElementById("pokemonName").innerText = `Name: ${data.name}`;
	cloneInfo.getElementById(
		"pokemonType"
	).innerText = `Type: ${data.types[0].type.name}`;
	cloneInfo.getElementById("pokemonId").innerText = `Id #${data.id}`;
	cloneInfo.getElementById(
		"pokemonWeight"
	).innerText = `Weight: ${formatoCantidades(data.weight)} kg`;
	cloneInfo.getElementById(
		"pokemonHeight"
	).innerText = `Height: ${formatoCantidades(data.height)} m`;
	cloneInfo.getElementById(
		"pokemonAttack"
	).innerText = `Attack: ${data.stats[1].base_stat}`;
	cloneInfo.getElementById(
		"pokemonSpecialA"
	).innerText = `Sp.Atk: ${data.stats[3].base_stat}`;
	cloneInfo.getElementById(
		"pokemonDefense"
	).innerText = `Defense: ${data.stats[2].base_stat}`;
	cloneInfo.getElementById(
		"pokemonSpecialD"
	).innerText = `Sp.Def: ${data.stats[4].base_stat}`;
	cloneInfo.getElementById(
		"pokemonSpeed"
	).innerText = `Speed: ${data.stats[5].base_stat}`;
	cloneInfo.getElementById(
		"pokemonHealth"
	).innerText = `Health: ${data.stats[0].base_stat}`;
	cloneInfo.getElementById(
		"pokemonExp"
	).innerText = `Exp: ${data.base_experience}`;

	screenImg.innerText = "";
	screenFragment.appendChild(cloneImg);
	screenImg.appendChild(screenFragment);

	infoScreen.innerText = "";
	infoFragment.appendChild(cloneInfo);
	infoScreen.appendChild(infoFragment);

	/*
	 * --------------------------Filter---------------------------------
	 */

	// const pokemonFilter = async () => {
	// 	const url = await fetch(
	// 		"https://pokeapi.co/api/v2/pokemon?offset=0&limit=150"
	// 	);
	// 	const filterData = await url.json();
	// 	// console.log(filterData);

	// 	const btnSearch = document.getElementById("btn-search");
	// 	const searchInput = document.getElementById("search-pokemon");
	// 	const pokemonList = document.getElementById("pokemon-list");

	// 	btnSearch.addEventListener("click", async (e) => {
	// 		try {
	// 			const resPokemon = await fetch(
	// 				"https://pokeapi.co/api/v2/pokemon/" + searchInput.value.toLowerCase()
	// 			);
	// 			const dataPokemon = await resPokemon.json();
	// 			const resAbility = await fetch(
	// 				"https://pokeapi.co/api/v2/ability/" + data.id
	// 			);
	// 			const dataAbility = await resAbility.json();
	// 			console.log(dataAbility);

	// 			mostrarPokemon(dataPokemon);
	// 			mostrarInfo(dataAbility);
	// 		} catch (error) {
	// 			console.log(error);
	// 		}
	// 	});

	// 	document.addEventListener("click", (e) => {
	// 		if (e.target === searchInput) {
	// 			pokemonList.classList.add("active");
	// 		} else {
	// 			pokemonList.classList.remove("active");
	// 		}
	// 	});

	// 	const showResults = (results) => {
	// 		pokemonList.innerHTML = "";
	// 		results.forEach((pokemon) => {
	// 			const li = document.createElement("li");
	// 			li.addEventListener("click", () => {
	// 				searchInput.value = `${li.textContent}`;
	// 			});
	// 			li.textContent = pokemon.name;
	// 			pokemonList.appendChild(li);
	// 		});
	// 	};

	// 	searchInput.addEventListener("keyup", () => {
	// 		const searchTerm = searchInput.value.toLowerCase();

	// 		const filteredResults = filterData.results.filter((pokemon) =>
	// 			pokemon.name.includes(searchTerm)
	// 		);

	// 		showResults(filteredResults);
	// 	});

	// 	showResults(filterData.results);
	// };

	// pokemonFilter();
};

/*
 *-------------------- btn ------------------------
 */
const actualizarBotones = () => {
	btnLeft.addEventListener("click", async () => {
		document.getElementById("btnSound").play();
		--id;
		try {
			const resPokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
			const dataPokemon = await resPokemon.json();

			const resAbility = await fetch(`
				https://pokeapi.co/api/v2/ability/${id}`);
			const dataAbility = await resAbility.json();

			mostrarPokemon(dataPokemon);
			mostrarInfo(dataAbility);
		} catch (error) {
			console.log(error);
		}
	});
	btnRight.addEventListener("click", async () => {
		document.getElementById("btnSound").play();
		id++;
		try {
			const resPokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
			const dataPokemon = await resPokemon.json();

			// abilities
			const resAbility = await fetch(`
				https://pokeapi.co/api/v2/ability/${id}`);
			const dataAbility = await resAbility.json();

			mostrarPokemon(dataPokemon);
			mostrarInfo(dataAbility);
		} catch (error) {
			console.log(error);
		}
	});
};

/*
 *--------------------- format --------------------------
 */
function formatoCantidades(cantidad) {
	return (cantidad / 10).toFixed(1);
}
