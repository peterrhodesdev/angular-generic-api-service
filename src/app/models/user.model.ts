export interface UserModel {
  id: number;
  name: string;
  username: string;
  email: string;
  //address: nested model (geo: nested model)
  phone: string;
  website: string;
  //company: nested model
}
