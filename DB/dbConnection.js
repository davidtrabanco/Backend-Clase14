import knex from "knex";

//Conexion a BD productos
export const dbProductsConnection = knex({
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      user: 'root',
      password: '',
      database: 'productos'
    },
    pool: { min: 0, max: 10 }
});

//Conexión a BD para chat (local)
export const dbChatConnection = knex({
    client: 'sqlite3',
    connection: {
      filename: './db/chat.sqlite',
    },
    useNullAsDefault: true
});