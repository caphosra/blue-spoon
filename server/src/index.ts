import express from "express";
import quizSets from "./quiz-sets";

const app = express();

const PORT = process.env.PORT || 314;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const router = express.Router();

router.get('/', async (req, res) => {
    if (req.query.id) {
        let id = parseInt(req.query.id as string);
        let quiz = await quizSets.get_quiz(id);
        let result = quiz
            .map((val) => `${val.ProblemText}, ${val.AnswerText}`)
            .join("\n");
        res.send(result);
    }
    else {
        res.send("Please give me an id.")
    }
});

app.use(router);
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
