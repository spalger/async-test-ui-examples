
export async({ getService, getPageObjects }) => {
  const log = await getService('log');
  const PageObjects = await getPageObjects(['common', 'console']);

  await describe('settings', async () => {
    before(async () => {
      log.debug('navigateTo console');
      await PageObjects.common.navigateToApp('console', false);
    });

    await describe('settings should allow changing the text size', async () => {
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
    });
  });
}