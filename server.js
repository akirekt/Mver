const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.static(__dirname + '/public'));
// Wersje językowe
app.get('/en', (req, res) => {
    res.render('en/index', { lang: 'en' });
});

app.get('/pl', (req, res) => {
    res.render('pl/index', { lang: 'pl' });
});

app.get('/de', (req, res) => {
    res.render('de/index', { lang: 'de' });
});

// domyślny
app.get('/', (req, res) => {
    res.render('en/index', { lang: 'en' });
});

app.listen(3000, () => console.log('Server works on port 3000'));