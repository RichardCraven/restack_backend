require('dotenv').config(); 
const express = require("express");
let mongoose = require('mongoose');
let databaseConfig
 = require('./config/database.config.json');

// const bodyParser = require('body-parser');
const app = express();
const {authenticate} = require('./modules/auth-module.js');
const cors = require("cors");
const corsOptions = {
    origin: "http://localhost:3000"
  };
// const helmet = require("helmet");

// const visitorRoutes = require('./routes/visitors-routes.js')
// const adminRoutes = require('./routes/admin-routes.js')
// const kennelRoutes = require('./routes/kennels-routes.js')


var fs = require("fs");

const mongoUrl = `mongodb://${databaseConfig.MONGO_USER}:${databaseConfig.MONGO_PASSWORD}@${databaseConfig.MONGO_HOST}:${databaseConfig.MONGO_PORT}/${databaseConfig.MONGO_DB_NAME}?authSource=${databaseConfig.MONGO_AUTH_DB_NAME}`
// Connecting mongoDB Database
mongoose.Promise = global.Promise;
mongoose.set('strictQuery', true);
mongoose.connect(mongoUrl, {
  useUnifiedTopology: true,
  useNewUrlParser: true
}).then(() => {
  console.log('Mongo Database sucessfully connected!')
},
  error => {
    console.log('Could not connect to Mongo database : ' + error)
  }
)
mongoose.connection.on("connected", () => {
    console.log('mongo connected does this happen last?')
    // var db = mongoose.connections[0].db;
  });


app.use(express.json({limit: '50mb', extended: true}));
app.use(express.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

// app.use(bodyParser.json({ limit: '50mb' }));
// app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));

app.use(cors(corsOptions))
// app.use("/api/visitors", visitorRoutes)
// app.use("/api/admin", adminRoutes)
// app.use("/api/kennels", kennelRoutes)

// const userRoutes = 
require('./routes_new/users-routes.js')(app);
require('./routes_new/dungeons-routes.js')(app);
require('./routes_new/maps-routes.js')(app);
// app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
    res.send("Woof Woof!!????")
});


const port = process.env.PORT || 5000;
app.listen(port, ()=> console.log(`\n Running on port ${port}\n`))