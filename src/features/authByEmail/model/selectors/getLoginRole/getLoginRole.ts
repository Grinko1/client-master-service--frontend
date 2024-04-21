import { StateSchema } from '@/app/providers/StoreProvider';

const roleStr = localStorage.getItem("role");
const role = roleStr !== null && JSON.parse(roleStr)
console.log(role, "from localStorage");
export const getLoginRole = (state: StateSchema) => state?.loginForm?.role || role;
