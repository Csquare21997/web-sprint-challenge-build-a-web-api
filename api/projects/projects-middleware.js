const Projects = require('./projects-model')


async function validateUserId(req, res, next) {
    try{
      const project = await Projects.get(req.params.id);
  if (!project) {
    return res.status(404).json({ message: 'Project not found' });
  }else{
        req.project = project
        next ()
      }
    }catch(err){
      res.status(500).json({
        message:'problem finding user',
      })
  
    }
    
  }
  
  module.exports = {validateUserId}