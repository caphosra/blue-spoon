import { Client } from "pg";
import { IProblem, IProblemsDataBase } from "../@types/problems-db";
import { sqlClient } from "./sql-db";

export class ProblemSQLDataBase implements IProblemsDataBase {
    async add_problem(problem: IProblem): Promise<void> {
        await sqlClient.query(
            "INSERT INTO problems VALUES ($1, $2, $3, $4, $5, $6)",
            [problem.id, problem.bookID, problem.problemText, problem.answerText, problem.correct, problem.wrong]
        );
    }

    async remove_problem(id: number): Promise<void> {
        await sqlClient.query(
            "DELETE FROM problems WHERE id = $1",
            [id]
        );
    }

    async get_problem(bookID: number | null): Promise<IProblem[]> {
        if (bookID) {
            let result = await sqlClient.query(
                "SELECT * FROM problems WHERE bookID = $1",
                [bookID]
            );

            return result.rows
                .map((raw_problem) => raw_problem as IProblem);
        }
        else {
            let result = await sqlClient.query(
                "SELECT * FROM problems"
            );

            return result.rows
                .map((raw_problem) => raw_problem as IProblem);
        }
    }
}

let problemsDataBase = new ProblemSQLDataBase() as IProblemsDataBase;

export default problemsDataBase;
