const fs = require('fs');
const path = require('path');
const express = require('express');
const { accounts, users, writeJSON } = require('./data');
const accountRoutes = require('./routes/accounts.js');
const servicesRoutes = require('./routes/services.js');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.render('index', 
    {
        title: 'Account Summary',
        accounts
    });
});

app.use('/account', accountRoutes );
app.use('/services', servicesRoutes );

app.get('/profile', (req, res) => {
    res.render('profile', 
    {
        user: users[0]
    });
});

const port = process.env.PORT || 3000; // Si existe un puerto en el process enviroment usa ese, si no, usa el 3000.

app.listen(port, () => {
    console.log(`PS Project Running on port ${port}!`);
});