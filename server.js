const express = require('express');
const db = require('./config/db.js');

const app = express();

db();

app.use(express.json({extended: false}))

app.get('/', (req, res) => {
    res.send("app is running");
})

app.use('/api/user',require('./routes/api/user.js'));
app.use('/api/profile',require('./routes/api/profile.js'));
app.use('/api/post',require('./routes/api/post.js'));
app.use('/api/auth',require('./routes/api/auth.js'));

const PORT= process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));