const express = require('express');
const app = express();
const morgan = require('morgan');

/** Set Middleware */
app.use(morgan('tiny'));

const verifyPassword = (req, res, next) => {
    const { password } = req.query;
    if (password === 'xxx') {
        next();
    }
    res.send("SORRY, NEED A PASSWORD BRO!");
}

/** End Middleware */

app.get('/', (req, res) => {
    res.send("Home Page");
})

app.get('/dogs', (req, res) => {
    res.send("Woof Woof");
})

app.get('/secret', verifyPassword, (req, res) => {
    res.send("Secret: I see dead people.");
})



/**
 * 404 -- not found
 */
app.use((req, res) => {
    res.status(404).send('Not Found');
})

app.listen(3000, () => {
    console.log("App is now running on localhost:3000");
})