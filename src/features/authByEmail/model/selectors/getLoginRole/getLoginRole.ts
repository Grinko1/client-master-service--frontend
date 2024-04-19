import { StateSchema } from '@/app/providers/StoreProvider';

const roleStr = localStorage.getItem("role");
const role = roleStr !== null && JSON.parse(roleStr)
export const getLoginRole = (state: StateSchema) => state?.loginForm?.role || role;
