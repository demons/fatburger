const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const db = require('./db/models');
const router = require('./routes/index');
const errorHandler = require('./middleware/errorHandler');

const PORT = 8000;

const app = express();

app.use(morgan('dev'));
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use('/', router);
app.use(errorHandler);

process.on('uncaughtException', (err) => {
  console.error(`Uncaught Exception: ${err.message}`);
  process.exit(1);
});

(async () => {
  try {
    await db.sequelize.sync({ force: true });

    app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
  } catch (err) {
    console.error(err);
  }
})();
