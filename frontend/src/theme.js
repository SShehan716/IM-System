import { createContext, useState, useMemo } from 'react';
import { createTheme } from '@mui/material/styles';

// color design tokens
export const tokens = (mode) => ({
    ...(mode === 'dark'
        ? {
            grey: {
                100: "#e0e0e0",
                200: "#c2c2c2",
                300: "#a3a3a3",
                400: "#858585",
                500: "#666666",
                600: "#525252",
                700: "#3d3d3d",
                800: "#292929",
                900: "#141414"
            },
            primary: {
                100: "#d0d1d5",
                200: "#a1a4aa",
                300: "#727680",
                400: "#1F2A40",
                500: "#141b2b",
                600: "#101622",
                700: "#0c101a",
                800: "#080b11",
                900: "#040509"
            },
            greenAccent: {
                100: "#dbf5ee",
                200: "#b7ebde",
                300: "#94e2cd",
                400: "#70d8bd",
                500: "#4cceac",
                600: "#3da58a",
                700: "#2e7c67",
                800: "#1e5245",
                900: "#0f2922"
            },
            redAccent: {
                100: "#f8dcdb",
                200: "#f1b9b7",
                300: "#e99592",
                400: "#e2726e",
                500: "#db4f4a",
                600: "#af3f3b",
                700: "#832f2c",
                800: "#58201e",
                900: "#2c100f"
            },
            blueAccent: {
                100: "#e1e2fe",
                200: "#c3c6fd",
                300: "#a4a9fc",
                400: "#868dfb",
                500: "#6870fa",
                600: "#535ac8",
                700: "#3e4396",
                800: "#2a2d64",
                900: "#151632"
            },
        } :
        {
            grey: {
                100: "#ffffff",
                200: "#f5f5f5",
                300: "#eeeeee",
                400: "#e0e0e0",
                500: "#d3d3d3",
                600: "#c6c6c6",
                700: "#b9b9b9",
                800: "#acacac",
                900: "#999999"
            },
            primary: {
                100: "#f7f8fa",
                200: "#e9eff4",
                300: "#d3e0ed",
                400: "#b7d1e6",
                500: "#9cbfdf",
                600: "#80a1d2",
                700: "#6387c5",
                800: "#466db8",
                900: "#2952ad"
            },
            greenAccent: {
                100: "#f0fff4",
                200: "#def7ec",
                300: "#ceefe4",
                400: "#beeade",
                500: "#aee5d8",
                600: "#9ed1c2",
                700: "#8ebdae",
                800: "#7da99a",
                900: "#6c8482"
            },
            redAccent: {
                100: "#fff3f2",
                200: "#ffe5e4",
                300: "#fcd7d6",
                400: "#f9c9c8",
                500: "#f6bbba",
                600: "#f3acaa",
                700: "#f09d9a",
                800: "#ed8e89",
                900: "#eb7f78"
            },
            blueAccent: {
                100: "#eff6ff",
                200: "#dfdfff",
                300: "#cfefff",
                400: "#bfdffd",
                500: "#afefff",
                600: "#9ddfff",
                700: "#8bcfff",
                800: "#79bfff",
                900: "#67afff"
            }
        })

});

//mui theme settings
export const themeSettings = (mode) => {
    const colors = tokens(mode);

    return {
        palette: {
            mode: mode,
            ...(mode === 'dark'
                ? {
                    primary: {
                        main: colors.primary[500],
                    },
                    secondary: {
                        main: colors.greenAccent[500],
                    },
                    neutral: {
                        dark: colors.grey[700],
                        main: colors.grey[500],
                        light: colors.grey[100],
                    },
                    background: {
                        default: colors.primary[500],
                    }
                } : {
                    primary: {
                        main: colors.primary[100],
                    },
                    secondary: {
                        main: colors.greenAccent[500],
                    },
                    neutral: {
                        dark: colors.grey[700],
                        main: colors.grey[500],
                        light: colors.grey[100],
                    },
                    background: {
                        default: "#fcfcfc",
                    },
                }
            ),
        },
        typography: {
            fontFamily: ['Source Sans Pro, sans-serif'].join(","),
            fontSize: 12,
            h1: {
                fonstFamily: ['Source Sans Pro, sans-serif'].join(","),
                fontSize: 40,
            },
            h2: {
                fonstFamily: ['Source Sans Pro, sans-serif'].join(","),
                fontSize: 32,
            },
            h3: {
                fonstFamily: ['Source Sans Pro, sans-serif'].join(","),
                fontSize: 24,
            },
            h4: {
                fonstFamily: ['Source Sans Pro, sans-serif'].join(","),
                fontSize: 20,
            },
            h5: {
                fonstFamily: ['Source Sans Pro, sans-serif'].join(","),
                fontSize: 16,
            },
            h6: {
                fonstFamily: ['Source Sans Pro, sans-serif'].join(","),
                fontSize: 14,
            },

        },
    }
};

// context for color mode
export const ColorModeContext = createContext({ toggleColorMode: () => { } });

export const useMode = () => {
    const [mode, setMode] = useState('dark');

    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
            },
        }),
        [],
    );

    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

    return [theme, colorMode];
}