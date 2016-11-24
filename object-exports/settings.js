import expect from 'expect.js';

export default async ({ describe, getService, getPageObjects }) => {
  const log = await getService('log');
  const PageObjects = await getPageObjects(['common', 'console']);

  return {
    'settings tests': {
      async before() {
        log.debug('navigateTo console');
        await PageObjects.common.navigateToApp('console', false);
      },

      async 'settings should allow changing the text size'() {
        await PageObjects.console.setFontSizeSetting(20);
        await PageObjects.common.try(async () => {
          // the settings are not applied synchronously, so we retry for a time
          expect(await PageObjects.console.getRequestFontSize()).to.be('20px');
        });

        await PageObjects.console.setFontSizeSetting(24);
        await PageObjects.common.try(async () => {
          // the settings are not applied synchronously, so we retry for a time
          expect(await PageObjects.console.getRequestFontSize()).to.be('24px');
        });
      }
    }
  };
};
