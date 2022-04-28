
export default class TableManager{
    constructor(knexConection, tableName, structure) {
        this.dbKnex = knexConection;
        this.tableName = tableName;
        this.structure = structure;
    }

    createTableIfNotExists = async ()=> {
        const exists = await this.dbKnex.hasTable(this.tableName)
        if(exists){
            console.log();
        }

    }

    initTable = async() => {
        try {
            await this.dbKnex.schema.dropTableIfExists(this.tableName)
            .finally(()=>{ return this.createTable() })
        } catch (error) {
            console.error(`Drop Table ERROR: ${error}`)
        }
    }

    createTable = async()=>{
        try {
            await this.dbKnex.schema.createTable(this.tableName,this.structure)
            console.log(`Table: ${this.tableName} was created successfully`)
            //this.dbKnex.destroy()
            return null;
        } catch (error) {
            console.error(`Create Table ERROR: ${error}`)
        }
    }

    insertRecord = async( object )=>{
        try {
            await this.dbKnex(this.tableName).insert(object)
            console.log(`Row was inserted into Table:${this.tableName}`)
            //this.dbKnex.destroy()
            return null;
        } catch (error) {
            console.error(`Insert a record into Table ERROR: ${error}`)
        }
    }

    retrieveAllRecords = async ()=>{
        try {
            const records = await this.dbKnex.from(this.tableName).select('*');
            //this.dbKnex.destroy()
            return Object.values(JSON.parse(JSON.stringify(records)));
        } catch (error) {
            console.error(`Retrieve All Records ERROR: ${error}`)
        }
    }

    retrieveFilterRecords = async (field, comparison, value)=>{
        try {
            const records = await this.dbKnex.from(this.tableName).where(field,comparison, value);
            //this.dbKnex.destroy()
            return Object.values(JSON.parse(JSON.stringify(records)));
        } catch (error) {
            console.error(`Retrieve All Records ERROR: ${error}`)
        }
    }
    
    deleteFilterRecords = async (field, comparison, value)=>{
        try {
            await this.dbKnex.from(this.tableName).where(field,comparison, value).del();
            console.log(`Row where ${field}${comparison}${value} was delete from Table:${this.tableName}`);
            //this.dbKnex.destroy();
            return null;
        } catch (error) {
            console.error(`Delete a record into Table ERROR: ${error}`)
        }
    }
    
    updateRedord = async (newObject, field, comparison, value)=> {
        try {
            await this.dbKnex.from(this.tableName).where(field,comparison, value).update(newObject);
            console.log(`Row where ${field}${comparison}${value} was updated in Table:${this.tableName}`)
            //this.dbKnex.destroy()
            return null;
        } catch (error) {
            console.error(`Update a record into Table ERROR: ${error}`)
        }
    }
}

