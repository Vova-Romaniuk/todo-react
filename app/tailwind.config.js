/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				backgroundItem: "#1e1e1e",
				accentColor: "#ff5631",
				textColor: "#d4c3a8",
				textInput: "#696057",
			},
		},
	},
	plugins: [],
};
