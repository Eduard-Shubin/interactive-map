import { createContext, useContext, useEffect, useState } from 'react'

import axios from 'axios'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [isAdmin, setIsAdmin] = useState(false)

    axios.defaults.withCredentials = true

    useEffect(() => {
        // Проверка состояния аутентификации при загрузке страницы
        axios.get('http://localhost:3001/check-auth').then((response) => {
            if (response.data.isAuthenticated) {
                setIsAdmin(true)
            }
        })
    }, [])

    const login = async (data) => {
        try {
            const response = await axios.post(
                'http://localhost:3001/login',
                data,
                {
                    withCredentials: true,
                }
            )

            if (response.data.success) {
                setIsAdmin(true)
            }

            return Promise.resolve(response.data)
        } catch (error) {
            console.error('Ошибка аутентификации', error)
            return Promise.reject(error)
        }
    }

    const logout = async () => {
        try {
            await axios.post('http://localhost:3001/logout')
            setIsAdmin(false)
        } catch (error) {
            console.error('Ошибка выхода из системы', error)
        }
    }

    return (
        <AuthContext.Provider value={{ isAdmin, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
