export const postSharedBlog = (sharedBlog) => {
    return fetch('/public/shared', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('loginToken')}`
        },
        body: JSON.stringify(sharedBlog)
    }).then(response => {
        return response.json().then(result => {
            return result;
        }).then(res => {
            return res;
        });
    });
}

export const getSharedBlog = (id) => {
    return fetch(`/public/shared/blog?id=${id}`).then(res => {
        return res.json().then(result => {
            return result;
        }).then(finalResult => {
            return finalResult;
        });
    });
}