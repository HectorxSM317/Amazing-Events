let arrayEvents = [];

getDataAPI().then(getData)

function getData() {
    var id = location.search.split("?id=")[1]
    console.log(id)
    console.log(id)
    var evento = arrayEvents.find(evento => evento._id == id)
    console.log(evento)

    document.getElementById("containerDetails").innerHTML =
        `
                <div class="row">
                    <h5 class="card-title col-md-12 text-center mt-4 mb-lg-3 titulodetails m-0 fs-1 fw-bold text-decoration-underline">${evento.name}</h5>
                    <div class="d-flex col-md-5 justify-content-center align-items-center">
                        <img class="imgdetail img-thumbnail ms-md-5" src=${evento.image} alt="concierto"> 
                    </div>
                    <div class="col-md-7 text-center my-2 pb-lg-4">
                        <div class="card-body align-items-center row m-0 p-0 d-flex flex-column gap-2 gap-lg-1">
                            <p class="card-text m-0 col-lg-5 order-0 order-md-1"><b>Date</b>: ${evento.date}</p>
                            <p class="card-text m-0 order-1 order-md-0 w-75"><b>Description</b>: ${evento.description}</p>
                            <p class="card-text m-0 col-lg-5 order-2"><b>Category</b>: ${evento.category}</p>
                            <p class="card-text m-0 col-lg-5 order-3"><b>place</b>: ${evento.place}</p>
                            <p class="card-text m-0 order-4"><b>Capacity</b>: ${evento.capacity}  </p>
                            <p class="card-text m-0 order-5 mb-2"><b>Price</b>: ${evento.price} USD </p>
                        </div>
                    </div>
                </div>
                `

}