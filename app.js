import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes/index.js';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/static', express.static('Resources'));
app.set('view engine', 'ejs');

app.use('/', routes);

app.listen(3000, () => {
    console.log("Running with 3000 port")
});
