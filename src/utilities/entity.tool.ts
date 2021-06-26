export const createSlug = (title: string) => {
  const charsToRemove = ['/'];
  let slug = title.split(' ').join('-');

  charsToRemove.forEach((char) => {
    slug = slug.split(char).join('');
  });

  return slug;
};
