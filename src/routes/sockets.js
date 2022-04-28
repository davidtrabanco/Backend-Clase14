import {controller} from "../controller/main.js";

export const initWebSocket = (io) =>{

    let chatBuffer = [];

    io.on('connection', async (socket) =>{
        
        //Cargo el historial del chat en BD: 
        socket.emit('chatHistoric', await controller.loadChat()) //Envío historial de chat
    
        //Cargo los productos en BD 
        socket.emit('products', await controller.getAllProducts()) //Envío Productos
        
        //PRODUCTOS------------------------------------------------
        //Nuevo producto
        socket.on('newProduct', async (product) => {
            await controller.addProduct(product);//guardo el producto
            io.sockets.emit('products', await controller.getAllProducts()) //Envío la lista actualizada a todas las conexiones
        })

        //Filtro de productos
        socket.on('filterProduct', async (params) => {
            const filteredProducts = await controller.getFilteredProducts(params)
            socket.emit('products', await filteredProducts) 
        })

        //BORRAR Filtro de productos
        socket.on('deleteFilteredProd', async (params) => {
            await controller.delFilteredProducts(params);
            socket.emit('products', await controller.getAllProducts()) //Envío Productos
        })
        

        //CHAT-------------------------------------------
        //llega nuevo mensaje
        socket.on('newMessage', obMessage=>{
            //Agrego fecha y hora:
            obMessage.date = `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`
    
            //Guardo en memoria:
            chatBuffer.push(obMessage);
            controller.saveChat(obMessage);
    
            //Envío a todas las conexiones:
            io.sockets.emit('newMessage', [obMessage])
        })
    });
} 