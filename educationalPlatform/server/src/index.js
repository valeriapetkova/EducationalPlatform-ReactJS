const express = require('express');

const expressConfig = require('./config/expressConfig');
const dbConnect = require('./config/dbConfig');

const { PORT } = require('./constants');
const routes = require('./routes');

const app = express();

expressConfig(app);

dbConnect()
    .then(() => console.log('Successfully connected to the DB!'))
    .catch((err) => console.log(`DB error: ${err}`));

app.use(routes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`));
