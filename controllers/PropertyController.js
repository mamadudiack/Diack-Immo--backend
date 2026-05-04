const Property = require('../models/Property')
const cloudinary = require('../config/cloudinary')




// CREATE PROPERTY
const createProperty = async (req, res) => {

try {

const { title, description, type, status, price, surface, address, city, image } = req.body;

// créer un nouveau bien
const newProperty = await Property.create({
         title,
         description,
         type,
         status,
         price,
         surface,
         address,
         city,
         image
         
});

return res.status(201).json({
message: "Bien créé avec succès",
property: newProperty
});

} catch (error) {

console.error("Erreur lors de la création :", error);

return res.status(500).json({
message: "Erreur serveur"
});

}

};



// GET ALL PROPERTIES
const getProperties = async (req, res) => {

try {

const properties = await Property.find()     //.populate('client');

return res.status(200).json({
message: "Biens récupérés avec succès",
properties
});

} catch (error) {

console.error("Erreur serveur :", error);

return res.status(500).json({
message: "Erreur serveur"
});

}

};



// GET PROPERTY BY ID
const getPropertyById = async (req, res) => {

try {

const { id } = req.params;

const property = await Property.findById(id);

if (!property) {

return res.status(404).json({
message: "Bien non trouvé"
});

}

return res.status(200).json({
message: "Bien récupéré avec succès",
property
});

} catch (error) {

console.error("Erreur serveur :", error);

return res.status(500).json({
message: "Erreur serveur"
});

}

};



// UPDATE PROPERTY
const updateProperty = async (req, res) => {

try {

const { id } = req.params;

const { title, description, type, status, price, surface, address, city, image } = req.body;

const property = await Property.findByIdAndUpdate(
id,
   { 
    title,
    description,
    type,
    status,
    price,
    surface,
    address,
    city,
    image
   
     },
{ new: true }
);

if (!property) {

return res.status(404).json({
message: "Bien non trouvé"
});

}

return res.status(200).json({
message: "Bien mis à jour avec succès",
property
});

} catch (error) {

console.error("Erreur serveur :", error);

return res.status(500).json({
message: "Erreur serveur"
});

}

};



// DELETE PROPERTY
const deleteProperty = async (req, res) => {

try {

const { id } = req.params;

const property = await Property.findByIdAndDelete(id);

if (!property) {

return res.status(404).json({
message: "Bien non trouvé"
});

}

// Supprimer l'image Cloudinary si elle existe
if (property.image) {
  try {
    // Extraire le publicId de l'URL Cloudinary
    const urlParts = property.image.split('/');
    const fileName = urlParts[urlParts.length - 1];
    const publicId = `properties/${fileName.split('.')[0]}`;

    await cloudinary.uploader.destroy(publicId);
    console.log(`Image supprimée de Cloudinary: ${publicId}`);
  } catch (cloudinaryError) {
    console.error("Erreur suppression image Cloudinary:", cloudinaryError);
    // Ne pas échouer la suppression pour autant
  }
}

return res.status(200).json({
message: "Bien supprimé avec succès"
});

} catch (error) {

console.error("Erreur serveur :", error);

return res.status(500).json({
message: "Erreur serveur"
});

}

};


module.exports = {
createProperty,
getProperties,
getPropertyById,
updateProperty,
deleteProperty
};


