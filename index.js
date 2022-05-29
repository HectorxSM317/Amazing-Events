let arrayEvents = []; //Array de eventos de la api
let searchWord = ""; //Variable vacia donde se almacenan los valores de las teclas pulsadas
let checkBoxChecked = []; //Array vacio para guardar los valores de los checkbox chequed
let arrayPaintCards; //array filtrado listo para pintar

// console.log(arrayEventos)


getDataAPI().then(mainInit) //Hasta que no esté lista la info de la api, la funcion siguiente no se ejecutará

function mainInit() { //Esta funcion se ejecutará despues de obtener los datos de la api

    createCheckBox() //Llamado funcion crear Checkbox

    let checkBoxs = document.querySelectorAll(".category") //contenedor de los checkbox
    // console.log(checkBoxs)

    //CAPTURAR DATOS DE CHECKBOX
    checkBoxs.forEach(checkBox => checkBox.addEventListener("click", eventClick => {
        // console.log(eventClick)
        if (eventClick.target.checked) {
            checkBoxChecked.push(eventClick.target.value)
        } else {
            checkBoxChecked = checkBoxChecked.filter(categoryCheckBox => categoryCheckBox !== eventClick.target.value)
        }
        let arrayPaintCards = FilterCards()
        // console.log(arrayPaintCards)
        paintCards(arrayPaintCards)
    }))

    arrayPaintCards = FilterCards() //Guardar retorno de la funcion de filtrar en una variable
    paintCards(arrayPaintCards)//Llamado a la funcion pintar cartas con el array a pintar como parametro
}

//PINTAR TARJETAS
function paintCards(arrayDatos) {
    let containerCard = document.getElementById("containerCard")
    containerCard.innerHTML = "";
    if (arrayDatos != 0) {
        arrayDatos.forEach(evento => {
            containerCard.innerHTML +=
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
        })
    } else {
        containerCard.innerHTML = `<p class="text-center mt-5">No existen coincidencias</p>`
    }

}

//CREAR CHECKBOX
function createCheckBox() {
    let containerCheck = document.getElementById("containerCheck");
    let arrayCategory = arrayEvents.map(evento => evento.category);
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
search.addEventListener("keyup", eventKey => {
    searchWord = eventKey.target.value
    let cardsPintar = FilterCards()
    paintCards(cardsPintar)
})

//Funcion filtrado
function FilterCards() {
    let cards = []
    if (checkBoxChecked.length > 0 && searchWord !== "") {
        checkBoxChecked.forEach(category => {
            cards.push(...arrayEvents.filter(evento => evento.name.toLowerCase().includes(searchWord.trim().toLowerCase()) && evento.category == category))
            console.log(cards)
        })
    } else if (checkBoxChecked.length > 0 && searchWord === "") {
        checkBoxChecked.forEach(category =>
            cards.push(...arrayEvents.filter(evento => evento.category == category)))
    } else if (checkBoxChecked.length == 0 && searchWord !== "") {
        cards.push(...arrayEvents.filter(evento => evento.name.toLowerCase().includes(searchWord.trim().toLowerCase())))
    } else {
        cards.push(...arrayEvents)
    }
    return cards
}