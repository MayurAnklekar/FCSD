const cloudinary = require('cloudinary').v2
cloudinary.config({ 
    cloud_name: 'dx2obpfvr', 
    api_key: '866421618914553', 
    api_secret: 'dTJO53khHJXE_ENhCc_EjRGoBlc',
    secure: true
  });

module.exports = { cloudinary }