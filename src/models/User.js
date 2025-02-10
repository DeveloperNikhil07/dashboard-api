import mongoose from "mongoose";


const NewRegisterSchema = new mongoose.Schema({
  fullname: { type: String }, 
  email: { type: String, required: true, unique: true }, 
  password: { type: String, required: true },
});

const User = mongoose.models.User || mongoose.model("User", NewRegisterSchema);

export default User;
