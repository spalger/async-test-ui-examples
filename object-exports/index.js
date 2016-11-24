export default async ({ loadTests }) => {
  return {
    'console app': {
      ...await loadTests(TestProvider2),
      ...await loadTests(TestProvider3),
    }
  };
};
