const Contact = require("../models/Contact");

const createContact = async (req, res) => {

  try {

    const contact = await Contact.create(req.body);

    res.status(201).json({
      message: "Message envoyé",
      contact
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};
const getContacts = async (req, res) => {

  try {
     const contacts = await Contact.find();

    res.status(200).json({
      message: "Messages récupérés",
      contacts
    });
    
    } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }

};


module.exports = {
  createContact,
  getContacts   
};

// test postman
/*
{
  "name": "Moussa Diaw",
  "email": "moussa@gmail.com",
  "phone": "771234567",
  "message": "Je suis intéressé par une maison à Dakar."
}
*/
