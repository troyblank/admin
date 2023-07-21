import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig( () => {
	return {
		build: {
			sourcemap: true,
		},
		server: {
			port: 8000,
		},

		plugins: [
			react(),
		],
	}
} )
