module.exports = {
  content: [
    "./pages/*.{html,js}",
    "./index.html",
    "./js/*.js",
    "./components/*.{html,js}"
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors - Trust-building blue for financial data
        primary: {
          DEFAULT: "#2563EB", // blue-600
          50: "#EFF6FF", // blue-50
          100: "#DBEAFE", // blue-100
          500: "#3B82F6", // blue-500
          600: "#2563EB", // blue-600
          700: "#1D4ED8", // blue-700
        },
        
        // Secondary Colors - Professional neutral contrast
        secondary: {
          DEFAULT: "#64748B", // slate-500
          100: "#F1F5F9", // slate-100
          200: "#E2E8F0", // slate-200
          400: "#94A3B8", // slate-400
          500: "#64748B", // slate-500
          600: "#475569", // slate-600
        },
        
        // Accent Colors - Interactive elements and positive feedback
        accent: {
          DEFAULT: "#0EA5E9", // sky-500
          100: "#E0F2FE", // sky-100
          500: "#0EA5E9", // sky-500
        },
        
        // Background Colors
        background: "#FFFFFF", // white - Pure white for maximum readability
        surface: "#F8FAFC", // slate-50 - Subtle off-white for card backgrounds
        
        // Text Colors
        "text-primary": "#1E293B", // slate-800 - Deep charcoal for primary text
        "text-secondary": "#64748B", // slate-500 - Medium gray for supporting information
        
        // Status Colors
        success: {
          DEFAULT: "#059669", // emerald-600 - Successful bookings and positive indicators
          100: "#D1FAE5", // emerald-100
          500: "#10B981", // emerald-500
          600: "#059669", // emerald-600
        },
        
        warning: {
          DEFAULT: "#D97706", // amber-600 - Attention-requiring states
          100: "#FEF3C7", // amber-100
          500: "#F59E0B", // amber-500
          600: "#D97706", // amber-600
        },
        
        error: {
          DEFAULT: "#DC2626", // red-600 - Form errors and critical issues
          100: "#FEE2E2", // red-100
          500: "#EF4444", // red-500
          600: "#DC2626", // red-600
        },
      },
      
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        inter: ['Inter', 'sans-serif'],
        'jetbrains': ['JetBrains Mono', 'monospace'],
      },
      
      fontSize: {
        'heading-xl': ['2rem', { lineHeight: '2.5rem', fontWeight: '600' }], // 32px
        'heading-lg': ['1.5rem', { lineHeight: '2rem', fontWeight: '600' }], // 24px
        'heading-md': ['1.25rem', { lineHeight: '1.75rem', fontWeight: '600' }], // 20px
        'heading-sm': ['1.125rem', { lineHeight: '1.5rem', fontWeight: '600' }], // 18px
        'body-lg': ['1rem', { lineHeight: '1.5rem', fontWeight: '400' }], // 16px
        'body-md': ['0.875rem', { lineHeight: '1.25rem', fontWeight: '400' }], // 14px
        'caption': ['0.75rem', { lineHeight: '1rem', fontWeight: '400' }], // 12px
        'data': ['0.875rem', { lineHeight: '1.25rem', fontWeight: '400', fontFamily: 'JetBrains Mono' }], // 14px mono
      },
      
      boxShadow: {
        'card': '0 1px 3px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 4px 6px rgba(0, 0, 0, 0.1)',
        'modal': '0 10px 25px rgba(0, 0, 0, 0.15)',
      },
      
      borderRadius: {
        'card': '8px',
        'button': '6px',
      },
      
      spacing: {
        '18': '4.5rem', // 72px
        '88': '22rem', // 352px
      },
      
      animation: {
        'fade-in': 'fadeIn 200ms ease-out',
        'slide-up': 'slideUp 200ms ease-out',
        'scale-in': 'scaleIn 200ms ease-out',
        'shimmer': 'shimmer 1.5s infinite',
      },
      
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
      
      transitionDuration: {
        '200': '200ms',
      },
      
      transitionTimingFunction: {
        'ease-out': 'cubic-bezier(0, 0, 0.2, 1)',
      },
      
      minHeight: {
        'touch': '44px',
      },
      
      minWidth: {
        'touch': '44px',
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.font-feature-settings-default': {
          'font-feature-settings': '"cv02", "cv03", "cv04", "cv11"',
        },
        '.tabular-nums': {
          'font-variant-numeric': 'tabular-nums',
        },
        '.rtl': {
          'direction': 'rtl',
        },
        '.ltr': {
          'direction': 'ltr',
        },
      }
      addUtilities(newUtilities)
    }
  ],
}