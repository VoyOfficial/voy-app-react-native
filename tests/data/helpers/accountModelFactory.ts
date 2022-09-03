import { AddAccountModel } from '~/domain/models';

const accountModelFactory = (): AddAccountModel => {
  return {
    name: 'any_name',
    lastName: 'any_lastName',
    email: 'any_email@gmail.com',
    contactNumber: '+5595991738017',
    birthDate: new Date(),
    currentState: 'any_currentState',
    cpf: '037.495.802-51',
  };
};

export default accountModelFactory;
