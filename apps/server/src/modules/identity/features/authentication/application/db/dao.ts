export type UserRecord = {
	id: string;
	email: string;
};

export interface AuthenticationDAO {
	findUserByEmail(email: string): Promise<UserRecord | null>;
	findUserById(id: string): Promise<UserRecord | null>;
}
