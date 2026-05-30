// sw.js - Intercepts the config request to inject your live network data
self.addEventListener('fetch', function(event) {
  if (event.request.url.includes('config.xml')) {
    event.respondWith(
      Promise.all([
        fetch('https://ipwho.is/').then(r => r.json()),
        fetch(event.request)
      ])
      .then(([ipData, xmlResponse]) => xmlResponse.text().then(xmlText => {
        var realIP = ipData.ip || "Unknown IP";
        var realISP = (ipData.connection && ipData.connection.isp) || "Local ISP";

        // This replaces the text your Flash player sees, keeping your layout identical
        var modifiedXml = xmlText
          .replace('ip="yourip"', 'ip="' + realIP + '"')
          .replace('isp="yourisp"', 'isp="' + realISP + '"');

        return new Response(modifiedXml, {
          headers: { 'Content-Type': 'text/xml' }
        });
      }))
      .catch(() => fetch(event.request))
    );
  }
});