
const Traitement = require('../models/Traitement');
const Property = require('../models/Property');
// CREATE RENTAL
const createTraitement = async (req, res) => {
  try {
    const {
      traitementType,
      property,
      client,
      salePrice,
      rentPrice,
      startDate,
      endDate
    } = req.body;

    //  Vérifier si le client a déjà un traitement pour ce bien
    const existingTraitement = await Traitement.findOne({
      property,
      client,
      status: { $in: ["en_attente", "valide","refuse", "paid"] } 
    });

    if (existingTraitement) {
      return res.status(400).json({
        message: " Vous avez déjà demandé à acheter ou louer ce bien"
      });
    }

    //  Création si aucun doublon
    const newTraitement = await Traitement.create({
      traitementType,
      property,
      client,
      salePrice,
      rentPrice,
      startDate,
      endDate
    });

    return res.status(201).json({
      message: "Traitement enregistrée avec succès",
      traitement: newTraitement
    });

  } catch (error) {
    console.error("Erreur lors de la création du traitement :", error);

    return res.status(500).json({
      message: "Erreur serveur"
    });
  }
};


// GET ALL RENTALS
const getTraitement = async (req, res) => {

try {

const traitements = await Traitement.find()
.populate('property')
.populate('client')


return res.status(200).json({
message: "Traitement récupérées avec succès",
traitements
});

} catch (error) {

console.error("Erreur serveur :", error);

return res.status(500).json({
message: "Erreur serveur"
});

}

};



// GET RENTAL BY ID
const getTraitementById = async (req, res) => {

try {

const { id } = req.params;

const traitement = await Traitement.findById(id)
.populate('property')
.populate('client')


if (!traitement) {

return res.status(404).json({
message: "Traitement non trouvée"
});

}

return res.status(200).json({
message: "Traitement récupérée avec succès",
traitement
});

} catch (error) {

console.error("Erreur serveur :", error);

return res.status(500).json({
message: "Erreur serveur"
});

}

};
// GET TRAITEMENTS BY CLIENT
const getTraitementsByClient = async (req, res) => {

  try {

    const { id } = req.params;

    const traitements = await Traitement.find({ client: id })
      .populate("property")
      .populate("client");

    // return res.status(200).json(traitements);
    return res.status(200).json({
   message: "Traitement récupérée avec succès", traitements
});

  } catch (error) {

    console.error("Erreur serveur :", error);

    return res.status(500).json({
      message: "Erreur serveur"
    });

  }

};


// UPDATE RENTAL
const updateTraitement = async (req, res) => {

try {

const { id } = req.params;

const {traitementType, property, client, salePrice,rentPrice, startDate,endDate } = req.body;

const traitement = await Traitement.findByIdAndUpdate(
id,
{traitementType, property, client, salePrice,rentPrice, startDate,endDate  },
{ new: true }
);

if (!traitement) {

return res.status(404).json({
message: "traitement non trouvée"
});

}

return res.status(200).json({
message: "traitement mise à jour avec succès",
traitement
});

} catch (error) {

console.error("Erreur serveur :", error);

return res.status(500).json({
message: "Erreur serveur"
});

}

};
const updateTraitementStatus = async (req, res) => {
  try {
    const { status } = req.body;

    // 1. update traitement
    const traitement = await Traitement.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!traitement) {
      return res.status(404).json({
        message: "Traitement introuvable"
      });
    }

    // 2. si validé => update property
    if (status === "valide") {
      let propertyStatus;

      if (traitement.traitementType === "vente") {
        propertyStatus = "vendu";
      }

      if (traitement.traitementType === "location") {
        propertyStatus = "loue";
      }

      if (propertyStatus) {
        await Property.findByIdAndUpdate(
          traitement.property,
          { status: propertyStatus },
          { new: true }
        );
      }
    }

    res.json({
      message: "Statut du traitement mis à jour",
      traitement
    });

  } catch (error) {
    console.error("Erreur update traitement :", error);

    res.status(500).json({
      message: "Erreur serveur"
    });
  }
};




// DELETE RENTAL
const deleteTraitement = async (req, res) => {

try {

const { id } = req.params;

const traitement = await Traitement.findByIdAndDelete(id);

if (!traitement) {

return res.status(404).json({
message: "traitement non trouvée"
});

}

return res.status(200).json({
message: "traitement supprimée avec succès"
});

} catch (error) {

console.error("Erreur serveur :", error);

return res.status(500).json({
message: "Erreur serveur"
});

}

};

// CHECK IF TRAITEMENT EXISTS FOR PROPERTY AND CLIENT 
const checkTraitementExists = async (req, res) => {
  try {
    const { propertyId, clientId } = req.params;

    const existing = await Traitement.findOne({
      property: propertyId,
      client: clientId,
      status: { $in: ["en_attente", "valide", "paid"] }
    });

    res.json({ exists: !!existing });

  } catch (error) {
    console.error("Erreur check traitement:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};


module.exports = {
createTraitement,
getTraitement,
getTraitementById,
updateTraitement,
deleteTraitement,
getTraitementsByClient,
updateTraitementStatus,
checkTraitementExists
};

