import bcrypt from "bcrypt";
const saltRound: number = 10;
export function createPassword(password: any): Promise<string> {
  return bcrypt.hash(password, saltRound);
}

export function validatePassword(passwordinput: any,userpassword:any): Promise<boolean> {
  return bcrypt.compare(passwordinput, userpassword);
}
