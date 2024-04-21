
export const hasRole = (requiredRole: string): boolean => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.role && user.role === requiredRole;
};
export const isAuthenticated = (): boolean => {
    const token = localStorage.getItem('jwtToken');
    return !!token; // Returns true if token exists, false otherwise
};
export const logout = () => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('user');
}