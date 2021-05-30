import express from "express";

const app = express();

const PORT = process.env.PORT || 314;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const router = express.Router();
router.get('/', (_, res) => res.send("Hello World!"));
app.use(router);

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
