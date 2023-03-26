const btnLeft = document.querySelector(".controls .arrows .arrow-left");
const btnRight = document.querySelector(".controls .arrows .arrow-right");
let id = 0;

document.addEventListener("DOMContentLoaded", () => {
	fetchData();
});

const fetchData = async () => {
	try {
		const res = await fetch("https://pokeapi.co/api/v2/pokemon/" + (id + 1));
		const data = await res.json();
		console.log(data);
		mostrarPokemon(data);
		actualizarBotones();
	} catch (error) {
		console.log(error);
	}
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
	).innerText = `Weight: ${formatoKilogramos(data.weight)}`;

	screenImg.innerText = "";
	screenFragment.appendChild(cloneImg);
	screenImg.appendChild(screenFragment);

	infoScreen.innerText = "";
	infoFragment.appendChild(cloneInfo);
	infoScreen.appendChild(infoFragment);
};

const actualizarBotones = () => {
	btnLeft.addEventListener("click", async () => {
		document.getElementById("btnSound").play();
		--id;
		try {
			const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
			const data = await res.json();
			mostrarPokemon(data);
		} catch (error) {
			console.log(error);
		}
	});
	btnRight.addEventListener("click", async () => {
		document.getElementById("btnSound").play();
		id++;
		try {
			const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
			const data = await res.json();
			mostrarPokemon(data);
		} catch (error) {
			console.log(error);
		}
	});
};

/* -------------------- API ------------------------ */

function formatoKilogramos(kilogramos) {
	return (kilogramos / 10).toFixed(1) + "Kg";
}
