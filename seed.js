require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = require('./models/User');
const Item = require('./models/Item');
const List = require('./models/List');

const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/smart-grocery';

async function main() {
  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB:', uri);
  } catch (err) {
    console.error('MongoDB connect failed:', err.message);
    process.exit(1);
  }

  try {
    await User.deleteMany({});
    await Item.deleteMany({});
    await List.deleteMany({});

    const passwordHash = await bcrypt.hash('password123', 10);
    const user = await User.create({ name: 'Demo User', email: 'demo@example.com', password: passwordHash });

    const items = await Item.insertMany([
      { user: user._id, name: 'Milk',         category: 'Dairy',   price: 60,  favorite: true  },
      { user: user._id, name: 'Rice',         category: 'Grains',  price: 80,  favorite: false },
      { user: user._id, name: 'Apple',        category: 'Fruits',  price: 120, favorite: true  },
      { user: user._id, name: 'Bread',        category: 'Bakery',  price: 45,  favorite: false },
      { user: user._id, name: 'Eggs',         category: 'Dairy',   price: 90,  favorite: false },
      { user: user._id, name: 'Tomato',       category: 'Veggies', price: 30,  favorite: false },
      { user: user._id, name: 'Potato',       category: 'Veggies', price: 25,  favorite: false },
      { user: user._id, name: 'Chicken',      category: 'Meat',    price: 250, favorite: true  },
      { user: user._id, name: 'Olive Oil',    category: 'Pantry',  price: 350, favorite: false },
      { user: user._id, name: 'Dark Chocolate', category: 'Snacks', price: 180, favorite: true }
    ]);

    const id = name => items.find(i => i.name === name)._id;

    const lists = await List.insertMany([
      { user: user._id, name: 'Weekly Groceries', budget: 1000, completed: false,
        items: [id('Milk'), id('Rice'), id('Apple'), id('Bread'), id('Eggs')] },
      { user: user._id, name: 'Quick Breakfast',  budget: 300,  completed: false,
        items: [id('Milk'), id('Bread'), id('Eggs')] },
      { user: user._id, name: 'Veggie Run',       budget: 200,  completed: true,
        items: [id('Tomato'), id('Potato')] },
      { user: user._id, name: 'Party Snacks',     budget: 800,  completed: false,
        items: [id('Dark Chocolate'), id('Bread'), id('Chicken')] },
      { user: user._id, name: 'Sunday Dinner',    budget: 700,  completed: false,
        items: [id('Chicken'), id('Olive Oil'), id('Potato')] },
      { user: user._id, name: 'Healthy Basket',   budget: 600,  completed: false,
        items: [id('Apple'), id('Tomato'), id('Olive Oil')] },
      { user: user._id, name: 'Monthly Pantry',   budget: 1500, completed: false,
        items: [id('Rice'), id('Olive Oil'), id('Eggs'), id('Milk')] },
      { user: user._id, name: 'Office Stock',     budget: 400,  completed: true,
        items: [id('Dark Chocolate'), id('Apple')] },
      { user: user._id, name: 'Weekend BBQ',      budget: 1200, completed: false,
        items: [id('Chicken'), id('Potato'), id('Tomato'), id('Olive Oil')] },
      { user: user._id, name: 'Tea Time',         budget: 250,  completed: false,
        items: [id('Milk'), id('Dark Chocolate'), id('Bread')] }
    ]);

    console.log('Seed complete. Created:');
    console.log('User:', { id: user._id, email: user.email });
    console.log('Items:', items.length);
    console.log('Lists:', lists.length);

    process.exit(0);
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exit(1);
  }
}

main();
