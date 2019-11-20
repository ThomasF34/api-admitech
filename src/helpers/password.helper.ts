import bcrypt from 'bcryptjs';

const hashPassword = (unencryptedPassword: string) => {
  return bcrypt.hashSync(unencryptedPassword, 10);
};

const checkIfUnencryptedPasswordIsValid = (unencryptedPassword: string, realPassword: string) => {
  return bcrypt.compareSync(unencryptedPassword, realPassword);
};

export { hashPassword, checkIfUnencryptedPasswordIsValid };