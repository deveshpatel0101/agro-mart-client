export const postLoginData = (formData) => {
    return fetch('/user/login', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    }).then(response => {
        return response.json().then(res => {
            return res;
        });
    }).then(res => {
        return res;
    }).catch(err => {
        console.error(err);
        return err;
    });
}