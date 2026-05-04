const router = require('express').Router()

const { createProperty, getProperties, getPropertyById, updateProperty, deleteProperty } = require('../controllers/PropertyController')
const { createTraitement, getTraitement, getTraitementById, getTraitementsByClient, getTraitementsByProperty, updateTraitement, updateTraitementStatus, deleteTraitement,checkTraitementExists } = require('../controllers/TaitementController')
const{ registreUser,getUsers,deleteUser, loginUser, checkToken} = require('../controllers/Auth')
const authorizeAdmin = require('../middlewares/Authorization')
const {createContact,getContacts} = require("../controllers/ContactController");
const { uploadImage, deleteImage } = require('../controllers/uploadController')

//route pour upload image
router.post('/upload', uploadImage)
router.delete('/upload', deleteImage)

//route pour contact
router.post('/contact', createContact);
router.get('/contact', getContacts);

//route pour l'authentificcation
router.post('/auth/register'   ,registreUser)
router.post('/auth/login'     ,loginUser)
router.post('/check-token', checkToken )
router.get('/users', getUsers)
router.delete('/users/:id', deleteUser)
/* ==
   ROUTES PROPERTIES
== */

router.post('/properties', createProperty)
router.get('/properties', getProperties)
router.get('/properties/:id', getPropertyById)
router.put('/properties/:id',authorizeAdmin, updateProperty)
router.delete('/properties/:id', authorizeAdmin, deleteProperty)



/* ==
   ROUTES TRAITEMENT
== */

router.post('/traitements', createTraitement)
router.get('/traitements',getTraitement)
router.get('/traitements/:id', getTraitementById)
router.get("/traitements/client/:id", getTraitementsByClient);
router.get("/traitements/check/:propertyId/:clientId", checkTraitementExists);
router.put('/traitements/:id',authorizeAdmin, updateTraitement)
router.put("/traitements/:id/status", updateTraitementStatus);
router.delete('/traitements/:id',authorizeAdmin, deleteTraitement)


module.exports = router;