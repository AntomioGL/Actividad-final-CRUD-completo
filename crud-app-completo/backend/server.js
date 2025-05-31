const express = require('express');
const cors = require('cors');
const app = express();
const itemsRoutes = require('./routes/items');

app.use(cors());
app.use(express.json());
app.use('/api/items', itemsRoutes);

const PORT = 3001;
app.listen(PORT, () => console.log(`Server on http://localhost:${PORT}`));