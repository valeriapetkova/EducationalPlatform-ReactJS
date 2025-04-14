const router = require('express').Router();

const topicService = require('../services/topicService');
const courseService = require('../services/courseService'); 

router.get('/', async (req, res) => {
        const courseId = req.courseId;
        console.log('from topic controller');

        try {
                const topics = await courseService.getOneWithTopics(courseId);
                
                console.log('from comment controller topics', topics.topics);
                res.status(200).json(topics.topics);

        } catch (error) {
                res.status(400).json(error.message);
        }
});

router.post('/', async (req, res) => {
    const { title, description, date, time, link } = req.body;
    const courseId = req.courseId;

        try {
                const topicData = {
                            title,
                            description, 
                            date,
                            time,
                            link, 
                            _ownerId: req.user._id,
                            courseId
                };
                const topic = await topicService.create(topicData);
            
                res.status(201).json(topic);
        } catch(error) {
            res.status(400).json(error.message);
        }
});

router.delete('/:topicId', async (req, res) => {
        const { topicId } = req.params;
        const currentUser = req.user._id;
        const courseId = req.courseId;
                
        const topicOwner = await topicService.checkTopicOwner(topicId);
                
        if(topicOwner.toString() !== currentUser.toString()) {
                throw new Error('You have no permission to delete this topic!');
        }

        try {
                await topicService.delete(topicId, courseId);
                res.status(200).json({ message: 'Success deleted topic!' });
        } catch (error) {
               res.status(400).json(error.message);
        }
});

router.put('/:topicId', async (req, res) => {
       const { topicId } = req.params;
       const currentUser = req.user._id;
       const { title, description, date, time, link } = req.body;
        
    try {
                const topicData = {
                        title,
                        description, 
                        date,
                        time,
                        link, 
                };

               const topicOwner = await topicService.checkTopicOwner(topicId);
                              
                if(topicOwner.toString() !== currentUser.toString()) {
                        throw new Error('You have no permission to edit this topic!');
                }

               await topicService.update(topicId, topicData);
                        
               res.status(201).json({ message: 'Updated topic!' }); 
        } catch (error) {
            res.status(400).json(error.message);
        }
});

module.exports = router;