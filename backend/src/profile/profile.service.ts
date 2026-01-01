import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from '../schema/customer.schema';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Customer)
    private customerRepo: Repository<Customer>,
  ) {}

  async getProfile(customerId: string) {
    const customer = await this.customerRepo.findOne({
      where: { id: customerId },
    });

    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    return {
      id: customer.id,
      email: customer.email,
      firstName: customer.firstName,
      lastName: customer.lastName,
      dateOfBirth: customer.dateOfBirth,
      phoneNumber: customer.phoneNumber,
      isGoogleLogin: customer.isGoogleLogin,
      googleProfilePicUrl: customer.googleProfilePicUrl,
      hasProfilePicture: !!customer.profilePicture,
    };
  }

  async updateProfile(customerId: string, updateData: any) {
    const customer = await this.customerRepo.findOne({
      where: { id: customerId },
    });

    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    // Update allowed fields
    if (updateData.firstName) customer.firstName = updateData.firstName;
    if (updateData.lastName) customer.lastName = updateData.lastName;
    if (updateData.dateOfBirth) customer.dateOfBirth = updateData.dateOfBirth;
    if (updateData.phoneNumber) customer.phoneNumber = updateData.phoneNumber;

    await this.customerRepo.save(customer);

    return {
      id: customer.id,
      email: customer.email,
      firstName: customer.firstName,
      lastName: customer.lastName,
      dateOfBirth: customer.dateOfBirth,
      phoneNumber: customer.phoneNumber,
    };
  }

  async uploadProfilePicture(customerId: string, file: Buffer) {
    if (!file || file.length === 0) {
      throw new BadRequestException('No file provided');
    }

    const customer = await this.customerRepo.findOne({
      where: { id: customerId },
    });

    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    customer.profilePicture = file;
    await this.customerRepo.save(customer);

    return {
      message: 'Profile picture updated successfully',
      id: customer.id,
    };
  }

  async getProfilePicture(customerId: string) {
    const customer = await this.customerRepo.findOne({
      where: { id: customerId },
    });

    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    if (!customer.profilePicture) {
      throw new NotFoundException('Profile picture not found');
    }

    return customer.profilePicture;
  }
}
