// Correctly export the functions using ES6 export syntax
export const storeUserID = (id: string) => {
    localStorage.setItem('userId', id);
};

export const getUserID = () => {
    return localStorage.getItem('userId');
};

export const removeUserID = () => {
    localStorage.removeItem('userId');
};