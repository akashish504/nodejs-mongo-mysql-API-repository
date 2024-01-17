const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {sqlDBconnection} = require('./../db_connections/database');

const createUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        let user = [];
        await sqlDBconnection.promise().query(
        `SELECT * FROM user_db WHERE username = '${username}';`)
        .then(([rows, fields]) => {
            user = rows;
        })
        .catch(console.log)

        if (user.length != 0) {
            return res.status(401).json({ error: 'Username already exists' });
        };

        const hashedPassword = await bcrypt.hash(password, 10);
        await sqlDBconnection.promise().query(
            `INSERT INTO user_db (username, password) VALUES ('${username}', '${hashedPassword}');`
        ).then((res) => {
            console.log("user created :", username);
        })
        .catch(console.log)
        return res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Registration failed' });
    }
}

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        let user = [];
        await sqlDBconnection.promise().query(
        `SELECT * FROM user_db WHERE username = '${username}';`)
        .then(([rows, fields]) => {
            user = rows;
        })
        .catch(console.log)
        if (user.length == 0) {
            return res.status(401).json({ error: 'User does not exists;' });
        };

        const passwordMatch = await bcrypt.compare(password, user[0].password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Authentication failed: Wrong Pasword' });
        }
        const token = jwt.sign({ userId: user._id }, 'your-secret-key', {
            expiresIn: '1h',
        });
        return res.status(200).json({ token: 'Bearer '+ token });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Login failed' });
    }
}

module.exports = {
    createUser,
    login,
  }
  