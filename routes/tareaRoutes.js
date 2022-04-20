
    import express from 'express';
    import checkAuth from '../middleware/checkAuth.js';
    import {  agregarTarea,
    actualizarTarea,
    eliminarTarea,
    cambiarEstadoTarea, obtenerTarea} from '../controllers/tareaController.js';

    const router = express.Router();

    router.post('/',checkAuth, agregarTarea);
    router
        .route('/:id')
        .get(checkAuth,obtenerTarea)
        .put(checkAuth,actualizarTarea)
        .delete(checkAuth,eliminarTarea);
    router.post('/estado/:id',checkAuth, cambiarEstadoTarea);

    export default router;