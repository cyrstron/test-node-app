const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT ?? 3000;

app.use(bodyParser.urlencoded());

const USERNAME = 'admin';
const PASSWORD = 'qwerty123';

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('login', {error: null});
});

app.post('/login', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    if (username !== USERNAME || password !== PASSWORD) {
        const err = new Error('Auth error!');
        err.status = 403;

        next(err);

        return;
    }

    res.render('page', { username });
});

app.use((err, req, res, next) => {
    res.status(err.status ?? 500);
    res.render('login', { error: err.message });
});


app.listen(port, () => {
  console.log(`App listening on port ${port}`)
});