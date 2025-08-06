import * as bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { config } from 'dotenv';
import { PERMISSIONS } from '../auth/constants/permissions.constant'; 

config();

const mongoUri = process.env.MONGO_URI as string; 


mongoose
  .connect(mongoUri)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

const userSchema = new mongoose.Schema({}, { strict: false });
const User = mongoose.model('User', userSchema);

async function seedSuperAdmin() {
  try {
    const email = 'superadmin@gmail.com';
    await User.deleteOne({ email });
    console.log('Existing SuperAdmin deleted');

    const hashedPassword = await bcrypt.hash('superadmin', 10);

    await User.create({
      email,
      password: hashedPassword,
      role: 'SuperAdmin',
      firstName: 'Nihal',
      lastName: 'Jaiswal',
      phone: '9329989310',
      gender: 'male',
      dob: new Date('2025-07-22'),
      joiningDate: new Date('2025-06-20'),
      department: 'engineerings',
      designation: 'MERN',
      grade: 'A',
      employmentType: 'full-time',
      address: '123 Main Street',
      city: 'indore',
      state: 'Madhya Pradesh',
      country: 'India',
      zipCode: '450331',
      panNumber: 'AFZPK7190K',
      adharNumber: '123456788764',
      bankName: 'Canara',
      branchName: 'Harsud',
      accountHolderName: 'Nihal',
      accountNumber: '12121212121',
      ifscCode: 'CNRB0005833',
      qualification: 'btech',
      institution: 'RGPV',
      yearOfPassing: 2018,
      createdBy: null,
      customPermissions: PERMISSIONS['SuperAdmin'],
      isDeleted: false,
    });

    console.log('New SuperAdmin created');
    process.exit(0);
  } catch (err) {
    console.error('Error while seeding:', err);
    process.exit(1);
  }
}

seedSuperAdmin();
