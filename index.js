const express = require('express');
const app = express();
const morgan = require('morgan');
const AppError = require('./AppError');

/** Set Middleware */
app.use(morgan('tiny'));

const verifyPassword = (req, res, next) => {
    const { password } = req.query;
    if (password === 'xxx') {
        next();
    }
    /*  res.send("SORRY, NEED A PASSWORD BRO!"); */

    throw new AppError('password required', 401);
}

/** End Middleware */

app.get('/', (req, res) => {
    res.send("Home Page");
})

app.get('/dogs', (req, res) => {
    /*     res.send("Woof Woof");
     */
    chicken.fly();
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

/*************
 * Error Handling.
 *************/
/* app.use((err, req, res, next) => {
    console.log("ERROR &***************************");
    console.log(err);
    next(err);
}) */
app.use((err, req, res, next) => {
    const { status = 500, message = 'Something went wrong' } = err;
    res.status(status).send(message);

})

app.listen(3000, () => {
    console.log("App is now running on localhost:3000");
})