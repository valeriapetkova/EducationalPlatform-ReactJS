const router = require('express').Router();

const userService = require('../services/userService');

router.post('/register', async (req, res) => {
    const { firstName, lastName, role, username, email, password, repeatPassword } = req.body;

    try {
        const data = await userService.register({ firstName, lastName, role, username, email, password, repeatPassword });

        res.cookie('auth', data.token, { httpOnly: true });

        res.status(201).json(data);

    } catch (error) {
        // console.log(error.message);
        res.status(400).json(error.message);
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const data = await userService.login({ email, password });

        res.cookie('auth', data.token, { httpOnly: true });
    
        res.status(200).json(data);

    } catch (error) {
        res.status(400).json(error.message);
    }
});

router.get('/logout', (req, res) => {
    res.clearCookie('auth');
    res.status(200).json({ message: 'Successfully logged out' })
});

//GET USER INFO
router.get('/profile', async (req, res) => {
    const token = req.cookies['auth'];
    const userId = req.user?._id;

    if (req.user) {
        try {
            const user = await userService.getUserInfo(userId, token);
    
            res.status(200).json(user); 
    
         } catch (error) {
           res.status(400).json(error.message);
        }
    } else {
        res.status(200).json({ message: 'Not logged in' });
    }
});

router.get('/edit-profile', async (req, res) => {
    const userId = req.user._id;
    
    try {
        const user = await userService.getUserEditInfo(userId);

        res.status(200).json(user); 

     } catch (error) {
       res.status(400).json(error.message);
     }
});

//UPDATE USER INFO
router.patch('/profile', async (req, res) => {
    const { firstName, lastName, username, email } = req.body;
    const userId = req.user._id;
        
    try {
            const userData = {
                firstName, 
                lastName,
                username, 
                email,
            };
        
            await userService.updateUserInfo(userId, userData);
                        
            res.status(201).json({ message: 'Updated your personal details!' }); 

        } catch (error) {
            res.status(400).json(error.message);
        }
});


module.exports = router;