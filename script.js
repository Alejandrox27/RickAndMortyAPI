let id = 1;

async function loaded(){
    const button_next = document.getElementById("next");
    const button_before = document.getElementById("before");
    const button_start = document.getElementById("start");
    const button_final = document.getElementById("final");

    button_start.addEventListener("click", start, false)
    button_final.addEventListener("click", final, false)
    button_next.addEventListener("click", next, false)
    button_before.addEventListener("click", before, false)

    load_data(id)
}

const start = () => {
    const dinamic_cards = document.getElementById("dinamic-cards");

    dinamic_cards.textContent = "";

    id = 1;

    load_data(id)
}

const final = () => {
    const dinamic_cards = document.getElementById("dinamic-cards");

    dinamic_cards.textContent = "";

    id = 42;

    load_data(id)
}

const next = () => {
    const dinamic_cards = document.getElementById("dinamic-cards");

    dinamic_cards.textContent = "";

    id ++;

    if (id == 43){
        id --;
    }

    load_data(id)
}

const before = () => {
    const dinamic_cards = document.getElementById("dinamic-cards");

    dinamic_cards.textContent = "";

    id --;

    load_data(id)
}

async function load_data(id){
    try {
    loading_data(true);

    await fetch("https://rickandmortyapi.com/api/character?page=" + id)
    .then(res => res.json())
    .then(data => data.results)
    .then(data_f => localStorage.setItem("Characters", JSON.stringify(data_f)))
    .catch(() => false)
    } catch (error){
        console.log(error);
    } finally {
        showCharacters();
        loading_data(false);
    }
};

async function showCharacters(){
    if (localStorage.getItem("Characters")){
        const characters = JSON.parse(localStorage.getItem("Characters"))
        const dinamic_cards = document.getElementById("dinamic-cards");

        let template = "";
        for (let character of characters){
            
            template += `
            <article class="col-12 col-md-6 col-lg-3 mb-3">
                <div class="card text-center shadow">
                    <img src="${character.image}" alt="" class="card-img-top">
                    <div class="card-body">
                        <h5 class="card-title text-primary lead">${character.name}</h5>
                        <p class="lead text-secondary">${character.species}</p>
                    </div>
                </div>
            </article>
            `

        }

        dinamic_cards.innerHTML = template;
    }
}

const loading_data = (bool) => {
    const loading = document.getElementById("loading");
    
    if (bool){
        loading.classList.remove("d-none");
    } else {
        loading.classList.add("d-none");
    }
}


window.addEventListener("load", loaded, false);