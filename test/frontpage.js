describe('Frontpage', function () {
  before(function (browser, done) {
    browser.url('http://localhost:8080/?mock', function() {
      done();
    });
  });

  after(function (browser, done) {
    browser.end(function() {
      done();
    });
  });

  it('should contain map', function (browser) {
    browser.expect.element('div.leaflet-map-pane').to.be.visible;
    browser.expect.element('span.title').text.to.contain('Digitransit');
  });

  describe('at Mäkelänrinne', function () {
    before(function (browser, done) {
      browser.execute(function () {
        window.mock.geolocation.setCurrentPosition(60.2, 24.95, 0)
      }, null, function (result) {
        done();
      });
    });

    describe('stops tab', function () {
      describe('when clicked', function () {
        before(function (browser, done) {
          browser.click('.tabs-row li:nth-child(2)', function () {
            done();
          });
        });

        it('should open', function (browser) {
          browser.expect.element('.frontpage-panel-wrapper').to.be.visible;
        });

        it('should contain stop cards', function (browser) {
          browser.expect.element('.cards').to.be.present.before(1000);
          browser.expect.element('.cards .card:first-child .h4').text.to.contain('MÄKELÄNRINNE');
        });

        describe('and clicked again', function() {
          before(function (browser, done) {
            browser.click('.tabs-row li:nth-child(2)', function () {
              done();
            });
          });

          it('should close', function (browser) {
            browser.expect.element('.frontpage-panel-wrapper').not.to.be.present;
          });
        });
      });
    });
  });
});
