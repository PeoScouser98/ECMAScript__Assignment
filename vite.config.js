// vite.config.js
import { defineConfig } from "vite";
import dns from "dns";
import path from "path";

dns.setDefaultResultOrder("verbatim");

export default defineConfig({
	server: {
		port: 3300,
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, "./src")
		}
	}
});
