import React, { createContext, useContext, useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProviderWrapper = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : false;
  });

  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    // Apply theme to body element for global CSS
    document.body.style.backgroundColor = isDarkMode ? '#121212' : '#F5F7FB';
    document.body.style.color = isDarkMode ? '#fff' : '#222';
    
    // Apply theme to all text elements globally
    const allTextElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, div, label, input, textarea, select');
    allTextElements.forEach(element => {
      if (isDarkMode) {
        element.style.color = '#fff';
      } else {
        element.style.color = '#222';
      }
    });
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const theme = createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
      primary: {
        main: '#6C63FF',
      },
      secondary: {
        main: '#5A55E0',
      },
      background: {
        default: isDarkMode ? '#121212' : '#F5F7FB',
        paper: isDarkMode ? '#1E1E1E' : '#fff',
      },
      text: {
        primary: isDarkMode ? '#fff' : '#222',
        secondary: isDarkMode ? '#B0B0B0' : '#666',
      },
      divider: isDarkMode ? '#333' : '#e0e0e0',
    },
    components: {
      MuiBox: {
        styleOverrides: {
          root: {
            color: isDarkMode ? '#fff' : '#222',
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            color: isDarkMode ? '#fff' : '#222',
          },
          h1: {
            color: isDarkMode ? '#fff' : '#222',
          },
          h2: {
            color: isDarkMode ? '#fff' : '#222',
          },
          h3: {
            color: isDarkMode ? '#fff' : '#222',
          },
          h4: {
            color: isDarkMode ? '#fff' : '#222',
          },
          h5: {
            color: isDarkMode ? '#fff' : '#222',
          },
          h6: {
            color: isDarkMode ? '#fff' : '#222',
          },
          body1: {
            color: isDarkMode ? '#fff' : '#222',
          },
          body2: {
            color: isDarkMode ? '#fff' : '#222',
          },
          caption: {
            color: isDarkMode ? '#B0B0B0' : '#666',
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: isDarkMode ? '#1E1E1E' : '#fff',
            color: isDarkMode ? '#fff' : '#222',
            boxShadow: isDarkMode 
              ? '0 2px 8px rgba(0,0,0,0.3)' 
              : '0 2px 8px rgba(0,0,0,0.04)',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: isDarkMode ? '#2D2D2D' : '#fff',
            color: isDarkMode ? '#fff' : '#222',
            border: isDarkMode ? '1px solid #333' : '1px solid #e0e0e0',
            '& *': {
              color: isDarkMode ? '#fff' : '#222',
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: isDarkMode ? '#2D2D2D' : '#fff',
            color: isDarkMode ? '#fff' : '#222',
            border: isDarkMode ? '1px solid #333' : '1px solid #e0e0e0',
            '& *': {
              color: isDarkMode ? '#fff' : '#222',
            },
          },
        },
      },
      MuiContainer: {
        styleOverrides: {
          root: {
            backgroundColor: 'transparent',
            color: isDarkMode ? '#fff' : '#222',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            color: isDarkMode ? '#fff' : '#222',
          },
          outlined: {
            borderColor: isDarkMode ? '#6C63FF' : '#6C63FF',
            color: isDarkMode ? '#6C63FF' : '#6C63FF',
            '&:hover': {
              backgroundColor: isDarkMode ? 'rgba(108,99,255,0.1)' : 'rgba(108,99,255,0.1)',
            },
          },
          text: {
            color: isDarkMode ? '#fff' : '#222',
            '&:hover': {
              backgroundColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.04)',
            },
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              backgroundColor: isDarkMode ? '#2D2D2D' : '#fff',
              color: isDarkMode ? '#fff' : '#222',
              '& fieldset': {
                borderColor: isDarkMode ? '#444' : '#e0e0e0',
              },
              '&:hover fieldset': {
                borderColor: isDarkMode ? '#6C63FF' : '#6C63FF',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#6C63FF',
              },
              '& input': {
                color: isDarkMode ? '#fff' : '#222',
              },
            },
            '& .MuiInputLabel-root': {
              color: isDarkMode ? '#B0B0B0' : '#666',
            },
          },
        },
      },
      MuiSelect: {
        styleOverrides: {
          root: {
            backgroundColor: isDarkMode ? '#2D2D2D' : '#fff',
            color: isDarkMode ? '#fff' : '#222',
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: isDarkMode ? '#444' : '#e0e0e0',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: isDarkMode ? '#6C63FF' : '#6C63FF',
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            backgroundColor: isDarkMode ? '#3D3D3D' : '#f5f5f5',
            color: isDarkMode ? '#fff' : '#222',
            border: isDarkMode ? '1px solid #444' : '1px solid #e0e0e0',
          },
        },
      },
      MuiAlert: {
        styleOverrides: {
          root: {
            backgroundColor: isDarkMode ? '#2D2D2D' : '#fff',
            color: isDarkMode ? '#fff' : '#222',
            '& *': {
              color: isDarkMode ? '#fff' : '#222',
            },
          },
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: {
            borderColor: isDarkMode ? '#333' : '#e0e0e0',
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            color: isDarkMode ? '#fff' : '#222',
            '&:hover': {
              backgroundColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.04)',
            },
          },
        },
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            backgroundColor: isDarkMode ? '#333' : '#fff',
            color: isDarkMode ? '#fff' : '#222',
            border: isDarkMode ? '1px solid #444' : '1px solid #e0e0e0',
          },
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            color: isDarkMode ? '#fff' : '#222',
            backgroundColor: isDarkMode ? '#2D2D2D' : '#fff',
            '&:hover': {
              backgroundColor: isDarkMode ? '#3D3D3D' : '#f5f5f5',
            },
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            backgroundColor: isDarkMode ? '#2D2D2D' : '#fff',
            color: isDarkMode ? '#fff' : '#222',
          },
        },
      },
      MuiDialogTitle: {
        styleOverrides: {
          root: {
            color: isDarkMode ? '#fff' : '#222',
          },
        },
      },
      MuiDialogContent: {
        styleOverrides: {
          root: {
            color: isDarkMode ? '#fff' : '#222',
          },
        },
      },
      MuiTable: {
        styleOverrides: {
          root: {
            backgroundColor: isDarkMode ? '#2D2D2D' : '#fff',
            color: isDarkMode ? '#fff' : '#222',
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            color: isDarkMode ? '#fff' : '#222',
            borderColor: isDarkMode ? '#444' : '#e0e0e0',
          },
        },
      },
      MuiTableHead: {
        styleOverrides: {
          root: {
            backgroundColor: isDarkMode ? '#1E1E1E' : '#f5f5f5',
            '& .MuiTableCell-root': {
              color: isDarkMode ? '#fff' : '#222',
            },
          },
        },
      },
    },
  });

  const value = {
    isDarkMode,
    toggleTheme,
    theme,
  };

  return (
    <ThemeContext.Provider value={value}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}; 