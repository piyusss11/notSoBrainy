export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  firstName: string;
  userName: string;
  email: string;
  password: string;
}
export interface ILoginUser {
  userName: string;
  password: string;
}
