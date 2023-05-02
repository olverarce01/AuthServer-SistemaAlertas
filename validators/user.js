import {check, body} from 'express-validator';
import {validateResult} from '../helpers/validateHelper.js';
const validateCreate = [
  body('username', "Ingrese un email válido")
  .isEmail()
  .exists(),
  body('password', "Ingrese una contraseña válida")
  .exists()
  .notEmpty()
  ,(req,res,next)=>{
    validateResult(req,res,next)
  }
]
export default validateCreate;