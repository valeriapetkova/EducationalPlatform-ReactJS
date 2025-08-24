const buildOptions = (data) => {
    const options = {};

    if (data) {
        options.body = JSON.stringify(data);
        options.headers = {
            'content-type': 'application/json'
        };
    }

    return options;
};

const request = async (method, url, data) => {
    try {
        const response = await fetch(url, {
            ...buildOptions(data),
            method,
            credentials: 'include',
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
        }

        if (response.status === 204) { 
            return {};
        } else {
            return await response.json();
        }
    } catch (error) {
        alert(error.message);
        throw error;
    }
};

export const get = request.bind(null, 'GET');
export const post = request.bind(null, 'POST');
export const put = request.bind(null, 'PUT');
export const remove = request.bind(null, 'DELETE');
export const patch = request.bind(null, 'PATCH');