export default async({ loadTest }) => {
  await describe('console app', async () => {
    await loadTest(testProvider2);
    await loadTest(testProvider3);
  });
};