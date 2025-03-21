/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          20: '#00265E',
          30: '#003076',
          40: '#00398D',
          50: '#0042A5',
          60: '#114AB0',
          70: '#0055D4',
          80: '#005EEB',
          90: '#0B6DFF',
          100: '#2A7FFF',
          110: '#4A92FF',
          120: '#69A5FF',
          130: '#88B8FF',
          140: '#A7CAFF',
          150: '#C7DDFF',
          160: '#E6F0FF'
        },
        gray: {
          190: '#201F1E',
          180: '#252423',
          170: '#292827',
          160: '#323130',
          150: '#3B3A39',
          140: '#484644',
          130: '#605E5C',
          120: '#797775',
          110: '#8A8886',
          90: '#A19F9D',
          70: '#BEBBB8',
          60: '#C8C6C4',
          50: '#D2D0CE',
          40: '#E1DFDD',
          30: '#EDEBE9',
          20: '#F3F2F1',
          10: '#FAF9F8',
        }
      }
    },
  },
  plugins: [],
};