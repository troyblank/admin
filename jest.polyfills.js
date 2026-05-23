const v8 = require('node:v8')

// jsdom does not provide structuredClone; Amplify adapter-nextjs needs it at import time.
if (typeof globalThis.structuredClone !== 'function') {
	globalThis.structuredClone = (value) => v8.deserialize(v8.serialize(value))
}
