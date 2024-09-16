import * as admin from 'firebase-admin';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Injectable, Inject } from '@nestjs/common';
import { Company } from './entities/company.entity';

@Injectable()
export class CompanyService {
  
  constructor(
    @Inject('FIREBASE_ADMIN_TOKEN') private readonly firebaseApp: admin.app.App
  ) {}

  private getFirestore() {
    return this.firebaseApp.firestore();
  }

  // Checkers

  async exists(id: string): Promise<boolean> {
    const company = await this.getFirestore()
      .collection('company')
      .doc(id)
      .get();

    return company.exists;
  }

  async existsByName(name: string): Promise<boolean> {
    const snapshot = await this.getFirestore()
      .collection('company')
      .where('name', '==', name)
      .get();

    return !snapshot.empty;
  }

  //async create(createCompanyDto: CreateCompanyDto): Promise<Company> {
  //}
  

  async findAll(): Promise<Company[]> {
    const snapshot = await this.getFirestore().collection('company').get();

    return snapshot.docs.map(doc => {
      return new Company({ id: doc.id, ...doc.data() });
    });
  }

  async findById(id: string): Promise<Company> {
    const company = await this.getFirestore()
      .collection('company')
      .doc(id)
      .get();

    if (!company.exists) {
      throw new Error('Company not found');
    }

    return new Company({ id: company.id, ...company.data() });
  }

  async findByName(name: string): Promise<Company> {
    const snapshot = await this.getFirestore()
      .collection('company')
      .where('name', '==', name)
      .get();

    if (snapshot.empty) {
      throw new Error('Company not found');
    }

    const companyDoc = snapshot.docs[0];
    return new Company({ id: companyDoc.id, ...companyDoc.data() });
  }

  async update(updateCompanyDto: UpdateCompanyDto): Promise<Company> {
    const company = this.getFirestore()
      .collection('company')
      .doc(updateCompanyDto.id);

    if (!(await this.exists(company.id))) {
      throw new Error('Company not found');
    }

    await company.update(updateCompanyDto as { [key: string]: any });
    return new Company({ id: company.id, ...updateCompanyDto });
  }

  async remove(id: string): Promise<void> {
    if (!(await this.exists(id))) {
      throw new Error('Company not found');
    }

    await this.getFirestore()
      .collection('company')
      .doc(id)
      .delete();
  }

  async removeByName(name: string): Promise<void> {
    const company = await this.findByName(name);

    if (!company) {
      throw new Error('Company not found');
    }

    await this.getFirestore()
      .collection('company')
      .doc(company.id)
      .delete();
  }

  async removeAll(): Promise<void> {
    const snapshot = await this.getFirestore().collection('company').get();
    snapshot.forEach(company => {
      company.ref.delete();
    });
  }
}
