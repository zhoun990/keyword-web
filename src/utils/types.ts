import { Database } from "./database.types";

type Tables = Database["public"]["Tables"];
export type Post = Tables["posts"]["Row"];
export type Keyword = Tables["keywords"]["Row"];
export type UserData = Tables["users"]["Row"];
export type DecryptedUser = Tables["decrypted_users"]["Row"];
export type ReactedUser = Tables["reacted_users"]["Row"];
export type Reaction = Tables["reactions"]["Row"];
