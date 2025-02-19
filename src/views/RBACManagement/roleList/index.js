import React from 'react'
import { useDispatch, useSelector } from 'react-redux' 
import { BsKeyFill } from 'react-icons/bs'
import reducer from './store'
import { injectReducer } from '@/store/index'
import { AdaptableCard } from '@/components/shared'
import RoleTable from './components/rbacList'
import RbacTableTools from './components/rbacTableTools'
import { reInitialTableData } from './store/dataSlice'
injectReducer('roleList', reducer)

const RbacList = () => {
	const dispatch = useDispatch()
	dispatch( reInitialTableData() )
	return (
		<AdaptableCard className="h-full" bodyClass="h-full">
			{/* <Card className="lg:col-span-2"> */}
			<div className="lg:flex items-center justify-between mb-4">
				<div className="flex">
					<BsKeyFill size={"30"} />
					<h3 className="ml-5">Roles</h3>
				</div>
				<RbacTableTools />
				</div>
				<RoleTable />
			{/* </ Card> */}
		</AdaptableCard >
	)
}

export default RbacList