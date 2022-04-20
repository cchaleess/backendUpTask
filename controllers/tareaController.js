import Proyecto from "../models/Proyecto.js";
import Tarea from "../models/Tarea.js";

const agregarTarea = async (req, res) => {

    const {proyecto} = req.body;

    const existeProyecto = await Proyecto.findById(proyecto);
   // console.log(existeProyecto);

    if (!existeProyecto) {
        const error = new Error("Proyecto no encontrado");
        return res.status(404).json({
            error: error.message
        });
    }
     if (existeProyecto.creador.toString() !== req.usuario._id.toString()) {
        const error = new Error("No tienes permiso para agregar tareas a este proyecto");
        return res.status(401).json({
            error: error.message
        });
    }

    try {
        const tareaAlmacenada = await Tarea.create(req.body);
        res.json (tareaAlmacenada);

    } catch (error) {
        console.log(error);
    }


}

const obtenerTarea = async (req, res) => {
    const { id } = req.params;
    const tarea = await Tarea.findById(id).populate('proyecto');

    if (!tarea) {
        const error = new Error("Tarea no encontrada");
        return res.status(404).json({
            error: error.message
        });
    }

    if(tarea.proyecto.creador.toString() !== req.usuario._id.toString()){
        const error = new Error("No tienes permiso para ver esta tarea");
        return res.status(403).json({
            error: error.message
        });
    }
    res.json(tarea);

}

const actualizarTarea = async (req, res) => {
 
    const { id } = req.params;
    const tarea = await Tarea.findById(id).populate('proyecto');

    if (!tarea) {
        const error = new Error("Tarea no encontrada");
        return res.status(404).json({
            error: error.message
        });
    }

    if(tarea.proyecto.creador.toString() !== req.usuario._id.toString()){
        const error = new Error("No tienes permiso para ver esta tarea");
        return res.status(403).json({
            error: error.message
        });
    }

    tarea.nombre = req.body.nombre || tarea.nombre;
    tarea.descripcion = req.body.descripcion || tarea.descripcion;
    tarea.prioridad = req.body.prioridad || tarea.prioridad;
    tarea.fechaEntrega = req.body.fechaEntrega || tarea.fechaEntrega;

    try {
        const tareaActualizada = await tarea.save();
        res.json(tareaActualizada);
    }
    catch (error) {
        console.log(error);
    }

    
}

const eliminarTarea = async (req, res) => {
    const { id } = req.params;
    const tarea = await Tarea.findById(id).populate('proyecto');

    if (!tarea) {
        const error = new Error("Tarea no encontrada");
        return res.status(404).json({
            error: error.message
        });
    }

    if(tarea.proyecto.creador.toString() !== req.usuario._id.toString()){
        const error = new Error("No tienes permiso para eliminar esta tarea");
        return res.status(403).json({
            error: error.message
        });
    }

    try {
        await tarea.deleteOne();
        res.json({ msg: "Tarea eliminada" });
    } catch (error) {
        console.log(error);
    }
    
}

const cambiarEstadoTarea = (req, res) => {
    const { id } = req.params;
    const { estado } = req.body;
    Tarea.findByIdAndUpdate(id, { estado }, { new: true }, (err, tareaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            tarea: tareaDB
        });
    });
}

export {
    agregarTarea,
    actualizarTarea,
    eliminarTarea,
    cambiarEstadoTarea,
    obtenerTarea
}
