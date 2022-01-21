import { getAuth, User, OAuthProvider } from 'firebase/auth';

export const auth = getAuth();

export const logOut = (): Promise<void> => {
	return auth.signOut();
};
export const signOut = logOut;

export const logIn = (): Promise<User> => {
	const provider = new OAuthProvider('discord.com');
};
