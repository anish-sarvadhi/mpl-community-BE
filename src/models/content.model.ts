import mongoose, { Schema, Document, Model } from 'mongoose';

interface ContentBlock {
    type: 'paragraph' | 'heading' | 'image' | 'video';
    content?: string;
    alt?: string;
    caption?: string;
    url?: string;
    title?: string;
}

export interface IContent extends Document {
    contentId: string;
    title: string;
    excerpt: string;
    category: string;
    date: Date;
    content: ContentBlock[];
    attachments?: string[]; // store URLs to files
}

const ContentSchema: Schema = new Schema(
    {
        contentId: { type: String, required: true, unique: true },
        title: { type: String, required: true },
        excerpt: { type: String, required: true },
        category: { type: String, required: true },
        date: { type: Date, required: true, default: Date.now },
        content: [
            {
                type: {
                    type: String,
                    enum: ['paragraph', 'heading', 'image', 'video'],
                    required: true,
                },
                content: String,
                alt: String,
                caption: String,
                url: String,
                title: String,
            },
        ],
        attachments: [String],
    },
    { timestamps: true }
);

const Content: Model<IContent> = mongoose.model<IContent>('Content', ContentSchema);
export default Content;
