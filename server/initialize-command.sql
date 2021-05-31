CREATE TABLE problems (
    id int,
    bookID int,
    problemText text,
    answerText text,
    correct int,
    wrong int
);

CREATE TABLE books (
    bookID int,
    title text
);
