async function loaded(){
    await fetch("https://rickandmortyapi.com/api/character?page=1")
    .then(res => res.json())
    .then(data => data.results)
    .then(data_f => localStorage.setItem("Characters", JSON.stringify(data_f)))
    .catch(() => false)
};

window.addEventListener("load", loaded, false);