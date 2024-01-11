import { IUser } from "@/types/backend";
import User from '@/models/user'
import connectDB from "@/util/database";



export const createNewUser = async (user: IUser) => {
  await connectDB();
  try {
    const existingUser = await User.findOne({ email: user.email });
    if (!existingUser) {
      const newUser = new User({
        email: user.email,
        name: user.name,
        image: user.image,
      });
      await newUser.save();
      return newUser;
    } else {
      return existingUser;
    }
  } catch (err) {
    console.log('Error saving user:', err);
    return false;
  }
};

export const getIdUser =  async (email: any) => {
   await connectDB()
  try {
    const existingId = await User.findOne({ email: email });
    if(existingId) {
      return existingId._id
    }
    else {
      return false
    }
    
  } catch (error) {
    console.log(error);
  }
}


export const getUserCurrent =  async (email: any) => {
   await connectDB()
  try {
    const userCurrent = await User.findOne({ email: email });
    if(userCurrent) {
      const { password, ...userWithoutPassword } = userCurrent;

      return userWithoutPassword._doc
    }
    else {
      return false
    }
    
  } catch (error) {
    console.log(error);
  }
}
