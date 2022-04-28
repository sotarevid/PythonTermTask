import { useState } from 'react';

function useToken() {
    const getToken = () => {
        return localStorage.getItem("token") ?? sessionStorage.getItem("token");
    };

    const [token, setToken] = useState(getToken());

    const saveToken = (token, remember) => {
        if (remember)
            localStorage.setItem("token", token);
        else
            sessionStorage.setItem("token", token)

        setToken(token);
    };

    const resetToken = () => {
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");

        setToken(undefined);
    };

    return [token, saveToken, resetToken]
}

export default useToken;