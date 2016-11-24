export default async ({ describe }) => {
  return describe('console app')
    .load(TestProvider2)
    .load(TestProvider3);
};