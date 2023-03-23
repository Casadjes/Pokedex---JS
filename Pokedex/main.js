window.addEventListener("load", () => {
	pokedexOpen.classList.add("active");
});
const pokedexOpen = document.getElementById("open");

const screenPokemon = document.getElementById("screen");
const miniDisplay = document.getElementById("mini-display");
const infoScreen = document.getElementById("info-screen");
const buttonOn = document.getElementById("on");

buttonOn.addEventListener("click", () => {
	buttonOn.classList.toggle("active");
	screenPokemon.classList.toggle("active");
	miniDisplay.classList.toggle("active");
	infoScreen.classList.toggle("active");
});
