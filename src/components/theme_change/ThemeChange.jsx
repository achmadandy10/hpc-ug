import { useEffect, useState } from 'react';
import { FaCircle } from 'react-icons/fa';
import { ThemeChangeContainer, ThemeChangeContent } from './ThemeChange.elements';

const ThemeChange = () => {
    const [theme, setTheme]= useState('blue-theme')
    const setMode = (mode) => {
        sessionStorage.setItem('theme', mode)
        setTheme(mode)
    }

    const toggleTheme = () => {
        theme === 'blue-theme' ? setMode('purple-theme') : setMode('blue-theme')
        window.location.reload()
    }

    useEffect(() => {
        const localTheme = sessionStorage.getItem('theme')
        localTheme ? setTheme(localTheme) : setMode('blue-theme')
    }, [])

    if (theme === 'blue-theme') {
        document.body.classList.add(theme)
    } else {
        document.body.classList.remove('blue-theme')
    }

    return (
        <ThemeChangeContainer>
            <ThemeChangeContent onClick={ toggleTheme } className={ theme === 'blue-theme' ? 'active' : '' }>
                <FaCircle className='blue'/>
            </ThemeChangeContent>
            <ThemeChangeContent onClick={ toggleTheme } className={ theme === 'purple-theme' ? 'active' : '' }>
                <FaCircle className='purple'/>
            </ThemeChangeContent>
        </ThemeChangeContainer>
    )
}

export default ThemeChange