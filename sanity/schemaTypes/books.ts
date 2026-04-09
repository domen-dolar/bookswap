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
      options: {
        list: ["slabo", "dobro", "odlično"],
      },
    }),
    defineField({
      name: "publishedAt",
      type: "datetime",
    }),
    defineField({
      name: "genre",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          "Biografije",
          "Družbeni romani",
          "Ekonomija in pravo",
          "Etnologija",
          "Fantastika",
          "Filozofija in religija",
          "Hobiji",
          "Igroknjige",
          "Kratka proza in eseji",
          "Kriminalni in pustolovski romani",
          "Kulinarika",
          "Literarna teorija, jezikoslovje",
          "Naravoslovje",
          "Poezija in dramatika",
          "Politologija",
          "Popotništvo",
          "Psihologija in vzgoja",
          "Slikanice",
          "Sociologija",
          "Spomini",
          "Stripi",
          "Šport",
          "Umetnost",
          "Zbirke pravljic",
          "Zdravje",
          "Zgodbice",
          "Zgodovina",
          "Zgodovinski romani",
        ],
      },
    }),
    defineField({
      name: "owner",
      type: "reference",
      to: [{ type: "users" }],
    }),
  ],
});
