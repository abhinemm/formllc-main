export const constants: any = {};
export enum UserTypesEnum {
  customer = "customer",
  manager = "manager",
  admin = "admin",
}

export enum CompanyStatus {
  active = 1,
  inActive = 0,
  deleted = 2,
}

export enum CompanyPaymentStatus {
  notPaid = 0,
  paid = 1,
  failed = 2,
}
