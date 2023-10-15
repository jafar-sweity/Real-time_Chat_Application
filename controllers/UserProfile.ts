import { User } from "../dataBase/entities/User.js";

export const updateUserProfile = async (Username: string, updatedData: any) => {
    
    const user = await User.findOne({where:{Username:Username}});
  
    if (!user) {
      console.log("User not found");
      return;
    }
  
    if (updatedData.Username) {
      user.Username = updatedData.Username;
    }
  
    if (updatedData.Password) {
      user.Password = updatedData.Password;
    }
  
    if (updatedData.Email) {
      user.Email = updatedData.Email;
    }
  
   
    await user.save();
    console.log("User profile updated successfully");
  };
  