const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const {nosqlDBconnecttion} = require('./db_connections/database');
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.get('/', (req, res) => {
  res.json({
    message: 'Active and running',
  });
});
app.use('/', routes);
nosqlDBconnecttion();
// celebrate errors
// app.use(errors());
const port = parseInt(process.env.PORT, 10) || 3000;
app.listen(port, () => {
  console.log(`listening to the port ${port}`);
});
