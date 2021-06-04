import { Client } from "pg";

let client: Client;

if (process.env.DATABASE_URL) {
    client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    });
    client.connect()
        .then(() => {
            console.log("SQL server connected.");
        })
        .catch((err) => {
            console.error(`Failed to connect to the SQL server with the error message: "${err}"`)
        });
}
else {
    throw "Failed to find a database.";
}

export let sqlClient: Client = client;
