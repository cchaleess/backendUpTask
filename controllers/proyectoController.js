import Proyecto from "../models/Proyecto.js";

const obtenerProyectos = async (req, res) => {
  try {
    //Solo devuelve los proyectos del usuario autenticado
    const proyectos = await Proyecto.find()
      .where("creador")
      .equals(req.usuario);
    res.json(proyectos);
  } catch (error) {
    console.log(error);
  }
};

const nuevoProyecto = async (req, res) => {
  // const { nombre, descripcion, fechaEntrega, cliente, creador, colaboradores } = req.body;
  const proyecto = new Proyecto(req.body);
  proyecto.creador = req.usuario._id;

  try {
    const proyectoAlmacenado = await proyecto.save();
    res.json(proyectoAlmacenado);
  } catch (error) {
    console.log(error);
  }
};

const obtenerProyecto = async (req, res) => {
  const { id } = req.params;
  const proyecto = await Proyecto.findById(id);

  if (!proyecto) {
      const error = new Error("Proyecto no encontrado");

    return res.status(404).json({ msg : error.message });
  }

  if (proyecto.creador.toString() !== req.usuario._id.toString()) {
        const error = new Error("No tienes permisos para ver este proyecto");
        return res.status(401).json({ msg : error.message });
    
  }
  res.json(proyecto);
};

const editarProyecto = async (req, res) => {
    const { id } = req.params;
    const proyecto = await Proyecto.findById(id);
  
    if (!proyecto) {
        const error = new Error("Proyecto no encontrado");
  
      return res.status(404).json({ msg : error.message });
    }
  
    if (proyecto.creador.toString() !== req.usuario._id.toString()) {
          const error = new Error("No tienes permisos para ver este proyecto");
          return res.status(401).json({ msg : error.message });      
    }
    proyecto.nombre = req.body.nombre || proyecto.nombre;
    proyecto.descripcion = req.body.descripcion || proyecto.descripcion;
    proyecto.fechaEntrega = req.body.fechaEntrega || proyecto.fechaEntrega;
    proyecto.cliente = req.body.cliente || proyecto.cliente;

    try {
        const proyectoActualizado = await proyecto.save();
        res.json(proyectoActualizado);
    } catch (error) {
        console.log(error);
    }
    
};

const eliminarProyecto = async (req, res) => {
  const { id } = req.params;
  try {
    await Proyecto.findByIdAndDelete(id);
    res.json({ msg: "Proyecto eliminado" });
  } catch (error) {
    console.log(error);
  }
};

const agregarColaborador = async (req, res) => {
  const { id } = req.params;
  const { colaborador } = req.body;
  try {
    const proyecto = await Proyecto.findById(id);
    proyecto.colaboradores.push(colaborador);
    await proyecto.save();
    res.json({ msg: "Colaborador agregado" });
  } catch (error) {
    console.log(error);
  }
};

const eliminarColaborador = async (req, res) => {
  const { id } = req.params;
  const { colaborador } = req.body;
  try {
    const proyecto = await Proyecto.findById(id);
    const index = proyecto.colaboradores.indexOf(colaborador);
    proyecto.colaboradores.splice(index, 1);
    await proyecto.save();
    res.json({ msg: "Colaborador eliminado" });
  } catch (error) {
    console.log(error);
  }
};

const obtenerTareas = async (req, res) => {
  const { id } = req.params;
  try {
    const proyecto = await Proyecto.findById(id);
    res.json(proyecto.tareas);
  } catch (error) {
    console.log(error);
  }
};

export {
  obtenerProyectos,
  nuevoProyecto,
  obtenerProyecto,
  editarProyecto,
  eliminarProyecto,
  agregarColaborador,
  eliminarColaborador,
  obtenerTareas,
};
