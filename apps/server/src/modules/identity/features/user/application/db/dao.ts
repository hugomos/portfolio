export interface UserRecord {
	id: string;
	email: string;
}

export interface UserDAO {
	findById(id: string): Promise<UserRecord | null>;
}
