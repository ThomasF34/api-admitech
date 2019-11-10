import User from '../models/user';
import { hashPassword } from '../helpers/password.helper';

function getUserByEmail(emailToCheck: string): Promise<User> {
  return User.findOne({
    where: {
      email: emailToCheck
    }
  });
}

async function addUser(user: User): Promise<User | undefined> {
  const userData = {
    email: user.email,
    lname: user.lname,
    fname: user.fname,
    password: hashPassword(user.password),
    role: user.role
  };
  const userExisting = await getUserByEmail(user.email);
  if (!userExisting) {
    return User.create(userData);
  }
}

export = { getUserByEmail, addUser };