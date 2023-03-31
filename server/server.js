const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send('Welcome to the School Management App!');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
