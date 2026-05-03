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
    defineField({
      name: "provider",
      type: "string",
      options: {
        list: ["credentials", "google"],
      },
      readOnly: true,
    }),
    defineField({
      name: "role",
      type: "string",
      options: {
        list: ["user", "admin"],
      },
    }),
  ],
  preview: {
    select: {
      title: "name",
    },
  },
});
