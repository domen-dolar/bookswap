import { defineField, defineType } from "sanity";

export default defineType({
  name: "books",
  title: "Books",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "images",
      type: "array",
      of: [{ type: "image" }],
    }),
    defineField({
      name: "author",
      type: "string",
    }),
    defineField({
      name: "publishmentYear",
      type: "number",
    }),
    defineField({
      name: "condition",
      type: "string",
    }),
    defineField({
      name: "publishedAt",
      type: "datetime",
    }),
    defineField({
      name: "genre",
      type: "string",
    }),
    defineField({
      name: "owner",
      type: "reference",
      to: [{ type: "users" }],
    }),
  ],
});
