export const removeBlogFromDb = (blogId) => {
    return fetch('/user/blogs', {
        method: 'delete',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('loginToken')}`
        },
        body: JSON.stringify({ blogId: blogId })
    }).then(res => {
        return res.json().then(result => {
            return result;
        }).then(response => {
            return response;
        });
    });
}