require('dotenv').config();
const mongoose = require('mongoose');

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
    const user = await User.findOne({ email: 'demo@example.com' });
    if (!user) {
      console.error('Demo user not found. Run seed first.');
      process.exit(1);
    }

    // Update: increase every item price by 10% and mark first item as favorite
    const items = await Item.find({ user: user._id });
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const newPrice = Math.round(item.price * 1.1);
      item.price = newPrice;
      item.favorite = i === 0 ? true : item.favorite;
      await item.save();
    }

    // Update list budgets: add 200 to each list budget
    const lists = await List.find({ user: user._id });
    for (const list of lists) {
      list.budget = (list.budget || 0) + 200;
      await list.save();
    }

    // Compute dashboard-like stats
    const itemCount = await Item.countDocuments({ user: user._id });
    const listCount = await List.countDocuments({ user: user._id });
    const favoriteCount = await Item.countDocuments({ user: user._id, favorite: true });
    const listsAfter = await List.find({ user: user._id });
    const totalBudget = listsAfter.reduce((s, l) => s + (l.budget || 0), 0);

    console.log('Update complete. Dashboard stats:');
    console.log('Items:', itemCount);
    console.log('Lists:', listCount);
    console.log('Favorites:', favoriteCount);
    console.log('TotalBudget:', totalBudget);

    process.exit(0);
  } catch (err) {
    console.error('Update failed:', err);
    process.exit(1);
  }
}

main();
