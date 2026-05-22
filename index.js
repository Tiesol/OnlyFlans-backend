const result = require('dotenv').config()
// if (result.error) {
//     throw result.error
// }

const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser');
const db = require('./models');
const cors = require('cors')


app.use(cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173', 'http://localhost:3001'],
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}))


// Para reconocer el body desde un formulario HTML
app.use(bodyParser.urlencoded({ extended: false }));
// Para reconocer el body como JSON
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));


require("./routes")(app);
// Para habilitar la BD
db.sequelize.sync({
    // force: true // drop tables and recreate
}).then(() => {
    console.log("db resync");
});

app.listen(port, () => {
    console.log(`API listening on port ${port}`)
})
