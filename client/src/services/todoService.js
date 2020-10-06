export default {
    getTodos: () => {
        return fetch('/api/user/todos').then(res => {
            if (res.status !== 401) {
                return res.json().then(data => data);
            } else {
                return { msgBody: "Unauthorized", msgErr: true }
            }
        })
    },
    postTodo: todo => {
        return fetch('/api/user/todo', {
            method: "POST",
            body: JSON.stringify(todo),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => {
            if (res.status !== 401) {
                return res.json().then(data => data);
            } else {
                return { msgBody: "Unauthorized", msgErr: true }
            }
        })
    }
}