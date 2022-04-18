import express from 'express';
import  {obtenerProyectos,
nuevoProyecto,
obtenerProyecto,
editarProyecto,
eliminarProyecto,
agregarColaborador,
eliminarColaborador,
obtenerTareas} from '../controllers/proyectoController.js';
import checkAuth from '../middleware/checkAuth.js';

const router = express.Router();

/* router.get('/', checkAuth, obtenerProyectos);  
router.post('/', checkAuth, nuevoProyecto); */
router.route('/').get(checkAuth, obtenerProyectos).post(checkAuth, nuevoProyecto);
router.route('/:id').get(checkAuth, obtenerProyecto).put(checkAuth, editarProyecto).delete(checkAuth, eliminarProyecto);
router.get('/:id/tareas', checkAuth, obtenerTareas);
router.post('/agregar-colaborador/:id', checkAuth, agregarColaborador);
//utilizo post porque el colaborador se elimina de la lista de colaboradores, no de la base de datos.
router.post('/eliminar-colaborador/:id', checkAuth, eliminarColaborador);
export default router;