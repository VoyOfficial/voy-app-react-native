type AddAccountModel = {
  name: string;
  lastName: string;
  email: string;
  contactNumber: string;
  birthDate: Date;
  maritalStatus?: string;
  sex?: string;
  currentState: string;
  city?: string;
  cpf: string;
  profession?: string;
};

export default AddAccountModel;
