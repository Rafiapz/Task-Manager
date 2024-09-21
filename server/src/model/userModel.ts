import mongoose, { Schema, Document } from 'mongoose';

export interface IUsers {
    email: String;
    password: String;
    firstName: String;
    lastName?: String;
}

const UsersSchema: Schema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String },
});

const Users = mongoose.model<IUsers>('Users', UsersSchema);

export default Users;

