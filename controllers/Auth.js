const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


//fonction de génération de token JWT
const generateToken = (user) => {
    return jwt.sign(
    {id:user._id, email:user.email,role:user.role}, 
    process.env.JWT_SECRET,
    {expiresIn:'1h'} 
     );
}



//controller pour l'incription d'un utilisateur
const registreUser = async (req,res) => {
    try {
          const{fullname,email,password,phone,clientType
           //,role
          } = req.body;

 //verifier  si l'utilisateur existe deja
   const existingUser = await User.findOne({email})
   if (existingUser) {
      return res.status(400).json({message : "l'utilisateur existe déja"})
   }
   
 // hash du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

 //créé un nouveau utilisateur
 
    const newUser =  new  User ({
        fullname,
        email,
        //role,
        password:hashedPassword,
        phone,
        clientType
        
    })
    await newUser.save();
    res.status(201).json({message:"l'utilisateur créé avec succéés"})
     } 
      catch (error) {
        res.status(500).json({message:"error serveur"})
    }
   
}

//controller pour la connexion d'un utilisateur
const loginUser = async(req,res) => {
    try {
        
     const{email,password}= req.body;

 //trouver l'utilisateur par son email
     const user = await User.findOne({email})
if (!user) {
   return    res.status(400).json({message:"Email ou mot de passe incorrect"})
}

//verifier le mot de passe

const isMatch = await bcrypt.compare(password,user.password)
if (!isMatch) {
    return   res.status(400).json({message:"Email ou mot de passe incorrect"})
}

//Générer un token JWT
const token = generateToken(user)
  
   return  res.json({message:"Connexion réussie",token,user})

    } catch (error) {
     return   res.status(500).json({message:"erreur de serveur"})
    }
}

//check token validation
const checkToken = (req,res) => {
    const{token} = req.body;

     if (!token) {
    return res.status(401).json({
      message: "token manquant"
    });
  }

  try {
     jwt.verify(token, process.env.JWT_SECRET,(err,user) => {
    if (err) {
      return res.status(403).json({
        message: "token invalid"
      });
    }
  req.user = user 
  return  res.status(200).json({message: " token valide ",user});

     });
 

  } catch (error) {
    console.error('error lors de la validation du token',error)
    return res.status(500).json({
      message: "error serveur"
    });
  }
}

const getUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json({
      message: "Utilisateurs récupérés avec succès",
      users
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Erreur serveur"
    });
  }
};
//controller pour supprimer un utilisateur
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    res.status(200).json({ message: "Utilisateur supprimé avec succès" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

module.exports = {
    registreUser,
    getUsers,
    deleteUser,
    loginUser,
    checkToken
}
