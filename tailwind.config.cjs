/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		screens: {
			sm: {
				min: "375px",
				max: "767px",
			},

			md: {
				min: "768px",
				max: "1023px",
			},
			lg: {
				min: "1024px",
				max: "1365px",
			},

			xl: { min: "1366px" },
		},
		extend: {
			animation: {
				fadeInOut: "fadeIn .3s linear, fadeOut .3s linear 1s forwards",
				jumping: "jumping 1.2s linear infinite",
				rotate: "rotate 1.2s linear infinite",
			},
			keyframes: {
				fadeIn: {
					"0%": { opacity: "0", transform: "translateX(50%)" },
					"100%": { opacity: "1", transform: "translateX(0)" },
				},
				fadeOut: {
					"100%": { transform: "translateY(-200%)", opacity: "0" },
				},
				jumping: {
					"0%": { height: "10%" },
					"50%": { height: "50%" },
					"100%": { height: "10%;" },
				},
				rotate: {
					"100%": { rotate: "360deg" },
				},
			},
		},
	},
	plugins: [require("daisyui")],
};
