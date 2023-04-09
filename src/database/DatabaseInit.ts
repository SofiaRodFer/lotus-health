import * as SQLite from 'expo-sqlite';

export const DatabaseConnection = {
    getConnection: () => SQLite.openDatabase("database.db"),
};

let db: SQLite.WebSQLDatabase
export default class DatabaseInit {
    constructor() {
        db = DatabaseConnection.getConnection()
        db.exec([{ sql: 'PRAGMA foreign_keys = ON;', args: [] }], false, () =>
            console.log('Foreign keys turned on')
        );
        // this.CloseDb()
        // this.DropDb()
        this.InitDb()
    }

    InitDb() {
        var sql = [
            `CREATE TABLE IF NOT EXISTS Foods (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            health_score INTEGER
            );`,
            `CREATE TABLE IF NOT EXISTS Meals (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            type TEXT,
            date_meal TEXT,
            avg_health_score INTEGER
            );`,
            `CREATE TABLE IF NOT EXISTS FoodInMeal (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            meal_id INTEGER REFERENCES Meals(id),
            food_id INTEGER REFERENCES Foods(id)
            );`,
        ];

        db.transaction(
            tx => {
                for (var i = 0; i < sql.length; i++) {
                    console.log("execute sql : " + sql[i]);
                    tx.executeSql(sql[i]);
                }
            }, (error) => {
                console.log("error call back : " + JSON.stringify(error));
                console.log(error);
            }, () => {
                console.log("transaction complete call back ");
            }
        );
    }

    CloseDb() {
        db.closeAsync()
    }

    DropDb() {
        db.deleteAsync()
    }

}