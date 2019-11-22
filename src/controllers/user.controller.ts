import User from '../models/user';
import { hashPassword } from '../helpers/password.helper';
import Candidature from '../models/candidature';

function getOwnProfile(id: number, role: string) {
  switch (role) {
    case 'eleve':
      return User.findByPk(id, {
        attributes: ['first_name', 'last_name', 'email'],
        include: [
          {
            model: Candidature,
            as: 'candidatures',
            attributes: ['id', 'branch', 'status']
          }]
      });
    case 'administration':
      return User.findByPk(id, { attributes: ['first_name', 'last_name', 'email'] });
    default:
      return 'Vous n\'avez pas de profil';
  }

}

function getUserByEmail(emailToCheck: string): Promise<User | null> {
  return User.findOne({
    where: {
      email: emailToCheck
    }
  });
}

function getAllJuries(): Promise<User[]> {
  return User.findAll({
    where: {
      role: 'administration'
    }
  });
}


async function addUser(user: User): Promise<User | undefined> {
  const userData = {
    email: user.email,
    last_name: user.last_name,
    first_name: user.first_name,
    password: user.password === undefined ? null : hashPassword(user.password),
    role: user.role
  };
  const userExisting = await getUserByEmail(user.email);
  if (!userExisting) {
    return User.create(userData);
  }
}

export = { getUserByEmail, addUser, getOwnProfile,getAllJuries };