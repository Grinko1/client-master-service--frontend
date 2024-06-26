import { StateSchema } from '@/app/providers/StoreProvider';

const email = localStorage.getItem("email") !== null ? String(localStorage.getItem("email")) : '';
console.log("email from localstorage", email);

export const getLoginEmail = (state: StateSchema) => state?.loginForm?.email || email;
