import { getCustomRepository } from 'typeorm';
import bcrypt from 'bcrypt';
import { AdminRepository } from './admin.repository';

import Admin from './admin.entity';

const create = async (payload: Omit<Admin, 'id'>): Promise<Admin> => {
  const adminRepository = getCustomRepository(AdminRepository);
  const user = adminRepository.createAdmin(payload);
  return adminRepository.save(user);
};

const getAll = async (): Promise<Admin[]> => {
  const adminRepository = getCustomRepository(AdminRepository);
  return adminRepository.getAllAdmins();
};

const getById = async (id: string): Promise<Admin | null> => {
  const adminRepository = getCustomRepository(AdminRepository);
  const user = await adminRepository.getAdminById(id);
  if (!user) return null;
  return user;
};

const updateById = async (id: string, payload: Partial<Admin>): Promise<Admin | null> => {
  const adminRepository = getCustomRepository(AdminRepository);
  await adminRepository.updateAdminById(id, payload);
  const user = await adminRepository.getAdminById(id);
  if (!user) return null;
  return user;
};

const deleteById = async (id: string): Promise<Admin | null> => {
  const adminRepository = getCustomRepository(AdminRepository);
  const userDeletable = await adminRepository.getAdminById(id);
  if (!userDeletable) return null;

  await adminRepository.deleteAdminById(id);

  return userDeletable;
};

const findByCredentials = async (login: string, password: string): Promise<Admin | null> => {
  const adminRepository = getCustomRepository(AdminRepository);
  const user = await adminRepository.findByCredentials(login);
  if (!user) return null;
  const passwordVerification = await bcrypt.compare(password, user.password);
  if (!passwordVerification) return null;
  return user;
};

export default { create, getAll, getById, updateById, deleteById, findByCredentials };