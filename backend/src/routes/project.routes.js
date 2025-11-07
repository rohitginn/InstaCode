import express from 'express';
import { createProject, getProject, updateProject, deleteProject} from '../controllers/project.controller.js'

const router = express.Router();

router.route('/').post(createProject).get(getProject);
router.route('/:id').put(updateProject).delete(deleteProject);


export default router;