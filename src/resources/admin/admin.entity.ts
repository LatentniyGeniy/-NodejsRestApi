import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';

import config from '../../common/config';

const { JWT_SECRET_KEY } = config;

@Entity({ name: 'admins' })
class Admin {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('varchar', { default: '' })
  name: string = '';

  @Column('varchar', { unique: true })
  login!: string;

  @Column('varchar')
  password!: string;

  @BeforeInsert()
  generatePasswordHash() {
    this.password = bcrypt.hashSync(this.password, 10);
  }

  async generateAuthToken() {
    const token = jwt.sign({ userId: this.id, login: this.login }, JWT_SECRET_KEY, {
      expiresIn: '1h',
    });
    return token;
  }

  static toResponse({ id, login, name }: Admin) {
    return { id, login, name };
  }
}

export default Admin;