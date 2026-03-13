const express = require('express')

//chargement des variables d'environnement
require('dotenv').config();
const cors = require('cors')
//l'importation de la congiguration de la base de donnée
 require('./config/db')
//creation d'une instance de l'application express
//importation des routes
//const personRoutes  = require('./routes/routes')
const app = express();



//configuration d'une port d'ecoute
const PORT = process.env.PORT || 5011;


//middleware pour parser le corps des requetes en json
app.use(express.json());
app.use(cors())


app.get('/', (req,res) => {
res.send('hello world')
})
//utilisation des routes 
//app.use('/api', personRoutes);

app.listen(PORT, () => {
    console.log(` Serveur running on port ${PORT}`)
});