import { removeEntry, replaceEntry } from '../common/helpers/db.helper/db.helper';
import type { User } from './entities/user.entity';

export type DbSchema = { users: User[] } & Record<string, unknown>;

export const replaceUser = (db: DbSchema, user: User): DbSchema => replaceEntry(db, user, 'users');
export const removeUser = (db: DbSchema, id: string): DbSchema => removeEntry<DbSchema, User>(db, id, 'users');
