import {v2 as cloudinary} from 'cloudinary'
import pkg  from 'multer-storage-cloudinary'
const {CloudinaryStorage} = pkg;
cloudinary.config({
    cloud_name: 'dscs4cwiz',
    api_key: '147656249626498',
    api_secret:'bZIHXrVO0_UoeJP6ANxUygvTQwU'
})

const storage = new CloudinaryStorage({
    cloudinary:cloudinary,
    params:{
        folder:'market_images',
        allowed_formats:['jpg','png','jpeg'],
    }
});

export {cloudinary,storage}