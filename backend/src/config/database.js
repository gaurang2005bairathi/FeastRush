const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');
const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.error('❌ MONGODB_URI is not defined in .env');
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    const msg = error.message || '';

    if (msg.includes('querySrv') || msg.includes('ECONNREFUSED')) {
      console.error('❌ MongoDB DNS/SRV lookup failed — try adding ?directConnection=false or use the direct node URI from Atlas');
    } else if (msg.includes('Authentication failed') || msg.includes('bad auth')) {
      console.error('❌ MongoDB authentication failed — check your username/password in .env');
    } else if (msg.includes('getaddrinfo') || msg.includes('ENOTFOUND')) {
      console.error('❌ MongoDB host not found — check the cluster hostname in MONGODB_URI');
    } else if (msg.includes('Server selection timed out')) {
      console.error('❌ MongoDB timed out — your IP may not be whitelisted in Atlas Network Access');
    } else {
      console.error(`❌ MongoDB Connection Error: ${msg}`);
    }

    process.exit(1);
  }
};

module.exports = connectDB;
