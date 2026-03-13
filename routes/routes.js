
const router = require('express').Router()
const{createProperty,getProperties,updateProperty,deleteProperty} = require('../controllers/PropertyController')

//route pour les biens(property)
router.post('/properties', createProperty)

router.get('/properties', getProperties)

router.put('/properties:id', updateProperty)

router.delete('/propertie:id', deleteProperty)
