// add middlewares here related to actions
const Action = require('./actions-model')



async function validateUserId(req, res, next) {
    try{
      const action = await Action.get(req.params.id);
  if (!action) {
    return res.status(404).json({ message: 'Project not found' });
  }else{
        req.project = action
        next ()
      }
    }catch(err){
      res.status(500).json({
        message:'problem finding user',
      })
  
    }
}
module.exports = {validateUserId}
