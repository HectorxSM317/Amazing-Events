async function getDataAPI() {
    let dataAPI = await (await fetch("https://amazing-events.herokuapp.com/api/events")).json()
    // console.log(dataAPI)
    arrayEvents = dataAPI.events;
    // console.log(arrayEventos)
    currentDate = dataAPI.currentDate;



}
//----Funcion para crear una propiedad porcentaje en los eventos pasados-----//
function pastEventPercentage() {
    pastEvents = arrayEvents.filter(evento => evento.date < currentDate)

    pastEvents.map(evento => evento.perceAssist = ((evento.assistance * 100) / evento.capacity).toFixed(2))
    // console.log(pastEvents);
    return pastEvents

}
//----Funcion para calcular el mayor y menor porcentaje de asistencia de eventos----//
function assistPorcentaje() {
    let arrayAssist = pastEvents.map(evento => evento.perceAssist);
    // console.log(arrayAssist);
    let assistSort = arrayAssist.sort((a, b) => b - a)
    // console.log(assistSort);

    upperPercentage = pastEvents.filter(evento => evento.perceAssist == assistSort[0])
    // console.log(upperPercentage);
    lowerPercentaje = pastEvents.filter(evento => evento.perceAssist == assistSort[assistSort.length - 1])
    // console.log(lowerPercentaje);
}
//---Funcion para para busca el evento con mayor capacidad----//
function getEventLargerCapacity() {
    let eventsCapacity = pastEvents.map(evento => evento.capacity) //Creo un array solo con las capacidades de los eventos
    eventsCapacity = eventsCapacity.map(capacity => Number(capacity)).sort((a, b) => b - a) //transformamos a numeros y ordenamos de mayor a menor
    eventlargerCapacity = pastEvents.filter(evento => evento.capacity == eventsCapacity[0])

}
//---Funcion que pinta la tabla 1 de eventos----//
function paintTableOne() {
    tablaStatsEvent.innerHTML =
        `
    <td class="bordethead">${upperPercentage[0].name} (${upperPercentage[0].perceAssist}%)</td>
    <td class="bordethead">${lowerPercentaje[0].name} (${lowerPercentaje[0].perceAssist}%)</td>
    <td class="bordethead">${eventlargerCapacity[0].name} (capacity: ${eventlargerCapacity[0].capacity})</td>`
}

//Tabla 2

function getFutureCategories() {
    futureEvents = arrayEvents.filter(evento => evento.date > currentDate)
    eventsFutureCategories = [...new Set(futureEvents.map(ev => ev.category))]
    // console.log(catEvUp)
    return eventsFutureCategories
}

function createObjectsTableTwo() {
    futureEvents.forEach(ev => { //Voy a recorrer los eventos para crear un objeto con 3 objetos dentro, apartir del principal
        //----- en el objeto estimate (que pertenece al objeto tabladosdata) se encuentra el estimado por categoria
        tableTwoData.estimate[ev.category] = tableTwoData.estimate[ev.category] ?
            tableTwoData.estimate[ev.category] + Number(ev.estimate) : Number(ev.estimate)
        //----- en el objeto capacity (que pertenece al objeto tabladosdata) se encuentra la capacidad maxima por categoria
        tableTwoData.capacity[ev.category] = tableTwoData.capacity[ev.category] ?
            tableTwoData.capacity[ev.category] + Number(ev.capacity) : Number(ev.capacity)
        //----- en el objeto gain (que pertenece al objeto tabladosdata) se calcula la ganancia multiplicando el precio por el estimado
        tableTwoData.gain[ev.category] = tableTwoData.gain[ev.category] ?
            tableTwoData.gain[ev.category] + ev.price * Number(ev.estimate) : ev.price * Number(ev.estimate)

    })
    // console.log(tableTwoData)
}

function paintTableTwo() {
    tablaStatsUp.innerHTML = ""
    eventsFutureCategories.forEach(cat => {
        tablaStatsUp.innerHTML +=
            `
        <tr>
            <td class="bordethead">${cat}</td>
            <td class="bordethead">$${tableTwoData.gain[cat]}</td>
            <td class="bordethead">${((100 * tableTwoData.estimate[cat]) / tableTwoData.capacity[cat]).toFixed(2)} %</td>
        </tr>
        `
    })

}

//tabla 3

function getPastCategories() {
    eventsPastCategories = [...new Set(pastEvents.map(ev => ev.category))]
    console.log(eventsPastCategories)
}

function createObjectsTableThree() {
    console.log(pastEvents)
    pastEvents.forEach(ev => {
        tableThreeData.assistance[ev.category] = tableThreeData.assistance[ev.category] ?
            tableThreeData.assistance[ev.category] + Number(ev.assistance) :  Number(ev.assistance)
        tableThreeData.capacity[ev.category] = tableThreeData.capacity[ev.category] ?
            tableThreeData.capacity[ev.category] + Number(ev.capacity) :  Number(ev.capacity)
        tableThreeData.gain[ev.category] = tableThreeData.gain[ev.category] ?
            tableThreeData.gain[ev.category] + ev.price * Number(ev.assistance) : ev.price * Number(ev.assistance)
    })
}

function paintTableThree(){
    tablaStatsPast.innerHTML = ""
    eventsPastCategories.forEach(cat => {
        tablaStatsPast.innerHTML +=
        `
        <tr>
            <td class="bordethead">${cat}</td>
            <td class="bordethead">$ ${tableThreeData.gain[cat]} </td>
            <td class="bordethead">${((100 * tableThreeData.assistance[cat]) / tableThreeData.capacity[cat]).toFixed(2)} %</td>
        </tr>
        `



    })
}