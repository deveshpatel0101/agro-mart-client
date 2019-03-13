export const updateBlogs = (blogs) => {
    return fetch(`https://devesh-blog.herokuapp.com/user/blogs${localStorage.getItem('loginToken') === 'undefined' || localStorage.getItem('loginToken') === 'null' ? '': '?token='+localStorage.getItem('loginToken')}`, {
        method: 'post',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ blogs: blogs })
    }).then(res => {
        return res.json().then(result => {
            return result;
        }).then(response => {
            return response;
        });
    });
}