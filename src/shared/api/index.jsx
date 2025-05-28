const httpRequest = async ({ method, route, body, headers, onSuccess, onError }) => {
    const token = localStorage.getItem('token');
    const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};
    
    fetch(`${process.env.REACT_APP_SERVER_URL}${route}`, {
        method,
        body: body ? JSON.stringify(body) : null,
        headers: {
        "Content-Type": "application/json",
        ...headers,
        ...authHeaders
        },
    }).then(response => {
            response.json().then(data => {
                if (response.ok && data) {
                    onSuccess(data)
                } else {
                    onError?.(data);
                }
            }).catch(error => {
                if (response.ok && response) {
                    onSuccess(response)
                } else {
                    onError?.(response);
                }
            })
    }); 
}

export const route = (route) => ({
    get: async ({ onSuccess, onError }) => {
        httpRequest({ method: 'GET', route, onSuccess, onError });
    },
    post: ({ body, headers, onSuccess, onError }) => {
        httpRequest({ method: 'POST', route, body, headers, onSuccess, onError });
    },
    put: ({ body, onSuccess, onError }) => {
        httpRequest({ method: 'PUT', route, body, onSuccess, onError });
    },
    delete: ({ onSuccess, onError }) => {
        httpRequest({ method: 'DELETE', route, onSuccess, onError });
    }
})