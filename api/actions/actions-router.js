const express = require('express');
const Action = require('./actions-model')
const {validateUserId } = require('./actions-middleware')

const router = express.Router();


router.get('/', async (req, res, next) => {
      try{
    const action = await Action.get();
    res.status(200).json(action)
  }catch(err){
    next(err)
  }
});
router.get('/:id',validateUserId, async (req, res, next) => {
    try {
      const action = await Action.get(req.params.id);
      if (!action) {
        return res.status(404).json({ message: 'Action not found' });
      }
      res.json(action);
    } catch (err) {
      next(err);
    }
  });
  
  router.post('/', async (req, res) => {
    const { project_id, description ,notes } = req.body;
    if (!project_id || !description, !notes) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    const newAction = await Action.insert(req.body);
    res.status(201).json(newAction);
  });
  
  // [PUT] /api/projects/:id
  router.put('/:id', async (req, res) => {
    const { project_id, description, completed } = req.body;
    if (!project_id || !description || completed === undefined) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
  
    const updated = await Action.update(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ message: 'Action not found' });
    }
    res.json(updated);
  });
  router.delete('/:id',validateUserId,(req,res, next)=>{
    Action.remove(req.params.id)
    .then((removed)=>{
        res.status(200).json(removed);
    }).catch(next)
  })
  

module.exports = router;
