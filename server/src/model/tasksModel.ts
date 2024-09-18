import mongoose, { Schema, Document } from 'mongoose';

export interface ITasks extends Document {
    title: String;
    description: String;
    status: String;
}

const TasksSchema: Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, required: true },
});

const Tasks = mongoose.model<ITasks>('Tasks', TasksSchema);

export default Tasks;

