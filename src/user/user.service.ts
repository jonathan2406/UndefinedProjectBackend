import * as admin from 'firebase-admin';
import { Injectable, Inject } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity'
import { SecurityModule } from '../security/security.module';

@Injectable()
export class UserService {

  constructor(
    @Inject('FIREBASE_ADMIN_TOKEN') private readonly firebaseApp: admin.app.App
  ) {}

  private firestore = this.firebaseApp.firestore();
  private userCollection = this.firestore.collection('user');

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

  async createUser(createUserDto: CreateUserDto) {
    const userRef = this.userCollection.doc();

    // Hash the password before saving
    const hashedPassword = await SecurityModule.hashPassword(createUserDto.password);
    const userData = {
      ...createUserDto,
      password: hashedPassword, // Store hashed password
      id: userRef.id,
      followers: [],
      following: [],
      groups: [],
      lios_received: {},
      lios_sent: {},
    };

    await userRef.set(userData);
    return { id: userRef.id, ...userData };
  }

  async getAllUsers() {
    const snapshot = await this.userCollection.get();
    const users = snapshot.docs.map(doc => doc.data());
    return users;
  }

  async getUserById(id: string) {
    try {
      const userDoc = await this.userCollection.doc(id).get();
  
      if (!userDoc.exists) {
        return { success: false, message: 'User not found', data: null };
      }
      
      return userDoc.data();
    } catch (error) {
      console.error("Error fetching user by ID:", error);
      return { success: false, message: 'Failed to retrieve user', error: error.message };
    }
  }
  
  
  async getUserByEmail(email: string) {
    try {
      const snapshot = await this.userCollection
        .where('email', '==', email).get();
      if (snapshot.empty) {
         return { success: false, message: 'User not found', data: null };
       }
  
       const userDoc = snapshot.docs[0];
       return { success: true, data: userDoc.data() };
    } catch (error) {
      console.error("Error fetching user by email:", error);
      return { success: false, message: 'Failed to retrieve user', error: error.message };
    }
  }

  async authUser(email: string, password: string) {
    const user = await this.getUserByEmail(email);
    if (!user.success) {
      return { success: false, message: 'User not found', data: null };
    }

    let validAuth = await SecurityModule.comparePassword(password, user.data.password);
  
    if (!validAuth) {
      return { success: false, message: 'Invalid email or password', data: null };
    }
  
    return { success: true, data: user.data };
  }
  

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    const userRef = this.userCollection.doc(id);
    const userDoc = await userRef.get();
  
    if (!userDoc.exists) {
      return false;
    }
  
    let updatedUserData = {
      ...updateUserDto,
      updatedAt: new Date().toISOString(),
    };
  
    if (updateUserDto.password) {
      updatedUserData.password = await SecurityModule.hashPassword(updateUserDto.password);
    }
  
    await userRef.update(updatedUserData);
  
    return { id, ...updatedUserData };
  }

  async deleteUser(id: string): Promise<void> {

    if (!(await this.exists(id))) {
      throw new Error('User not found');
    }

    await this.userCollection.doc(id).delete();
  }
}
