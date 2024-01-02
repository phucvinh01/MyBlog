import { IUser } from "@/types/backend";
import User from '@/models/user'
import connectDB from "@/util/database";



export const createNewUser = async (user: IUser) => {
    connectDB()
  try {
    const existingUser = await User.findOne({ email: user.email });
    if (!existingUser) {
      const newUser = new User({
        email: user.email,
        name: user.name,
        image: user.image,
      });
      await newUser.save();
    }
    return true;
  } catch (err) {
    console.log('Error saving user', err);
    return false;
  }
};
