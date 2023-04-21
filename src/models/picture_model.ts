/**
 * @fileoverview This file is a model (schema) for the pictures.
 */

import mongoose, { model, Model, Schema } from "mongoose";

interface IPicture {
    pictureId: mongoose.Types.ObjectId,
    userId: mongoose.Types.ObjectId,
    pictureImage: string,
    description: string,
    createdAt: Date,
    updatedAt: Date
    comments: mongoose.Types.ObjectId[],
    likes: mongoose.Types.ObjectId[]
}

interface IPictureModel extends IPicture, Document { }

const PictureSchema: Schema = new Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    pictureImage: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
}, { timestamps: true })

export const Picture: Model<IPictureModel> = model<IPictureModel>("Picture", PictureSchema)