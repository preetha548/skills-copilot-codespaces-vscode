import FingerprintJS from '@fingerprintjs/fingerprintjs';

(async () => {
	// We recommend to call `load` at application startup.
	const fp = await FingerprintJS.load();

	// The FingerprintJS agent is ready.
	// Get a visitor identifier when you'd like to.
	const result = await fp.get();

	console.log(result);

	// This is the visitor identifier:
	const visitorId = result.visitorId;

	document.getElementById('visitor-id').innerHTML = visitorId;

	console.log(visitorId);
})();
