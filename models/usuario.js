import mongoose from 'mongoose'

const UsuarioSchema = mongoose.Schema({
    email:{
        type: String,
        required:[true],
        maxlength: 100 
    },

    password:{
        type: String,
        required:[true],
        maxlength: 50
    }
})

export default mongoose.models.Usuario || mongoose.model('Usuario', UsuarioSchema);