const router = require('express').Router();

const commentService = require('../services/commentService');
const courseService = require('../services/courseService');

router.get('/', async (req, res) => {
        const courseId = req.courseId;

        try {
                const comments = await courseService.getOneWithComments(courseId);
                
                res.status(200).json(comments.comments);

        } catch (error) {
                res.status(400).json(error.message);
        }
});

router.post('/', async (req, res) => {
    const { text } = req.body;
    const courseId = req.courseId;

        try {
                const comment = await commentService.create({
                    text, 
                    _ownerId: req.user._id,
                    courseId
                });
    
                res.status(201).json(comment);
        } catch(error) {
            res.status(400).json(error.message);
        }
});

router.delete('/:commentId', async (req, res) => {
        const { commentId } = req.params;
        const currentUser = req.user._id;
        const courseId = req.courseId;
        
        const commentOwner = await commentService.checkCommentOwner(commentId);
        
        if(commentOwner.toString() !== currentUser.toString()) {
                throw new Error('You have no permission to delete this comment!');
        }
        
        try {
                await commentService.delete(commentId, courseId);
                res.status(200).json({ message: 'Success deleted comment!' });
        } catch (error) {
               res.status(400).json(error.message);
        }
}); 

router.put('/:commentId', async (req, res) => {
       const { commentId } = req.params;
       const currentUser = req.user._id;
       const { text } = req.body;

    try {
                const commentOwner = await commentService.checkCommentOwner(commentId);
               
                if(commentOwner.toString() !== currentUser.toString()) {
                    throw new Error('You have no permission to edit this comment!');
                }

               await commentService.update(commentId, { text });
                        
               res.status(201).json({ message: 'Updated comment!' }); 
        } catch (error) {
            res.status(400).json(error.message);
        }
}); 

module.exports = router;