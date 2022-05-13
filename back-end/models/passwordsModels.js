const passwordValidator = require('password-validator');

const passwordSchema = new passwordValidator();

passwordSchema
// min 8 lettres
.is().min(8)  
// max 64 lettres                                  
.is().max(64)    
// une majuscule                              
.has().uppercase()
// une minuscule                              
.has().lowercase()
// un nombre                             
.has().digits()
// pas d'espace                                
.has().not().spaces()                    

module.exports = passwordSchema;