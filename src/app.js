require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());
app.use('/api/auth', require('./routes/auth/authRoutes'));
app.use('/api/products', require('./routes/api/productRoutes'));
app.listen(process.env.PORT, () => {
console.log('Server running on port ' + process.env.PORT);
});
