import * as request from '../lib/request';

const baseUrl = 'http://localhost:5000/courses';

export const getAll = async (courseId) => {

    const result = await request.get(`${baseUrl}/${courseId}/topics`);

    return result;
};

export const create = async (courseId, title, description, date, time, link) => {
    const newTopic = await request.post(`${baseUrl}/${courseId}/topics`, { title, description, date, time, link });

    return newTopic;
}

export const edit = async (courseId, topicId, title, description, date, time, link) => {
    const editTopic = await request.put(`${baseUrl}/${courseId}/topics/${topicId}`, { title, description, date, time, link });

    return editTopic;
}

export const remove = async (courseId, topicId) => await request.remove(`${baseUrl}/${courseId}/topics/${topicId}`);
