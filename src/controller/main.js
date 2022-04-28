import {tableProducts} from "./products.js";
import {tableChat} from "./chat.js";

export const controller = {};

//PRODUCTOS----------------------------------------------------------
controller.getAllProducts = async ()=>{
    const products = await tableProducts.retrieveAllRecords() ;
    return {
            productsList: products,
            listExists: true,
            };
}

controller.addProduct = async (product)=>{
    return await tableProducts.insertRecord(product);
}

controller.getFilteredProducts = async (params) =>{
    const filteredProd =  await tableProducts.retrieveFilterRecords(params.field, params.comparison, params.value)
    return {
            productsList: filteredProd,
            listExists: true,
            };
}

controller.delFilteredProducts = async (params) =>{
    await tableProducts.deleteFilterRecords(params.field, params.comparison, params.value);
    return true;
}

//CHAT----------------------------------------------------
controller.saveChat = async (obMessage) =>{
    //guardo el chat completo
    tableChat.insertRecord(obMessage);
}

controller.loadChat = async () => {
    return await tableChat.retrieveAllRecords();
}
