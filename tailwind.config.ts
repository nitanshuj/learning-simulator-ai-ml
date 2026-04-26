/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      // Primary Color Palette
      colors: {
        // Neutral
        slate: {
          50: '#f8f9fa',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        // Brand - Blue
        blue: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        // Accent - Indigo
        indigo: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
        // Accent - Teal
        teal: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#134e4a',
          900: '#0d3b36',
        },
        // Status - Success (Emerald)
        emerald: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        },
        // Status - Warning (Amber)
        amber: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        // Status - Error (Rose)
        rose: {
          50: '#fff1f2',
          100: '#ffe4e6',
          200: '#fecdd3',
          300: '#fda4af',
          400: '#fb7185',
          500: '#f43f5e',
          600: '#e11d48',
          700: '#be123c',
          800: '#9d174d',
          900: '#831843',
        },
        // Status - Info (Sky)
        sky: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c3d66',
        },
        // Category Colors
        category: {
          regression: '#2563eb',      // Blue-600
          classification: '#7c3aed',  // Violet-600
          optimization: '#4f46e5',    // Indigo-600
          deeplearning: '#4f46e5',    // Indigo-600
          computervision: '#ec4899',  // Pink-600
          nlp: '#14b8a6',             // Teal-600
          generative: '#dc2626',      // Red-600
          reinforcement: '#f97316',   // Orange-600
        },
      },
      
      // Typography Scale (8px base)
      fontSize: {
        // H1: 48px / 1.2 line-height
        'h1': ['48px', { lineHeight: '1.2', fontWeight: '700' }],
        // H2: 36px / 1.25 line-height
        'h2': ['36px', { lineHeight: '1.25', fontWeight: '700' }],
        // H3: 28px / 1.3 line-height
        'h3': ['28px', { lineHeight: '1.3', fontWeight: '700' }],
        // H4: 20px / 1.4 line-height
        'h4': ['20px', { lineHeight: '1.4', fontWeight: '600' }],
        // Body: 16px / 1.6 line-height
        'base': ['16px', { lineHeight: '1.6', fontWeight: '400' }],
        // Small: 14px / 1.5 line-height
        'sm': ['14px', { lineHeight: '1.5', fontWeight: '400' }],
        // Label: 12px / 1.5 line-height
        'label': ['12px', { lineHeight: '1.5', fontWeight: '500' }],
        // Deprecated (keeping for compatibility)
        xs: ['0.75rem', '1rem'],
        lg: ['1.125rem', '1.75rem'],
        xl: ['1.25rem', '1.75rem'],
        '2xl': ['1.5rem', '2rem'],
        '3xl': ['1.875rem', '2.25rem'],
      },

      // Spacing System (8px increments)
      spacing: {
        xs: '0.5rem',    // 4px
        sm: '0.5rem',    // 8px
        md: '0.75rem',   // 12px
        lg: '1rem',      // 16px
        xl: '1.5rem',    // 24px
        '2xl': '2rem',   // 32px
        '3xl': '3rem',   // 48px
        '4xl': '4rem',   // 64px
      },

      // Shadow System
      boxShadow: {
        none: 'none',
        // Subtle (sm): 0 1px 2px 0 rgba(0, 0, 0, 0.05)
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        // Base (md): 0 4px 6px -1px rgba(0, 0, 0, 0.1)
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        // Card (lg): 0 10px 15px -3px rgba(0, 0, 0, 0.1)
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        // Elevated (xl): 0 20px 25px -5px rgba(0, 0, 0, 0.1)
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
      },

      // Border Radius (8px base)
      borderRadius: {
        none: '0px',
        xs: '4px',       // 4px - form inputs, small components
        sm: '6px',       // 6px - subtle
        md: '8px',       // 8px - cards, buttons, containers
        lg: '12px',      // 12px - large containers, hero sections
        full: '9999px',  // 9999px - pill buttons, circular badges
      },

      // Border Configuration
      borderColor: {
        divider: 'rgba(15, 23, 42, 0.1)',
      },

      // Font Family
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        mono: ['Courier New', 'SF Mono', 'monospace'],
      },

      // Transitions (for micro-interactions)
      transitionDuration: {
        150: '150ms',
        200: '200ms',
        300: '300ms',
        500: '500ms',
      },

      // Animation
      animation: {
        spin: 'spin 2s linear infinite',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        fadeIn: 'fadeIn 300ms ease-out',
      },

      // Keyframes
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
