import { useState } from 'react';

function useStorage(name) {
    const getToken = () => {
        return localStorage.getItem(name) ?? sessionStorage.getItem(name);
    };

    const [token, setToken] = useState(getToken());

    const saveToken = (token, remember) => {
        if (remember)
            localStorage.setItem(name, token);
        else
            sessionStorage.setItem(name, token)

        setToken(token);
    };

    const resetToken = () => {
        localStorage.removeItem(name);
        sessionStorage.removeItem(name);

        setToken(undefined);
    };

    return [token, saveToken, resetToken]
}

export default useStorage;