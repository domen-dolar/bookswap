import { defineField, defineType } from "sanity";

export default defineType({
  name: "comments",
  title: "Comments",
  type: "document",
  fields: [
    defineField({
      name: "comment",
      type: "text",
    }),
    defineField({
      name: "timestamp",
      type: "datetime",
    }),
    defineField({
      name: "commentator",
      type: "reference",
      to: [{ type: "users" }],
    }),
    defineField({
      name: "book",
      type: "reference",
      to: [{ type: "users" }],
    }),
  ],
});
