import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import appConfig from '@/configs/app.config'
import useAuth from '@/utils/hooks/useAuth'

const { unAuthenticatedEntryPath } = appConfig

const ProtectedRoute = () => {

	const { authenticated } = useAuth()

	const location = useLocation()

	if (!authenticated) {
		return <Navigate to={`${unAuthenticatedEntryPath}`} replace />;
	}

	return <Outlet />
}

export default ProtectedRoute