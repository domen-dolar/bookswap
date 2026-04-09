import { type SchemaTypeDefinition } from "sanity";
import users from "./users";
import books from "./books";
import comments from "./comments";
import ratings from "./ratings";
import chats from "./chats";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [users, books, comments, ratings, chats],
};
