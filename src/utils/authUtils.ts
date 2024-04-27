
export const hasRole = (requiredRole: string): boolean => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    console.log(" user.role  : ", user.role);
    return user.role && user.role === requiredRole;
};
export const isAuthenticated = (): boolean => {
    const token = localStorage.getItem('jwtToken');
    return !!token; 
};
export const logout = () => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('user');
}