export const storeProjectID = (id : string) =>{
    localStorage.setItem('projectId',id);
}

export const getProjectID = () =>{
    return localStorage.getItem('projectId');
}

export const removeProjectID = () =>{
    localStorage.removeItem('projectId');
}