import mongoose, { Schema, Document } from "mongoose";

interface IUser extends Document {
  userName: string;
  email: string;
  password: string;
  addition:object;
  profile:object;
  active:boolean
}

const UserSchema: Schema = new Schema(
  {
    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    addition:{type:Object},
    profile:{type:Object},
    active:{type:Boolean}
  },
  { timestamps: true }
);

const UserModel = mongoose.model<IUser>("User", UserSchema);

export default UserModel;
