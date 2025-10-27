export const constants: any = {};
export enum UserTypesEnum {
  customer = "customer",
  manager = "manager",
  admin = "admin",
  member = "member", // for affiliate user
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

export enum paymentStatus {
  paid = "Paid",
  failed = "Failed",
}

export enum StepsTakenStatusEnum {
  completed = "completed",
  inReview = "inReview",
  actionRequired = "actionRequired",
  pending = "pending",
  contactSupport = "contactSupport",
  documents = "documents",
}

export enum StepsTakenStatusViewEnum {
  completed = "Completed",
  inReview = "In Review",
  actionRequired = "Action Required",
  pending = "Pending",
  contactSupport = "Contact Support",
  documents = "View Documents",
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

export enum ApiStatus {
  success = 200,
  error = 501,
}

export enum DOCTYPE {
  img = "img",
  pdf = "pdf",
  doc = "doc",
}
