import express from "express";
import problemsSQLDataBase from "./sql-db";

const app = express();

const PORT = process.env.PORT || 314;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const router = express.Router();

router.get('/', (_, res) => {
    problemsSQLDataBase.add_problem({ id: 0, bookID: 0, problemText: "'Flash'", answerText: "'Star'", correct: 0, wrong: 0 })
        .then(() => {
            res.send("Hello World");
        })
        .catch((err) => {
            console.error(err);
        });
});

app.use(router);
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
