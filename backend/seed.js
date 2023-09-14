const mongoose = require('mongoose');
const faker = require('faker');
const CarWash = require('./models/carwashes');
const User = require('./models/user');
const Staff = require('./models/staff');

// Connect to your MongoDB database
mongoose.connect('mongodb+srv://admin-Jackson:jaydenjackson1@cluster0.bnu3c.mongodb.net/carwash-3?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Seed dummy data
const seedData = async () => {
  try {
    // Create car washes
    const carWashes = [];
    for (let i = 0; i < 5; i++) {
      const carWash = await CarWash.create({
        name: faker.company.companyName(),
        location: faker.address.city(),
        users: [],
        staff: [],
      });
      carWashes.push(carWash);
    }

    // Create users
    const users = [];
    for (let i = 0; i < 10; i++) {
      const phone = faker.phone.phoneNumber();
      const numberPlate = faker.random.alphaNumeric(6).toUpperCase();
      const existingUser = await User.findOne({ phone, numberPlate });
      
      if (existingUser) {
        console.log(`Skipping duplicate phone number: ${phone, numberPlate}`);
        continue;
      }
    
      const user = await User.create({
        name: faker.name.firstName(),
        email: faker.internet.email(),
        password: 'password123', // Replace with an actual password
        phone: phone,
        number_plate: numberPlate,
      });
      users.push(user);

      // Create wash history for each user
      for (let j = 0; j < 3; j++) {
        const wash = {
          date: faker.date.past(),
          status: 'Completed',
        };
        user.washHistory.push(wash);
      }

      await user.save();
    }

    // Create staff
    const staff = [];
    for (let i = 0; i < 5; i++) {
      const staffMember = await Staff.create({
        name: faker.name.findName(),
        phone: faker.phone.phoneNumber(),
        password: faker.internet.password(),
        carwash: carWashes[Math.floor(Math.random() * carWashes.length)]._id,
      });
      staff.push(staffMember);
    }

    console.log('Seed data inserted successfully.');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    // Disconnect from the database
    mongoose.disconnect();
  }
};

// Call the seedData function to seed the data
seedData();
