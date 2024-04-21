import { createTheme } from '@mui/material/styles'

export const themeLight = createTheme({
    palette: {
        background: {
            default: '#4fc3f7',
        },
    },
    components: {
        MuiInputBase: {
            styleOverrides: {
                root: {
                    backgroundColor: '#4fc3f7',
                    '&.Mui-disabled': {
                        backgroundColor: '#e4e4e4',
                    },
                },
            },
        },
    },
})

export const themeDark = createTheme({
    palette: {
        background: {
            default: '#222222',
        },
        text: {
            primary: '#ffffff',
        },
    },
    components: {
        MuiInputBase: {
            styleOverrides: {
                root: {
                    backgroundColor: '#222222',
                    '&.Mui-disabled': {
                        backgroundColor: '#e4e4e4',
                    },
                },
            },
        },
    },
})
