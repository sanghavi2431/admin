import React, { memo, useMemo, lazy, Suspense } from 'react'
import { useSelector } from 'react-redux'
import { Loading } from '@/components/shared'
import { 
	LAYOUT_TYPE_CLASSIC, 
	LAYOUT_TYPE_MODERN, 
	LAYOUT_TYPE_SET_UP,
	LAYOUT_TYPE_SIMPLE,
	LAYOUT_TYPE_STACKED_SIDE,
	LAYOUT_TYPE_DECKED,
	LAYOUT_TYPE_BLANK
} from '@/constants/theme.constant'
import useAuth from '@/utils/hooks/useAuth'
import useDirection from '@/utils/hooks/useDirection'
import useLocale from '@/utils/hooks/useLocale'

const layouts = {
	[LAYOUT_TYPE_CLASSIC]: lazy(() => import('./ClassicLayout')),
	[LAYOUT_TYPE_MODERN]: lazy(() => import('./ModernLayout')),
	[LAYOUT_TYPE_SET_UP]: lazy(() => import('./SetupLayout')),
	[LAYOUT_TYPE_STACKED_SIDE]: lazy(() => import('./StackedSideLayout')),
	[LAYOUT_TYPE_SIMPLE]: lazy(() => import('./SimpleLayout')),
	[LAYOUT_TYPE_DECKED]: lazy(() => import('./DeckedLayout')),
	[LAYOUT_TYPE_BLANK]: lazy(() => import('./BlankLayout')),
}

const Layout = () => {

	const layoutType = useSelector((state) => state.theme.layout.type)

	const { authenticated } = useAuth()

	useDirection()

	useLocale()

	const AppLayout = useMemo(() => {
		if (authenticated) {
			return layouts[layoutType]
		}
		return lazy(() => import('./AuthLayout'))
	}, [layoutType, authenticated])

	return (
		<Suspense 
			fallback={
				<div className="flex flex-auto flex-col h-[100vh]">
					<Loading loading={true} />
				</div>
			}
		>
			<AppLayout />
		</Suspense>
	)
}

export default memo(Layout)