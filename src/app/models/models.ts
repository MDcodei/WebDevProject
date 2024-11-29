import mongoose, {Schema, Document, Model} from "mongoose";

interface IItem extends Document {
    email: string;
    password: string;
}

const userSchema = new Schema<IItem>({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

const User: Model<IItem> = mongoose.models.Item || mongoose.model<IItem>("Item", userSchema);
export default User;