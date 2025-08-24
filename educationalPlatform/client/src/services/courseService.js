import * as request from '../lib/request';

const baseUrl = 'http://localhost:5000/courses';

export const getAll = async (query) => {
    if (query !== undefined && query !== '') {
        return await request.get(`${baseUrl}?search=${query}`);
    } else {
        return await request.get(baseUrl);
    }
};

export const getOne = async (courseId) => {

    const result = await request.get(`${baseUrl}/${courseId}`);

    return result;
};

export const create = async (courseData) => {
    const newCourse = await request.post(baseUrl, courseData);

    return newCourse;
}

export const edit = async (courseId, courseData) => {
    const editCourse = await request.put(`${baseUrl}/${courseId}`, courseData);

    return editCourse;
}

export const remove = async (courseId) => await request.remove(`${baseUrl}/${courseId}`);

export const getPopularCourses = async () => await request.get(`${baseUrl}/popular-courses`);

export const getMyCourses = async () => await request.get(`${baseUrl}/my-courses`);