const Property = require('../models/Property')


// CREATE
 const createProperty = async (req,res) => {

try {

       const property = await Property.create(req.body)

        res.status(201).json(property)

} catch (error) {

     res.status(500).json({message:error.message})

}

}


// GET ALL
const getProperties = async (req,res) => {

try {

const properties = await Property.find().populate('agent')

res.json(properties)

} catch (error) {

res.status(500).json({message:error.message})

}

}


// GET ONE
const getProperty = async (req,res) => {

try {

const property = await Property.findById(req.params.id)

res.json(property)

} catch (error) {

res.status(500).json({message:error.message})

}

}


// UPDATE
const updateProperty = async (req,res) => {

try {

const property = await Property.findByIdAndUpdate(
req.params.id,
req.body,
{new:true}
)

res.json(property)

} catch (error) {

res.status(500).json({message:error.message})

}

}


// DELETE
const deleteProperty = async (req,res) => {

try {

await Property.findByIdAndDelete(req.params.id)

res.json({message:"Property deleted"})

} catch (error) {

res.status(500).json({message:error.message})

}

}
module.exports ={
createProperty,getProperties,updateProperty,deleteProperty
}