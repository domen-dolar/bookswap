import { defineField, defineType } from "sanity";

export default defineType({
  name: "users",
  title: "Users",
  type: "document",
  fields: [
    defineField({
      name: "name",
      type: "string",
    }),
    defineField({
      name: "email",
      type: "string",
    }),
    defineField({
      name: "password",
      type: "string",
      hidden: true,
    }),
  ],
  preview: {
    select: {
      title: "name",
    },
  },
});
