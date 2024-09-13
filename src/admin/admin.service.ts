import * as admin from 'firebase-admin';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Injectable, Inject } from '@nestjs/common';
import { Admin } from './entities/admin.entity'

@Injectable()
export class AdminService {

  constructor(
    @Inject('FIREBASE_ADMIN_TOKEN') private readonly firebaseApp: admin.app.App
  ) {}

  private getFirestore() {
    return this.firebaseApp.firestore();
  }

  async create(createAdminDto: CreateAdminDto): Promise<Admin> {
    const admin = this.getFirestore()
    .collection('admins')
    .doc();

    await admin.set(createAdminDto);

    let adminInstance = new Admin({ id: admin.id, ...createAdminDto });

    return adminInstance;
  }

  async findAll(): Promise<Admin[]> {
    const snapshot = await this.getFirestore().collection('admins').get();

    return snapshot.docs.map(doc => {
      return new Admin({ id: doc.id, ...doc.data() });
    });
  }

  async findById(id: string): Promise<Admin> {
    const admin = await this.getFirestore()
    .collection('admins')
    .doc(id)
    .get();

    return new Admin({ id: admin.id, ...admin.data() });
  }

  async findByEmail(email: string): Promise<Admin> {
    const snapshot = await this.getFirestore()
    .collection('admins')
    .where('email', '==', email)
    .get();

    if (snapshot.empty) {
      return null;
    }

    const admin = snapshot.docs[0];

    return new Admin({ id: admin.id, ...admin.data() });
  }

  async update(id: string, updateAdminDto: UpdateAdminDto): Promise<Admin> {
    // Have to be implemented
    return null;
  }

  async remove(id: string): Promise<void> {
    await this.getFirestore()
    .collection('admins')
    .doc(id)
    .delete();
  }

  async removeAll(): Promise<void> {
    const snapshot = await this.getFirestore().collection('admins').get();
    snapshot.docs.forEach(doc => {
      doc.ref.delete();
    });
  }

}
