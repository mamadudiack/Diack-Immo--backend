
const cloudinary = require("../config/cloudinary");

const uploadImage = async (req, res) => {
  try {
    const { image } = req.body;

    if (!image) {
      return res.status(400).json({ message: "Image requise" });
    }

    // Validation de la taille de l'image (base64 est ~33% plus grand que le fichier original)
    const imageSizeBytes = Buffer.byteLength(image, 'base64');
    const maxSizeBytes = 50 * 1024 * 1024; // 50MB

    if (imageSizeBytes > maxSizeBytes) {
      return res.status(413).json({
        success: false,
        message: "Image trop volumineuse. Taille maximale: 50MB"
      });
    }

    console.log(`Upload d'image: ${imageSizeBytes} bytes (~${Math.round(imageSizeBytes / 1024 / 1024 * 100) / 100}MB)`);

    const result = await cloudinary.uploader.upload(image, {
      folder: "properties",
      resource_type: "auto",
      quality: "auto:good",
      fetch_format: "auto",
      timeout: 60000 // 60 secondes timeout
    });

    res.status(200).json({
      success: true,
      imageUrl: result.secure_url,
      publicId: result.public_id
    });

  } catch (error) {
    console.error("Erreur upload:", error);
    res.status(500).json({
      success: false,
      message: "Erreur lors de l'upload image",
      error: error.message
    });
  }
};

const deleteImage = async (req, res) => {
  try {
    const { publicId } = req.body;

    if (!publicId) {
      return res.status(400).json({ message: "Public ID requis" });
    }

    await cloudinary.uploader.destroy(publicId);

    res.status(200).json({
      success: true,
      message: "Image supprimée avec succès"
    });

  } catch (error) {
    console.error("Erreur suppression:", error);
    res.status(500).json({ 
      success: false,
      message: "Erreur lors de la suppression",
      error: error.message 
    });
  }
};

module.exports = { uploadImage, deleteImage };