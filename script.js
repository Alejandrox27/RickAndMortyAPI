async function loaded(id = 1){
    await fetch("https://rickandmortyapi.com/api/character?page=" + id)
    .then(res => res.json())
    .then(data => data.results)
    .then(data_f => localStorage.setItem("Characters", JSON.stringify(data_f)))
    .catch(() => false)

    showCharacters()
};

async function showCharacters(){
    if (localStorage.getItem("Characters")){
        const characters = JSON.parse(localStorage.getItem("Characters"))
        const dinamic_cards = document.getElementById("dinamic-cards");

        const fragment = document.createDocumentFragment()

        for (let character of characters){
            const copy = document.getElementById("card-template").content.firstElementChild.cloneNode(true);

            const img = copy.getElementsByTagName("img")[0];
            img.setAttribute("src", character.image);

            const name = copy.getElementsByTagName("h5")[0];
            name.textContent = character.name;

            const specie = copy.getElementsByTagName("p")[0];
            specie.textContent = character.species;

            fragment.appendChild(copy)
        }

        dinamic_cards.appendChild(fragment);
    }
}


window.addEventListener("load", loaded, false);