import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import withHeaderItem from '@/utils/hoc/withHeaderItem'
import { setPanelExpand } from '@/store/theme/themeSlice'

export const SidePanel = props => {

	const dispatch = useDispatch()

	const { className, ...rest } = props

	const panelExpand = useSelector((state) => state.theme.panelExpand)

	const direction = useSelector((state) => state.theme.direction)

	const openPanel = () => {
		dispatch(setPanelExpand(true))
	}

	const closePanel = () => {
		dispatch(setPanelExpand(false))
		const bodyClassList = document.body.classList
		if (bodyClassList.contains('drawer-lock-scroll')) {
			bodyClassList.remove('drawer-lock-scroll', 'drawer-open')
		}
	}

	return (
		<>
			{/* <div className={classNames('text-2xl', className)} onClick={openPanel} {...rest}>
				<HiOutlineCog />
			</div>
			<Drawer
				title="Theme Config"
				isOpen={panelExpand}
				onClose={closePanel}
				onRequestClose={closePanel}
				placement={direction === 'rtl' ? 'left' : 'right'}
				width={375}
			>
				<SidePanelContent callBackClose={closePanel} />
			</Drawer> */}
		</>
	)
}

export default withHeaderItem(SidePanel)
