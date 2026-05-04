const express = require('express');
const cors = require('cors');
require('dotenv').config();

// import connexion base de données
require('./config/db');

// import routes
const Routes = require('./routes/routes');

const app = express();

// PORT
const PORT = process.env.PORT || 5011;

// middlewares
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));

// Configuration CORS
const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:3001', 'http://127.0.0.1:3000', 'http://127.0.0.1:3001'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin', 'X-Requested-With']
};
app.use(cors(corsOptions));

// Gestion des erreurs de payload trop grand
app.use((err, req, res, next) => {
  if (err.type === 'entity.too.large') {
    return res.status(413).json({
      success: false,
      message: 'Fichier trop volumineux. Taille maximale autorisée: 100MB'
    });
  }
  next(err);
});


// route test
app.get('/', (req, res) => {
    res.send('Hello World');
});

// routes API
app.use('/api', Routes);

// logging de configuration utile pour ngrok / PayTech
// console.log('⚙️ Configuration serveur:');
// console.log('  PORT =', PORT);
// console.log('  CLIENT_URL =', process.env.CLIENT_URL);
// console.log('  PAYTECH_ENV =', process.env.PAYTECH_ENV);
// console.log('  PAYTECH_SUCCESS_URL =', process.env.PAYTECH_SUCCESS_URL);
// console.log('  PAYTECH_CANCEL_URL =', process.env.PAYTECH_CANCEL_URL);
// console.log('  PAYTECH_IPN_URL =', process.env.PAYTECH_IPN_URL);

// lancement serveur
app.listen(PORT, () => {
    console.log(`Serveur running on port ${PORT}`);
});