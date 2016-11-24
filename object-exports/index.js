import RequestResponseTestsProvider from './request_response';
import SettingsTestsProvider from './request_response';

async function TestProvider({ loadTests }) {
  return {
    'console app': {
      ...await loadTests(RequestResponseTestsProvider),
      ...await loadTests(SettingsTestsProvider),
    }
  };
};
