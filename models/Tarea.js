import mongoose from "mongoose";

const tareaSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    descripcion: {
        type: String,
        required: true,
        trim: true
    },
    estado: {
        type: Boolean,
        default: false
    },
    fechaEntrega: {
        type: Date,
        default: Date.now(),
    },
    prioridad: {
        type: String,
        required: true,
        enum: ["alta", "media", "baja"],
    },
    proyecto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Proyecto",
    }
},
    {
        timestamps: true
    }
);

const Tarea = mongoose.model("Tarea", tareaSchema);

export default Tarea;

