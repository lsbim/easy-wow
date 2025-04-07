/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  safelist: [
    'text-Warrior',
    'text-Hunter',
    'text-Shaman',
    'text-Monk',
    'text-Rogue',
    'text-DeathKnight',
    'text-Mage',
    'text-Druid',
    'text-Paladin',
    'text-Priest',
    'text-Warlock',
    'text-DemonHunter',
    'text-Evoker'
  ],
  theme: {
    extend: {
      colors: {
        'Warrior': '#c79c6e',
        'Hunter': '#abd473',
        'Shaman': '#0070de',
        'Monk': '#00ff96',
        'Rogue': '#fff468',
        'DeathKnight': '#d8332f',
        "Mage": '#69ccf0',
        "Druid": '#ff7c0a',
        "Paladin": '#f48cba',
        "Priest": '#ffffff',
        "Warlock": '#9482c9',
        "DemonHunter": '#b44dd6',
        "Evoker": '#33937f',
      }
    },
  },
  plugins: [],
}