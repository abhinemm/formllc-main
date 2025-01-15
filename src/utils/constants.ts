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

export enum StepsTakenStatusEnum {
  completed = "completed",
  inReview = "inReview",
  actionRequired = "actionRequired",
  pending = "pending",
}

export enum StepsView {
  completed = "Completed",
  inReview = "In Review",
  actionRequired = "Action Required",
  pending = "Pending",
}


export enum PlansEnum {
  BASIC = "BASIC",
  PRO = "PRO",
}
