import { defineField, defineType } from "sanity";

export default defineType({
  name: "chats",
  title: "Chats",
  type: "document",
  fields: [
    defineField({
      name: "message",
      type: "text",
    }),
    defineField({
      name: "timestamp",
      type: "datetime",
    }),
    defineField({
      name: "book",
      type: "reference",
      to: [{ type: "books" }],
    }),
    defineField({
      name: "messenger",
      type: "reference",
      to: [{ type: "users" }],
    }),
    defineField({
      name: "receiver",
      type: "reference",
      to: [{ type: "users" }],
    }),
  ],
  preview: {
    select: {
      title: "message",
    },
  },
});
