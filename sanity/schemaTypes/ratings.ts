import { defineField, defineType } from "sanity";

export default defineType({
  name: "ratings",
  title: "Ratings",
  type: "document",
  fields: [
    defineField({
      name: "rating",
      type: "number",
    }),
    defineField({
      name: "book",
      type: "reference",
      to: [{ type: "books" }],
    }),
    defineField({
      name: "user",
      type: "reference",
      to: [{ type: "users" }],
    }),
  ],
});
