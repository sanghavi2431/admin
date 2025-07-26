import React from 'react'
import { Navigate,useLocation } from 'react-router-dom'
import useAuthority from '@/utils/hooks/useAuthority'

const AuthorityGuard = props => {
	const location = useLocation();
	const { userAuthority , authority , children,roleAccess, allTrue } = props
	const roleMatched = useAuthority(userAuthority, authority)
	let path=location?.pathname?.split("/")
	let roleAccessFlag = roleAccess?.[`${"/" + path[1]}`]
	// const isIotDataOrDashboardTask = path && (path[1] === 'iotData' || path[1] === 'dashboard_task');

	// if (!allTrue && isIotDataOrDashboardTask) {
	// 	return <Navigate to="/accessDenied" />;
	// }

	return roleMatched  && roleAccessFlag ? children : <Navigate to="/accessDenied" />
}

export default AuthorityGuard