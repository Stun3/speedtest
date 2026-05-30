// sw.js - Updated to catch both XML and PHP configurations
self.addEventListener('fetch', function(event) {
  // Check for both the XML and the PHP file requests
  if (event.request.url.includes('config.xml') || event.request.url.includes('speedtest-config.php')) {
    event.respondWith(
      Promise.all([
        fetch('https://ipwho.is/').then(r => r.json()),
        fetch(event.request)
      ])
      .then(([ipData, xmlResponse]) => xmlResponse.text().then(xmlText => {
        var realIP = ipData.ip || "Unknown IP";
        var realISP = (ipData.connection && ipData.connection.isp) || "Local ISP";

        // Replace the placeholders
        var modifiedXml = xmlText
          .replace(/yourip/g, realIP)
          .replace(/yourisp/g, realISP);

        return new Response(modifiedXml, {
          headers: { 'Content-Type': 'text/xml' }
        });
      }))
      .catch(() => fetch(event.request))
    );
  }
});
