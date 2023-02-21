import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = sanityClient({
  projectId: 'ehvlkblo',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2021-10-21',
});

const builder = imageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}
