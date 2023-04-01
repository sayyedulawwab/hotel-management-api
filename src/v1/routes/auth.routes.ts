import express from 'express';
import multer from 'multer';
import path from 'path';
import AuthController from '../../controllers/auth.controller';

export const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
    }
  })
  
const upload = multer({ storage: storage })

// REGISTER
router.route("/register").post(upload.single('avatar'),AuthController.register);


// LOGIN
router.route("/login").post(AuthController.login);


// LOGOUT
router.route("/logout").post(AuthController.logout);
