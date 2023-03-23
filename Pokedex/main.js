const pokedexOpen = document.getElementById("open");
const modal = document.getElementById("modal");
const modalBtn = document.getElementById("modal-btn");
const welcome = document.getElementById("welcome");
const screenPokemon = document.getElementById("screen");
const miniDisplay = document.getElementById("mini-display");
const infoScreen = document.getElementById("info-screen");
const buttonOn = document.getElementById("on");

modalBtn.addEventListener("click", () => {
	modal.classList.add("out");
	welcome.classList.add("out");
	pokedexOpen.classList.add("active");
});
buttonOn.addEventListener("click", () => {
	buttonOn.classList.toggle("active");
	screenPokemon.classList.toggle("active");
	miniDisplay.classList.toggle("active");
	infoScreen.classList.toggle("active");
});
