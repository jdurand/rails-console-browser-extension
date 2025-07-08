chrome.devtools.inspectedWindow.eval(
  `(function() {
    try {
      const port = window.location.port;
      const protocol = window.location.protocol;
      const hostname = window.location.hostname;

      if (port === '') return {};

      function check(url) {
        try {
          const xhr = new XMLHttpRequest();
          xhr.open('GET', url, false); // synchronous
          xhr.send(null);
          return { url, ok: xhr.statusText === 'OK' };
        } catch (_) {
          return { ok: false };
        }
      }

      // First try on current origin
      const { ok, url } = check('/debug/console');
      if (ok) { return { ok, url: protocol + '//' + hostname + ':' + port + url }; }

      // Retry on fallback port 3000
      return check(protocol + '//' + hostname + ':3000/debug/console');
    } catch (e) {
      return { ok: false };
    }
  })()`,
  function({ ok, url }, isException) {
    if (!isException && ok === true) {
      chrome.devtools.panels.create(
        "IRB",
        "icon.png",
        `panel.html?console-url=${encodeURIComponent(url)}`,
        function(panel) {
          // Panel created
          // console.log({ panel });
        }
      );
    }
  }
);
