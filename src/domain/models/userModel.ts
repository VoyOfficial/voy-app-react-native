type UserModel = {
  name: string;
  lastName: string;
  email: string;
  contactNumber: string;
  birthDate: Date;
  genre?: string;
  currentState: string;
  city?: string;
};

export default UserModel;
