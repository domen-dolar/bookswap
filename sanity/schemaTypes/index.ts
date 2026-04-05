import { type SchemaTypeDefinition } from "sanity";
import users from "./users";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [users],
};
