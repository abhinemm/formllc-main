import Company from "@/models/company";
import User from "@/models/user";

export default class UserService {
  static async createUser(data: any) {
    return User.create(data);
  }
  static async findOne(where:any){
    return User.findOne({where})
  }
}
