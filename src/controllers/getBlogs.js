export const getBlogsFromDb = () => {
    return fetch(`https://devesh-blog.herokuapp.com/user/blogs${localStorage.getItem('loginToken') === 'undefined' || localStorage.getItem('loginToken') === 'null' ? '': '?token='+localStorage.getItem('loginToken')}`, {
        method: 'get',
        headers: {
            "Content-Type": "application/json"
        },
    }).then(res => {
        return res.json().then(result => {
            return result;
        }).then(response => {
            return response;
        });
    });
}