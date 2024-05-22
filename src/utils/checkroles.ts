import { jwtDecode } from "jwt-decode";

export const checkAdmin = (token: any) => {
    try {
        const decodedToken: any = jwtDecode(token)
        return decodedToken.roles.includes('ADMIN');
    } catch (error) {
        console.error('Error decoding token:', error);
        return false;
    }
}