const express = require('express');

const visitorRoutes = require('./routes/visitors-routes.js')
const adminRoutes = require('./routes/admin-routes.js')

const server = express();

server.use("/api/visitors", visitorRoutes)
server.use("/api/admin", adminRoutes)

server.use(express.json());

server.get('/', (req, res) => {
    res.send("Woof Woof! We Out the Pound!")
});


const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\n Running on port ${port}\n`))