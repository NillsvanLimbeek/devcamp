import mongoose, { Schema, Document } from 'mongoose';

export interface ICourse extends Document {
    title: string;
    description: string;
    weeks: string;
    tuition: number;
    minimumSkill: 'beginner' | 'intermediate' | 'advanced';
    scholarshipAvailable: boolean;
    createdAt: Date;
    bootcamp: string;
}

const CourseSchema = new Schema({
    title: {
        type: String,
        trim: true,
        required: [true, 'Please add a course title'],
    },
    description: {
        type: String,
        required: [true, 'Please add a description'],
    },
    weeks: {
        type: String,
        required: [true, 'Please add number of weeks'],
    },
    tuition: {
        type: Number,
        required: [true, 'Please add a tuition cost'],
    },
    minimumSkill: {
        type: String,
        required: [true, 'Please add a minimum skill'],
        enum: ['beginner', 'intermediate', 'advanced'],
    },
    scholarshipAvailable: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    bootcamp: {
        // TODO objectId
        // @ts-ignore
        type: mongoose.Schema.ObjectId,
        ref: 'Bootcamp',
        required: true,
    },
});

export default mongoose.model<ICourse>('Course', CourseSchema);
