const jwt = require('../lib/jwt');
const { SECRET } = require('../constants');

exports.auth = async (req, res, next) => {
    const token = req.cookies['auth'];

    if (token) {
        try {
            const decodedToken = await jwt.verify(token, SECRET);

            req.user = decodedToken;

            next();
        } catch(error) {
            res.status(401).json({ error: error.message })
            res.clearCookie('auth');
        }
    } else {
        next();
    }
};

exports.isAuth = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: 'You should sign in! '});
    }

    next();
}
