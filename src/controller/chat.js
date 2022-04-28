import TableManager from "./dbManager.js";
import {dbChatConnection} from "../../DB/dbConnection.js";


//Agrego las tablas que usaré
const tableStructure = (table) => {
    table.increments('id').primary();
    table.string('email', 50);
    table.string('message');
    table.string('date');
}

//creo la tabla productos en variable
export const tableChat = new TableManager(dbChatConnection,'chat',tableStructure);

//si no existe en BD la creo:
tableChat.createTableIfNotExists();

