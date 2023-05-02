import {check, body} from 'express-validator';
import {validateResult} from '../helpers/validateHelper.js';
const validateCreate = [
  body('username')
  .notEmpty().withMessage("Is Empty")
  .isEmail().withMessage("Isn't a Email"),
  body('password')
  .notEmpty().withMessage("Is Empty")
  ,(req,res,next)=>{
    validateResult(req,res,next)
  }
]
export default validateCreate;