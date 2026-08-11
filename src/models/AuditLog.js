const mongoose=require("mongoose");
const auditSchema=new mongoose.Schema({
    endpoint: String,
    metodo: String,
    statusCode: Number,

    timestamp: {
        type: Date,
        default: Date.now
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

module.exports=mongoose.model("AuditLog",auditSchema);