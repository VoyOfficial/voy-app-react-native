export interface AddAccount {
  add(accountModel: AddAccount.AddAccountModel): Promise<AddAccount.Result>;
}

export namespace AddAccount {
  export type Result = {
    status: number;
    data: GenericObject;
    statusMessage: string;
  };
  export type AddAccountModel = {
    name: string;
    lastName: string;
    email: string;
    contactNumber: string;
    birthDate: Date;
    maritalStatus?: string;
    genre?: string;
    currentState: string;
    city?: string;
    cpf: string;
    profession?: string;
  };
  export type GenericObject = { [key: string]: any };
}
