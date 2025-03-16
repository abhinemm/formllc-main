import Company from "@/models/company";
import User from "@/models/user";

export default class CompanyService {
  static async createUser(data: any) {
    return Company.create(data);
  }
  static async findOne(where: any) {
    return Company.findOne({ where });
  }
  static async update(id: number, data: any) {
    return Company.update(data, { where: { id } });
  }
  static async delete(id:number){
    return Company.destroy({where:{id}});

  }
}
