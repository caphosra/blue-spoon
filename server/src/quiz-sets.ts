import { Client } from "pg";

export interface Problems {
    SourceID: number,
    ProblemText: string,
    AnswerText: string,
    Correct: number,
    Wrong: number
}

export class QuizSets {
    private client: Client;

    constructor() {
        this.client = new Client({
            connectionString: process.env.DATABASE_URL,
            ssl: {
                rejectUnauthorized: false
            }
        });

        this.client.connect();
    }

    async add_quiz(id: number, problem: string, answer: string) {
        await this.client
            .query(`INSERT INTO problems VALUES (${id}, '${problem}', '${answer}', 0, 0);`);
    }

    async get_quiz(id: number): Promise<Problems[]> {
        let result = await this.client
            .query("SELECT * FROM problems;");

        let quiz = [];
        for (let raw_row of result.rows) {
            let row = raw_row as Problems;

            if (row.SourceID == id) {
                quiz.push(row);
            }
        }
        return quiz;
    }
}

let quizSets = new QuizSets();

export default quizSets;
