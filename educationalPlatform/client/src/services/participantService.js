import * as request from '../lib/request';

const baseUrl = 'http://localhost:5000/courses';

export const getAll = async (courseId) => {

    const result = await request.get(`${baseUrl}/${courseId}/participants`);

    return result;
};

export const joinCourse = async (courseId) => await request.post(`${baseUrl}/${courseId}/participants/join-course`);