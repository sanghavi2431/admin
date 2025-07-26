import authRoute from './authRoute'
import protectedRoute from './protectedRoute'

export const publicRoutes = [
    ...authRoute
]

export const protectedRoutes = [
    ...protectedRoute
]