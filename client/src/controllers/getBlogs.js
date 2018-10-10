export const getBlogsFromDb = () => {
    return fetch('/user/blogs', {
        method: 'get',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('loginToken')}`
        }
    }).then(res => {
        return res.json().then(result => {
            return result;
        }).then(response => {
            return response;
        });
    });
}