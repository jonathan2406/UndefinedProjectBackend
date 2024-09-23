import * as admin from 'firebase-admin';
import { Injectable, Inject } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity'

@Injectable()
export class UserService {

  constructor(
    @Inject('FIREBASE_ADMIN_TOKEN') private readonly firebaseApp: admin.app.App
  ) {}

  private firestore = this.firebaseApp.firestore();

  async exists(id: string): Promise<boolean> {
    const admin = await this.firestore
    .collection('user')
    .doc(id)
    .get();

    return admin.exists;
  }

  async existsByEmail(email: string): Promise<boolean> {
    const snapshot = await this.firestore
    .collection('user')
    .where('email', '==', email)
    .get();

    return !snapshot.empty;
  }

  async create(createUserDto: CreateUserDto) {
    
    const user = this.firestore
    .collection('user')
    .doc(createUserDto.id);

    const userRef = this.firestore.collection('user').doc(createUserDto.id)

    let check1: boolean = await this.exists(user.id);
    let check2: boolean = await this.existsByEmail(createUserDto.email);
  
    if (check1 || check2) {
      throw new Error('User already exists');
    }
  
    await user.set(createUserDto);
  
    let userInstance = new User({ id: user.id, ...createUserDto });
  
    return userInstance;
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
