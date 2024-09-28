import connectToMongoDB from './seed';

async function seedDatabase() {
  await connectToMongoDB();
}

seedDatabase();
