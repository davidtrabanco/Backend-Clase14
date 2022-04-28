import {socket} from "./index.js";


//Evento botón ver filtro:
document.querySelector('#filterProducts').addEventListener('submit', (e)=>{
    e.preventDefault();
    //creo el objecto con el nuevo producto
    const filterParams = {
        field: document.getElementById("fField").value,
        comparison: document.getElementById("fComparison").value,
        value: document.getElementById("fValue").value,
    }
    socket.emit('filterProduct', filterParams)//envío al servidor
})

//Evento botón BORRAR filtro:
document.querySelector('.bttnDelFilterProd').addEventListener('click', (e)=>{
    e.preventDefault();
    //creo el objecto con el nuevo producto
    if(confirm('Se eliminaran los productos filtrados')){
        const filterParams = {
            field: document.getElementById("fField").value,
            comparison: document.getElementById("fComparison").value,
            value: document.getElementById("fValue").value,
        }
        socket.emit('deleteFilteredProd', filterParams)//envío al servidor
    }
});



