import { Schema, Document, model, models, Model } from "mongoose";

interface IUser extends Document {
  email: string;
  name: string;
  image?: string;
  data: [Object];
}

const UserSchema: Schema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: "",
    },
    data: {
      type: [Object],
      default: [
        { title: "To Do", tasks: [] },
        { title: "In Progress", tasks: [] },
        { title: "Done", tasks: [] },
      ],
    },
  },
  { timestamps: true }
);

export default (models.User as Model<IUser>) ||
  model<IUser>("User", UserSchema);
