const mongoose = require('mongoose')

//connection a la base de données  mongoDB

mongoose.connect(process.env.MONGO_URI, {})

.then( () => {console.log("connexion a la base de données mongoDB "); })
.catch( (err) => {console.log("erreur de connexion a la base de données:",err);})