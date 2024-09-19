import mongoose, { Schema, ObjectId } from 'mongoose';

export interface ITasks {
    title: String;
    description: String;
    status: String;
    userId: ObjectId
}

const TasksSchema: Schema = new Schema({
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    status: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, required: true, }
}, { timestamps: true });

const Tasks = mongoose.model<ITasks>('Tasks', TasksSchema);

export default Tasks;

