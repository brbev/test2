const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const apiRoutes = require('./routes/api');

app.use('/api', apiRoutes);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send('Welcome to the School Management App API!');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
