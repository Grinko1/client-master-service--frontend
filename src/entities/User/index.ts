export { initAuthData } from './model/services/initAuthData';


export { UserRole } from './model/consts/consts';

// export {
//   isUserAdmin,
//   isUserManager,
//   getUserRoles,
// } from './model/selectors/getUserRole/getUserRole';

export { getUserAuthData } from './model/selectors/getUserAuthData/getUserAuthData';

export { getUserInited } from './model/selectors/getUserInited/getUserInited';

export { userReducer, userActions } from './model/slice/userSlice';
export type { UserSchema } from './model/types/user';

