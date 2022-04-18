import express from 'express';
const router = express.Router();
import {autenticar, registrar, confirmar, olvidePassword, comprobacionToken, nuevoPassword, perfil } from '../controllers/usuarioController.js';
import checkAuth from '../middleware/checkAuth.js';

//Autenticacion, registrar y confirmar usuario

router.post('/', registrar); //Crea un usuario
router.post('/login', autenticar); //Confirma un usuario
router.get('/confirmar/:id', confirmar);
router.post('/olvide-password', olvidePassword);
/* router.get('/olvide-password/:token', comprobacionToken);
router.post('/olvide-password/:token', nuevoPassword);
 */
//Al tener mismo endpoint, se puede usar una sola ruta:
router.route('/olvide-password/:token').get(comprobacionToken).post(nuevoPassword);

router.get('/perfil', checkAuth, perfil);




export default router;