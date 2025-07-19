import mongoose, { Document, Schema } from 'mongoose';

export interface IEmailModel extends Document {
    email: string;
    subscribedAt: Date;
    isActive: boolean;
    source: string;
    createdAt: Date;
    updatedAt: Date;
}

const emailSchema = new Schema<IEmailModel>({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        validate: {
        validator: function(email: string): boolean {
            return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);
        },
        message: 'Please enter a valid email address'
        }
    },
    subscribedAt: {
        type: Date,
        default: Date.now
    },
    isActive: {
        type: Boolean,
        default: false
    },
    source: {
        type: String,
        required: [true, 'Source is required'],
        lowercase: true,
        trim: true
    }
}, {
    timestamps: true
});

// Prevent re-compilation during development
const EmailModel = mongoose.models.EmailModel || mongoose.model<IEmailModel>('EmailModel', emailSchema);

export default EmailModel; 