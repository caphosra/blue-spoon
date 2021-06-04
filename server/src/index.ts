import express from "express";
import { IProblem } from "./@types/problems-db";
import problemsDataBase from "./sql/problems-db";

const app = express();

const PORT = process.env.PORT || 314;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const router = express.Router();

router.get('/', (_, res) => {
    res.redirect("https://github.com/capra314cabra/blue-spoon");
});

router.post("/api/v1/problems/add", (req, res) => {
    try {
        let parsed = JSON.parse(req.body) as IProblem;
        problemsDataBase.add_problem(parsed)
            .then(() => { })
            .catch((err) => {
                console.error(err);
            });
    }
    catch (err) {
        res.send("Failed to parse a JSON given.")
    }
});

router.get("/api/v1/problems/get", (req, res) => {
    problemsDataBase.get_problem(null)
        .then((problems) => {
            res.send(JSON.stringify(problems));
        })
        .catch((err) => {
            console.error(err);
        });
});

app.use(router);

app.use((_, res) => {
    res.redirect("/");
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
