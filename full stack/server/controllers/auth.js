const jwt = require('jsonwebtoken')

const login = (req, res) => {
    const { username, password, role } = req.body;
    if(role === 'admin'){
        if (username !== 'root' || password !== '123') {
            return res.status(200).json({msg: 'Invalid credentials'});
        }
        const token = jwt.sign({ name: username }, process.env.JWT_SECRET, {
            expiresIn: '30d'
        });
        return res.status(200).json({ msg: 'success', token});
    }
    else {
        if(username !== '1' || password !== '123') {
            return res.status(404).json({msg: 'Invalid credentials'});
        }
        const token = jwt.sign({ id: username, role: "employee" }, process.env.JWT_SECRET, {
            expiresIn: '30d'
        });
        return res.status(200).json({ msg: 'success', token});
    }
}

module.exports = {login}