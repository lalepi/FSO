import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { themeLight, themeDark } from '../themes/theme'

import { CssBaseline, ThemeProvider } from '@mui/material'

const defaultTheme = themeLight

const CustomThemeProvider = ({ children }) => {
    const [activeTheme, setActiveTheme] = useState(defaultTheme)

    const selectedTheme = useSelector((state) => state.theme.value)

    useEffect(() => {
        if (selectedTheme) setActiveTheme(themeLight)
        else setActiveTheme(themeDark)
    }, [selectedTheme])

    return (
        <ThemeProvider theme={activeTheme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    )
}

export default CustomThemeProvider
