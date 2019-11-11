import User from '../models/user';
import { hashPassword } from '../helpers/password.helper';
import Candidature from '../models/candidature';

function getOwnProfileWithApplications(): Promise<User> {
  // 1 must became the id of the connected user TODO
  return User.findByPk(1, {
    attributes: ['first_name', 'last_name', 'email'],
    include: [
      {
        model: Candidature,
        as: 'candidatures',
        attributes: ['id', 'branch', 'status']
      }]
  });
}

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
    last_name: user.last_name,
    first_name: user.first_name,
    password: hashPassword(user.password),
    role: user.role
  };
  const userExisting = await getUserByEmail(user.email);
  if (!userExisting) {
    return User.create(userData);
  }
}

export = { getUserByEmail, addUser, getOwnProfileWithApplications };