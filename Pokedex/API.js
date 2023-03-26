document.addEventListener("DOMContentLoaded", () => {
	fetchData();
});

const fetchData = async () => {
	try {
		const res = await fetch("https://pokeapi.co/api/v2/pokemon/120");
		const data = await res.json();
		console.log(data);
		mostrarPokemon(data);
	} catch (error) {
		console.log(error);
	}
};

const mostrarPokemon = (data) => {
	/* main screen */
	const screenImg = document.getElementById("screen");
	const ImgTemplate = document.getElementById("screenImgTemplate").content;
	const screenFragment = document.createDocumentFragment();
	const cloneImg = ImgTemplate.cloneNode(true);
	cloneImg.querySelector("img").setAttribute("src", data.sprites.front_default);

	/* Info screen */
	const infoScreen = document.getElementById("info-screen");
	const infoTemplate = document.getElementById("infoScreenTemplate").content;
	const cloneInfo = infoTemplate.cloneNode(true);
	const infoFragment = document.createDocumentFragment();
	cloneInfo.getElementById("pokemonName").innerText = `Name: ${data.name}`;
	cloneInfo.getElementById(
		"pokemonType"
	).innerText = `Type: ${data.types[0].type.name}`;
	cloneInfo.getElementById("pokemonId").innerText = `Id: ${data.id}`;

	screenFragment.appendChild(cloneImg);
	screenImg.appendChild(screenFragment);

	infoFragment.appendChild(cloneInfo);
	infoScreen.appendChild(infoFragment);
};
