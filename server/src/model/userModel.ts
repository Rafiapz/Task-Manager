import mongoose, { Schema, Document } from 'mongoose';

export interface IUsers extends Document {
    email: String;
    password: String;
    fullName: String;
    avatart: String;
}

const UsersSchema: Schema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fullName: { type: String, required: true },
    avatart: { type: String, required: true },
});

const Users = mongoose.model<IUsers>('Users', UsersSchema);

export default Users;

