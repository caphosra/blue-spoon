export interface IProblem {
    id: number;
    bookID: number;
    problemText: string;
    answerText: string;
    correct: number;
    wrong: number;
}

export interface IProblemsDataBase {
    add_problem(problem: IProblem): Promise<void>;
    remove_problem(id: number): Promise<void>;
    get_problem(bookID: number | null): Promise<IProblem[]>;
}
