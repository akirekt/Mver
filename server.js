const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    const langFromUrl = req.path.split('/')[1];
    const supportedLangs = ['pl', 'en', 'de'];

    if (supportedLangs.includes(langFromUrl)) {
        res.locals.lang = langFromUrl;
    } else {
        res.locals.lang = 'en';
    }

    next();
});

app.get('/en', (req, res) => {
    res.render('en/index');
});

app.get('/pl', (req, res) => {
    res.render('pl/index');
});

app.get('/de', (req, res) => {
    res.render('de/index');
});

app.get('/', (req, res) => {
    res.redirect('/en');
});

app.get('/:lang/index', (req, res) => {
    const lang = res.locals.lang;
    res.render(`${lang}/index`);
});

app.get('/:lang/mver', (req, res) => {
    const lang = req.params.lang; // bierzemy język z URL
    res.render(`${lang}/mver`, { lang }); // przekazujemy zmienną do EJS
});

app.use((req, res) => {
    const lang = res.locals.lang;
    res.status(404).render(`${lang}/404`);
});

app.listen(3000, () => console.log('Server works on port 3000'));