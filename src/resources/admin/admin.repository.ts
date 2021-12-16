import { EntityRepository, Repository } from 'typeorm';
import Admin from './admin.entity';

@EntityRepository(Admin)
export class AdminRepository extends Repository<Admin> {
  createAdmin(admin: Omit<Admin, 'id'>) {
    return this.create(admin);
  }

  getAllAdmins() {
    return this.find();
  }

  getAdminById(id: string) {
    return this.findOne({ id });
  }

  updateAdminById(id: string, admin: Partial<Admin>) {
    return this.update({ id }, admin);
  }

  deleteAdminById(id: string) {
    return this.delete({ id });
  }

  findByCredentials(login: string) {
    return this.findOne({ login });
  }
}