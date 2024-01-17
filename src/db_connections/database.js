const mysqlDriver = require('mysql2');
const mongoose = require('mongoose');

const sqlDBconnection = mysqlDriver.createConnection({
    host     : 'host.docker.internal',
    user     : 'root',
    password : 'qwerty123',
    database : 'user_db'
});

const nosqlDBconnecttion = () => {
    const url = "mongodb://host.docker.internal:27017/product_info";
   
    try {
        mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
    const dbConnection = mongoose.connection;
    
    dbConnection.once("open", (_) => {
        console.log(`Database connected: ${url}`);
    });
   
    dbConnection.on("error", (err) => {
        console.error(`connection error: ${err}`);
    });
    return;
}

module.exports = {
    sqlDBconnection,
    nosqlDBconnecttion
}
