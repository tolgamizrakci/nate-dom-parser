/* eslint-disable no-console */
const express = require('express');
const cors = require('cors');

const PORT = process.env.PORT || 3001;
const app = express();
app.use(cors());
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

const urlController = require('./urlController');

app.post('/api', urlController.urlController);

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

module.exports = app;
