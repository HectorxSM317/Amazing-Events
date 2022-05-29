let arrayEvents; //Info de la api
let currentDate; //fecha actual de la api
let pastEvents; //array de eventos pasados
let futureEvents; //array de eventos futuros
// ---tabla 1---//
let upperPercentage; //Evento con mayor porcentaje de asistencia
let lowerPercentaje; //Evento con menor porcentaje de asistencia
let eventlargerCapacity; //Evento con mayor capacidad
let tablaStatsEvent = document.getElementById("tablaStatsEvent") //Contenedor tabla1
// ---tabla 2 ---- //

let tablaStatsUp = document.getElementById("tablaStatsUp") //Contenedor tabla2
let eventsFutureCategories; //Array con las categorias de los eventos Futuros
let tableTwoData={ //Objeto al que le crearemos objetos dinamicos para pintar la tabla2
    estimate: {},
    capacity: {},
    gain: {}
}
//--- tabla3 ---//
let tablaStatsPast = document.getElementById("tablaStatsPast")
let eventsPastCategories;
let tableThreeData={
    assistance: {},
    capacity: {},
    gain: {}
}




getDataAPI().then(functionTable)


function functionTable() {
    //------Tabla1------------//
    pastEventPercentage()
    // console.log(eventosPasados)
    assistPorcentaje()
    getEventLargerCapacity()
    paintTableOne()
    //------Tabla2------------//
    
    getFutureCategories()
    createObjectsTableTwo()
    paintTableTwo()
    // console.log(tableTwoData)
    //----Tabla3----
    getPastCategories()
    createObjectsTableThree()
    console.log(tableTwoData.gain)
    paintTableThree()



}


