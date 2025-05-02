import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'

export default defineConfig({
	base: '',
	plugins: [
		TanStackRouterVite({target: 'react', autoCodeSplitting: true}),
		tailwindcss(),
		react(),
	],
	resolve: {
		alias: { 'react-dom/client': 'react-dom/profiling' }
	}
})
