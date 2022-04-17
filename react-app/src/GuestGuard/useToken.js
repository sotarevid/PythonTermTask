import { useState } from 'react';

function useToken() {
    const getToken = () => {
        return localStorage.getItem("token") ?? sessionStorage.getItem("token");
    };

    const [token, setToken] = useState(getToken());

    const saveToken = (token, remember) => {
        if (!token) {
            localStorage.removeItem("token");
            sessionStorage.removeItem("token");
        }

        if (remember)
            localStorage.setItem("token", token);
        else
            sessionStorage.setItem("token", token)


        setToken(token);
    };

    return [token, saveToken]
}

export default useToken;