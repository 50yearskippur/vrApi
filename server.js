
require('dotenv').config()
const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT;


const routes = require('./api/routes/index');
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());
app.use('/api', routes);

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})

