import React, { Suspense } from 'react'
import { Loading } from '@/components/shared'
import { protectedRoutes, publicRoutes } from '@/configs/routes.config'
import appConfig from '@/configs/app.config'
import PageContainer from '@/components/template/PageContainer'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ProtectedRoute from '@/components/route/ProtectedRoute'
import PublicRoute from '@/components/route/PublicRoute'
import AuthorityGuard from '@/components/route/AuthorityGuard'
import AppRoute from '@/components/route/AppRoute'

const { authenticatedEntryPath } = appConfig

const AllRoutes = props => {
	const location = useLocation();
	const userAuthority = useSelector((state) => state.auth.user.authority)
	const rolesAccess = useSelector((state) => state.auth.user.rolesAccess);
	const roleId = useSelector((state) => state.auth.user.roleId);
	const progressState = useSelector((state) => state.auth.user.progressState)
	const allTrue = Object?.values?.(progressState)?.every(value => value === true);
	return (
		<Routes>
			<Route path="/" element={<ProtectedRoute />}>
				<Route path="/" element={<Navigate replace to={authenticatedEntryPath} />} />
				{protectedRoutes.map((route, index) => (
					<Route
						key={route.key + index}
						path={route.path}
						element={
								<AuthorityGuard
									userAuthority={userAuthority}
									authority={route.authority}
									roleAccess={rolesAccess}
									roleId={roleId}
									allTrue={allTrue}
								>
									<PageContainer {...props} {...route.meta}>
										<AppRoute
											routeKey={route.key}
											component={route.component}
											{...route.meta}
										/>
									</PageContainer>
								</AuthorityGuard>
						}
					/>

				))}
				<Route path="*" element={<Navigate to="/" replace />} />
			</Route>
			<Route path="/" element={<PublicRoute />}>
				{publicRoutes.map(route => (
					<Route
						key={route.path}
						path={route.path}
						element={
							<AppRoute
								routeKey={route.key}
								component={route.component}
								{...route.meta}
							/>
						}
					/>
				))}
			</Route>
		</Routes>
	)
}

const Views = props => {
	return (
		<Suspense fallback={<Loading loading={true} />}>
			<AllRoutes {...props} />
		</Suspense>
	)
}

export default Views;
