const UserModel = require("../model/user.model");
class UserServices {
  static async registerUser(
    First_Name,
    Last_Name,
    Phone_Number,
    Date_Of_Birth,
    Gender,
    password
  ) {
    try {
      const createUser = new UserModel({
        First_Name,
        Last_Name,
        Phone_Number,
        Date_Of_Birth,
        Gender,
        password,
      });
      return await createUser.save();
    } catch (e) {
        throw error;
    }
  }
}
module.exports=UserServices;
