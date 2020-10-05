export default {
    login: user => {
        return fetch('/api/user/login', {
            method: 'POST',
            body: JSON.stringify(user),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if (res.status !== 401) {
                return res.json().then(data => data);
            } else {
                return { isAuthenticated: false, user: { username: "", role: "" } };
            }
        })
    },
    register: user => {
        return fetch('/api/user/register', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
          .then(data => data);
    },
    logout: () => {
        return fetch('/api/user/logout', {
            credentials: "include"
          }).then(res => res.json()).then(data => data);
    },
    isAuthenticated: () => {
        return fetch('/api/user/authenticated').then(res => {
            if (res.status !== 401) {
                return res.json().then(data => data);
            } else {
                return { isAuthenticated: false, user: { username: "", role: "" } };
            }
        })
    }
}