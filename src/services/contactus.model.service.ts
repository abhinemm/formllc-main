import ContactUs from "@/models/contactus";

export class ContactUsService{
    static async findOne(where:any){
        return ContactUs.findOne({where})
    }
    static async findAll(where:any){
        return ContactUs.findAll({where})
    }
}