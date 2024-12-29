import ContactUs from "@/models/contactus";

export default class ContactUsService {
  static async create(data: any) {
    return ContactUs.create(data);
  }
  static async findOne(where: any) {
    return ContactUs.findOne({ where });
  }
  static async findAll(where: any) {
    return ContactUs.findAll({ where });
  }
  static async update(id: number, data: any) {
    return ContactUs.update(data, { where: { id } });
  }
  static async delete(id: number) {
    return ContactUs.destroy({ where: { id } });
  }
}
