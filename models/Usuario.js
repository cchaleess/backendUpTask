import mongoose from "mongoose";
import bcrypt from "bcrypt";

const usuarioSchema = new mongoose.Schema({
    
    nombre: {
        type: String,
        required:true,
        trim:true
    },
    password: {
        type: String,
        required: [true, "La contraseña es necesaria"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "El correo es necesario"],
        trim: true,
        unique: true,
    },
    token: {
        type: String,
    },
    confirmado: {
        type: Boolean,
        default: false,
    },
}, {
    
    timestamps: true,
    });

usuarioSchema.pre("save", async function (next) {
    //Si no esta modificando el password , que no se haga nada. Sino hashea el password al hacer cualquier operacion
    if (!this.isModified("password")) {
        //No se hace nada, sino cada vez
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

usuarioSchema.methods.comprobarPassword = async function (passwordFormulario) {
    return await bcrypt.compare(passwordFormulario, this.password);
};


const Usuario = mongoose.model("Usuario", usuarioSchema);

export default Usuario;
