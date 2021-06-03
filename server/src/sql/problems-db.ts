import { Client } from "pg";
import { IProblem, IProblemsDataBase } from "../@types/problems-db";

export class ProblemSQLDataBase implements IProblemsDataBase {
    private client: Client;

    constructor() {
        if (process.env.DATABASE_URL) {
            this.client = new Client({
                connectionString: process.env.DATABASE_URL,
                ssl: {
                    rejectUnauthorized: false
                }
            });
            this.client.connect()
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
    }

    async add_problem(problem: IProblem): Promise<void> {
        await this.client.query(
            "INSERT INTO problems VALUES ($1, $2, $3, $4, $5, $6)",
            [problem.id, problem.bookID, problem.problemText, problem.answerText, problem.correct, problem.wrong]
        );
    }

    async remove_problem(id: number): Promise<void> {
        await this.client.query(
            "DELETE FROM problems WHERE id = $1",
            [id]
        );
    }

    async get_problem(bookID: number | null): Promise<IProblem[]> {
        if (bookID) {
            let result = await this.client.query(
                "SELECT * FROM problems WHERE bookID = $1",
                [bookID]
            );

            return result.rows
                .map((raw_problem) => raw_problem as IProblem);
        }
        else {
            let result = await this.client.query(
                "SELECT * FROM problems"
            );

            return result.rows
                .map((raw_problem) => raw_problem as IProblem);
        }
    }
}

let problemsDataBase = new ProblemSQLDataBase() as IProblemsDataBase;

export default problemsDataBase;
