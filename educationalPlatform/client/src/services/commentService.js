import * as request from '../lib/request';

const baseUrl = 'http://localhost:5000/courses';

export const getAll = async (courseId) => {
    
    const result = await request.get(`${baseUrl}/${courseId}/comments`);

    return result;
};

export const create = async (courseId, text) => {

    const newComment = await request.post(`${baseUrl}/${courseId}/comments`, { text });

    return newComment;
}

export const edit = async (courseId, commentId, text) => {

    const editComment = await request.put(`${baseUrl}/${courseId}/comments/${commentId}`, text);

    return editComment;
}

export const remove = async (courseId, commentId) => await request.remove(`${baseUrl}/${courseId}/comments/${commentId}`);