import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig( () => {
	return {
		build: {
			sourcemap: true,
		},
		define: {
			global: {}, // https://github.com/aws/aws-amplify/issues/678
		},
		server: {
			port: 8000,
		},

		plugins: [
			react(),
		],
	}
} )
