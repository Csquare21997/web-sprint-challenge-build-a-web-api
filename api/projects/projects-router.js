const express = require('express');
const Projects = require ('./projects-model')
const {validateUserId } = require('./projects-middleware')

const router = express.Router();



router.get('/', async (req, res, next) => {
  try{
    const projects = await Projects.get();
    res.status(200).json(projects)
  }catch(err){
    next(err)
  }
});

// [GET] /api/projects/:id
router.get('/:id',validateUserId,(req, res) => {
  res.json(req.project);
});

// [POST] /api/projects
router.post('/', async (req, res) => {
  const { name, description } = req.body;
  if (!name || !description) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  const newProject = await Projects.insert(req.body);
  res.status(201).json(newProject);
});

// [PUT] /api/projects/:id
router.put('/:id', async (req, res) => {
  const { name, description, completed } = req.body;
  if (!name || !description || completed === undefined) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const updated = await Projects.update(req.params.id, req.body);
  if (!updated) {
    return res.status(404).json({ message: 'Project not found' });
  }
  res.json(updated);
});

// [DELETE] /api/projects/:id
router.delete('/:id',validateUserId,(req,res, next)=>{
  Projects.remove(req.params.id)
  .then((removed)=>{
      res.status(200).json(removed);
  }).catch(next)
})
// router.delete('/:id', async (req, res, next) => {
//   const project = await Projects.remove(req.params.id);
//   try{
//     if (!project) {
//       return res.status(404).json({ message: 'Project not found' });
//     }
//   }catch(err){
//     next(err)
//   }
// });

// [GET] /api/projects/:id/actions
router.get('/:id/actions', async (req, res) => {
  const actions = await Projects.getProjectActions(req.params.id);
  if (!actions) {
    return res.status(404).json({ message: 'Project not found' });
  }
  res.json(actions);
});
  
  
  module.exports = router