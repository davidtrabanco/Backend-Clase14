import TableManager from "./dbManager.js";
import {dbProductsConnection} from "../../DB/dbConnection.js";

//Defino la estructura de la tabla:
const tableStructure = (table) => {
    table.increments('id').primary();
    table.string('title', 50).notNullable();
    table.float('price').notNullable();
    table.string('thumbnail');
}

//creo la tabla productos
export const tableProducts = new TableManager(dbProductsConnection,'products',tableStructure);

//Si la tabla no existe la creo:
tableProducts.createTableIfNotExists();

