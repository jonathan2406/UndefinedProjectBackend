import { Injectable } from '@nestjs/common';
import { Firestore } from '@google-cloud/firestore';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { UpdateMeetingsDto } from './dto/update-meetings.dto';
import { UpdateGroupsUsersDto } from './dto/update-groups-users.dto';
import { Company } from './entities/company.entity';

@Injectable()
export class CompanyService {
  private firestore: Firestore;
  private collection: FirebaseFirestore.CollectionReference;

  constructor() {
    this.firestore = new Firestore({
      projectId: process.env.FIREBASE_PROJECT_ID,
      credentials: {
        private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        client_email: process.env.FIREBASE_CLIENT_EMAIL,
      },
    });

    this.collection = this.firestore.collection('company');
  }

  async create(createCompanyDto: CreateCompanyDto) {
    const docRef = await this.collection.add(createCompanyDto);
    const doc = await docRef.get();
    return { id: doc.id, ...doc.data() };
  }

  async findOne(id: string) {
    const doc = await this.collection.doc(id).get();
    if (!doc.exists) {
      throw new Error('Company not found');
    }
    return { id: doc.id, ...doc.data() };
  }

  async findAll() {
    const snapshot = await this.collection.get();
    const companies = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return companies;
  }

  async update(id: string, updateCompanyDto: UpdateCompanyDto) {
    await this.collection.doc(id).update(updateCompanyDto as { [key: string]: any });
    const doc = await this.collection.doc(id).get();
    return { id: doc.id, ...doc.data() };
  }

  async getByEmail(email: string): Promise<Company> {
    const snapshot = await this.collection.where('email', '==', email).get();
    if (snapshot.empty) {
      throw new Error('Company not found');
    }
    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() } as Company;
  }

  async existsByEmail(email: string): Promise<boolean> {
    const snapshot = await this.collection.where('email', '==', email).get();
    return !snapshot.empty;
  }

  async authCompany(email: string, password: string): Promise<Company> {
    return null;
  }

  async delete(id: string) {
    await this.collection.doc(id).delete();
  }

  async updateMeetings(id: string, updateMeetingsDto: UpdateMeetingsDto) {
    await this.collection.doc(id).update({ meetings: updateMeetingsDto.meetings });
    const doc = await this.collection.doc(id).get();
    return { id: doc.id, ...doc.data() };
  }

  async updateGroupsUsers(id: string, updateGroupsUsersDto: UpdateGroupsUsersDto) {
    await this.collection.doc(id).update({ groups: updateGroupsUsersDto.groups, users: updateGroupsUsersDto.users });
    const doc = await this.collection.doc(id).get();
    return { id: doc.id, ...doc.data() };
  }
}