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

  // Checkers 

  async exists(id: string): Promise<boolean> {
    const admin = await this.getFirestore()
    .collection('admin')
    .doc(id)
    .get();

    return admin.exists;
  }

  async existsByEmail(email: string): Promise<boolean> {
    const snapshot = await this.getFirestore()
    .collection('admin')
    .where('email', '==', email)
    .get();

    return !snapshot.empty;
  }

async create(createAdminDto: CreateAdminDto): Promise<Admin> {
  // Usar el id proporcionado en el DTO para el documento
  const admin = this.getFirestore()
    .collection('admin')
    .doc(createAdminDto.id);

  let check1: boolean = await this.exists(admin.id);
  let check2: boolean = await this.existsByEmail(createAdminDto.email);

  if (check1 || check2) {
    throw new Error('Admin already exists');
  }

  await admin.set(createAdminDto);

  let adminInstance = new Admin({ id: admin.id, ...createAdminDto });

  return adminInstance;
}


  async findAll(): Promise<Admin[]> {
    const snapshot = await this.getFirestore().collection('admin').get();

    return snapshot.docs.map(doc => {
      return new Admin({ id: doc.id, ...doc.data() });
    });
  }

  async findById(id: string): Promise<Admin> {
    const admin = await this.getFirestore()
    .collection('admin')
    .doc(id)
    .get();

    if (!admin.exists) {
      throw new Error('Admin not found');
    }

    return new Admin({ id: admin.id, ...admin.data() });
  }

  async findByEmail(email: string): Promise<Admin> {
    const snapshot = await this.getFirestore()
    .collection('admin')
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
    .collection('admin')
    .doc(id)
    .delete();
  }

  async removeByEmail(email: string): Promise<void> {
    const snapshot = await this.getFirestore()
    .collection('admin')
    .where('email', '==', email)
    .get();

    if (snapshot.empty) {
      return;
    }

    snapshot.docs.forEach(doc => {
      doc.ref.delete();
    });
  }

  async removeAll(): Promise<void> {
    const snapshot = await this.getFirestore().collection('admin').get();
    snapshot.docs.forEach(doc => {
      doc.ref.delete();
    });
  }

}
