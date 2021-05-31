import { Client } from "pg";
import { IProblem, IProblemsDataBase } from "./@types/problems-db";

export class ProblemSQLDataBase implements IProblemsDataBase {
    private client: Client;

    constructor() {
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

    async add_problem(problem: IProblem): Promise<void> {
        await this.client.query(
            "INSERT INTO problems VALUES ($1, $2, $3, $4, $5, $6)",
            [problem.id, problem.bookID, problem.problemText, problem.answerText, problem.correct, problem.wrong]
        );
    }

    async remove_problem(id: number): Promise<void> {
        throw "No implementation.";
    }

    async get_problem(bookID: number | null): Promise<IProblem[]> {
        return [];
    }
}

let problemsSQLDataBase = new ProblemSQLDataBase() as IProblemsDataBase;

export default problemsSQLDataBase;
