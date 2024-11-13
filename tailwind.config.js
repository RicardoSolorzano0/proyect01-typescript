/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        DEFAULT: '0px 4px 8px 0px rgba(96, 97, 112, 0.16)',
        'card': '1px 1px 2px 0px rgba(96, 97, 112, 0.16)'
      },
      colors: {
        accent: {
          DEFAULT: '#5FAFFF',
          50: '#EEF7FF',
          100: '#DAECFF',
          200: '#BDDEFF',
          300: '#90CBFF',
          400: '#5FAFFF',
          500: '#358BFC',
          600: '#1F6CF1',
          700: '#1755DE',
          800: '#1946B4',
          900: '#1A3E8E',
          950: '#152756'
        },
        action: '#0080FF',
        'action-hover': '#0080FF',
        alert: {
          DEFAULT: '#FF6767',
          50: '#FFF1F1',
          100: '#FFE1E1',
          200: '#FFC7C7',
          300: '#FFA0A0',
          400: '#FF6767',
          500: '#F83B3B',
          600: '#E51D1D',
          700: '#C11414',
          800: '#A01414',
          900: '#841818',
          950: '#480707'
        },
        body: '#727272',
        darkest: '#262626',
        disabled: '#C7C7CC',
        'form-label': '#727272E0',
        highlight: {
          DEFAULT: '#6A5FE3',
          50: '#EFF1FE',
          100: '#E2E5FD',
          200: '#CBD0FA',
          300: '#ACB1F5',
          400: '#8B8AEF',
          500: '#6A5FE3',
          600: '#6853D8',
          700: '#5A44BE',
          800: '#49399A',
          900: '#3E357A',
          950: '#251F47'
        },
        neutral: {
          DEFAULT: '#C7C7CC',
          50: '#F6F6F7',
          100: '#EFEFF0',
          200: '#E1E1E4',
          300: '#C7C7CC',
          400: '#BBBABF',
          500: '#A6A6AE',
          600: '#939299',
          700: '#7F7D85',
          800: '#68676C',
          900: '#57555A',
          950: '#323234'
        },
        'neutral-dark': {
          DEFAULT: '#727272',
          50: '#F6F6F6',
          100: '#E7E7E7',
          200: '#D1D1D1',
          300: '#B0B0B0',
          400: '#888888',
          500: '#727272',
          600: '#5D5D5D',
          700: '#4F4F4F',
          800: '#454545',
          900: '#3D3D3D',
          950: '#262626'
        },
        'neutral-darkest': '#262626',
        primary: {
          DEFAULT: '#0080FF',
          50: '#EDFAFF',
          100: '#D6F3FF',
          200: '#B5ECFF',
          300: '#83E2FF',
          400: '#48CFFF',
          500: '#1EB1FF',
          600: '#0694FF',
          700: '#0080FF',
          800: '#0861C5',
          900: '#0D549B',
          950: '#0E335D'
        },
        'primary-dark': {
          DEFAULT: '#004080',
          50: '#E9FBFF',
          100: '#CEF5FF',
          200: '#A7F0FF',
          300: '#6BEBFF',
          400: '#26DAFF',
          500: '#00B6FF',
          600: '#008CFF',
          700: '#0071FF',
          800: '#0061E6',
          900: '#0056B3',
          950: '#004080'
        },
        'primary-light': {
          DEFAULT: '#63D8FF',
          50: '#F0FAFF',
          100: '#DFF4FF',
          200: '#B8EBFF',
          300: '#63D8FF',
          400: '#33CEFD',
          500: '#09B8EE',
          600: '#0094CC',
          700: '#0076A5',
          800: '#046488',
          900: '#0A5270',
          950: '#06344B'
        },
        secondary: {
          DEFAULT: '#6BE093',
          50: '#F0FDF4',
          100: '#DDFBE6',
          200: '#BDF5CF',
          300: '#89ECAB',
          400: '#6BE093',
          500: '#26C15B',
          600: '#1A9F48',
          700: '#187D3C',
          800: '#186333',
          900: '#16512C',
          950: '#062D15'
        },
        success: {
          DEFAULT: '#73CC63',
          50: '#F4FBF2',
          100: '#E4F8E0',
          200: '#CBEFC3',
          300: '#A0E194',
          400: '#73CC63',
          500: '#4AAF38',
          600: '#389029',
          700: '#2E7223',
          800: '#285A21',
          900: '#214B1C',
          950: '#0D290A'
        },
        tertiary: {
          DEFAULT: '#E9BC63',
          50: '#FDF8ED',
          100: '#F8EBCD',
          200: '#F0D597',
          300: '#E9BC63',
          400: '#E3A33C',
          500: '#DB8525',
          600: '#C2641D',
          700: '#A1481C',
          800: '#833A1D',
          900: '#6C301B',
          950: '#3E170A'
        },
        warning: {
          DEFAULT: '#FFAB1D',
          50: '#FFF9EB',
          100: '#FFEFC6',
          200: '#FFDC88',
          300: '#FFC44A',
          400: '#FFAB1D',
          500: '#F98907',
          600: '#DD6302',
          700: '#B74306',
          800: '#94320C',
          900: '#7A2A0D',
          950: '#461402'
        },
        white: {
          DEFAULT: '#FFFFFF',
          50: '#FFFFFF',
          100: '#EFEFEF',
          200: '#DCDCDC',
          300: '#BDBDBD',
          400: '#989898',
          500: '#7C7C7C',
          600: '#656565',
          700: '#525252',
          800: '#464646',
          900: '#3D3D3D',
          950: '#292929'
        },
        'soft-blue': {
          DEFAULT: '#E5F0FF'
        }
      },
    },
  },
  plugins: [],
  important: true
}