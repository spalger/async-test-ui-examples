import expect from 'expect.js';

const DEFAULT_REQUEST = `

GET _search
{
  "query": {
    "match_all": {}
  }
}

`.trim();

export default async ({ getService, getPageObjects }) => {
  const log = await getService('log');
  const PageObjects = await getPageObjects(['common', 'console']);

  return {
    'request/response': {
      async before() {
        log.debug('navigateTo console');
        await PageObjects.common.navigateToApp('console', false);
      },

      async 'should show the default request'() {
        await PageObjects.common.saveScreenshot('Console-help-expanded');

        // collapse the help pane because we only get the VISIBLE TEXT, not the part that is scrolled
        await PageObjects.console.collapseHelp();
        await PageObjects.common.saveScreenshot('Console-help-collapsed');
        await PageObjects.common.try(async () => {
          const actualRequest = await PageObjects.console.getRequest();
          expect(actualRequest.trim()).to.eql(DEFAULT_REQUEST);
        });
      },

      async 'default request response should contain .kibana'() {
        const expectedResponseContains = '"_index": ".kibana",';

        await PageObjects.console.clickPlay();
        await PageObjects.common.saveScreenshot('Console-default-request');
        return PageObjects.common.try(async () => {
          const actualResponse = await PageObjects.console.getResponse();
          log.debug(actualResponse);
          expect(actualResponse).to.contain(expectedResponseContains);
        });
      }
    }
  };
};
