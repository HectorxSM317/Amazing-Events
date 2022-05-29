let arrayEvents = []; //Guardo en una variable la informacion de mazingevents.js
let currentDate = ""; //traigo la fecha actual
let eventosUp = [];
let checkBoxChecked = [];
let searchWord = "";
console.log(arrayEvents)

getDataAPI().then(mainUpcomingInit)

function mainUpcomingInit() {
    eventosUp = arrayEvents.filter(evento => evento.date > currentDate)
    console.log(eventosUp);
    createCheckBox()
    
//CAPTURAR DATOS DE CHECKBOX
    let checkBoxs = document.querySelectorAll(".category")
    // console.log(checkBoxs)
    checkBoxs.forEach(checkBox => checkBox.addEventListener("click", eventoClick => {
        // console.log(eventoClick)
        if (eventoClick.target.checked) {
            checkBoxChecked.push(eventoClick.target.value)
        } else {
            checkBoxChecked = checkBoxChecked.filter(categoryCheckBox => categoryCheckBox !== eventoClick.target.value)
        }
        let cardsPintar = FilterCards()
        paintCards(cardsPintar)
    }))

    let cardsPintar = FilterCards()
    paintCards(cardsPintar)
}

function paintCards(arrayDatos) {
    let containerCardUp = document.getElementById("containerCardUp");
    containerCardUp.innerHTML = "";
    if (arrayDatos.length != 0) {
        arrayDatos.forEach(evento => {
            if (evento.date > currentDate) {
                containerCardUp.innerHTML +=
                    `<div class="col-12 col-md-4 card align-items-center shadow-lg widthCard">
                        <div class="loguito"><img src="./docs/captura.PNG" alt="loguito"></div>
                        <img class="w-100 mt-3" src=${evento.image} alt="concierto" height="140">
                        <div class="card-body d-flex px-0 flex-column align-items-center">
                            <h5 class="fonttitulocard fs-3 fw-bold text-decoration-underline">${evento.name}</h5>
                            <p class="fst-italic">${"Place: " + evento.place}</p>
                            <a class="btn botonvermas" href="./details.html?id=${evento._id}" target="_blank">View more</a>
                            <p><b>Date: </b>${evento.date}</p>
                            <p class="card-footer m-0"><b>Price: </b>${evento.price} USD</p>
                        </div>
                    </div>
                    `
            }
        })
    } else {
        containerCardUp.innerHTML = `<p class="text-center mt-5">No existen coincidencias</p>`
    }
}

//CREAR CHECKBOX
function createCheckBox() {
    let containerCheck = document.getElementById("containerCheckUp");
    let arrayCategory = eventosUp.map(evento => evento.category);
    arrayCategory = new Set(arrayCategory);
    // console.log(arrayCategory)
    let filterCategory = [...arrayCategory]
    // console.log(filterCategory)
    filterCategory.forEach(category => {
        containerCheck.innerHTML +=
            `
    <label class="form-check-label col-6 col-md-4 col-lg-4">
    <input class="category col-md-3" value="${category}" type="checkbox">${category}
    </label>
    `
    })
}

//BUSQUEDA POR SEARCH

let search = document.getElementById("search");
search.addEventListener("keyup", eventoTecla => {
    searchWord = eventoTecla.target.value
    let cardsPintar = FilterCards()
    paintCards(cardsPintar)
})

function FilterCards() {
    let cards = []
    if (checkBoxChecked.length > 0 && searchWord !== "") {
        checkBoxChecked.forEach(category => {
            cards.push(...eventosUp.filter(evento => evento.name.toLowerCase().includes(searchWord.trim().toLowerCase()) && evento.category == category))
            console.log(cards)
        })
    } else if (checkBoxChecked.length > 0 && searchWord === "") {
        checkBoxChecked.forEach(category =>
            cards.push(...eventosUp.filter(evento => evento.category == category)))

    } else if (checkBoxChecked.length == 0 && searchWord !== "") {
        cards.push(...eventosUp.filter(evento => evento.name.toLowerCase().includes(searchWord.trim().toLowerCase())))
    } else {
        cards.push(...eventosUp)
    }
    return cards
}