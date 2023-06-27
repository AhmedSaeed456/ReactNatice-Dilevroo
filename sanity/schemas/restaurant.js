import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'restaurant',
  title: 'Restaurant',
  type: 'document',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Restaurant name',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      type: 'string',
      title: 'Short description',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'image',
      type: 'image',
      title: 'Image of restaurant',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'lat',
      type: 'number',
      title: 'Latitude of restaurant',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'long',
      type: 'number',
      title: 'Longitude of restaurant',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'address',
      type: 'string',
      title: 'Restaurant address',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'rating',
      type: 'number',
      title: 'Enter a rating between (1-5 stars)',
      validation: (Rule) =>
        Rule.required().min(1).max(5).error('please enter values between 1 - 5'),
    },
    {
      name: 'type',
      type: 'string',
      title: 'Category',
      validation: (Rule) => Rule.required(),
      type: 'reference',
      to: [{type: 'category'}],
    },
    {
      name: 'dishes',
      type: 'array',
      title: 'Dishes',
      of: [{type: 'reference', to: [{type: 'dish'}]}],
    },
  ],
})
