const pokedexOpen = document.getElementById("open");
const modal = document.getElementById("modal");
const modalBtn = document.getElementById("modal-btn");
const welcome = document.getElementById("welcome");
const screenPokemon = document.getElementById("screen");
const screenPokemonContent = document.getElementById("screen-content");

const miniDisplay = document.getElementById("mini-display");
const infoScreen = document.getElementById("info-screen");
const infoContent = document.getElementById("info-content");
const buttonOn = document.getElementById("on");
const boxAnimation = document.querySelectorAll(".box-animation");
const TurnOnSound = document.getElementById("TurnOnSound");

modalBtn.addEventListener("click", () => {
	modal.classList.add("out");
	welcome.classList.add("out");
	pokedexOpen.classList.add("active");
	document.getElementById("principalSound").play();
});
buttonOn.addEventListener("click", () => {
	TurnOnSound.play();
	buttonOn.classList.toggle("active");
	screenPokemon.classList.toggle("active");
	screenPokemonContent.classList.toggle("active");
	miniDisplay.classList.toggle("active");
	infoScreen.classList.toggle("active");
	infoContent.classList.toggle("active");
	boxAnimation.forEach((box) => {
		box.classList.toggle("animacion-active");
	});
});

/* ------------------------------------------- */
