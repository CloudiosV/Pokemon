const pokedex = document.querySelector('#pokedex');
const modal = document.querySelector('.modal');
const modalImage = document.querySelector('.modal-image');
const modalName = document.querySelector('.modal-name');
const modalDescription = document.querySelector('.modal-description');
const modalClose = document.querySelector('.modal-close');

const APIURL = "https://pokeapi.co/api/v2/pokemon";
const totalPokemon = 148;