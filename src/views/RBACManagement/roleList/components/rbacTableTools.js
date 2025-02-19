import React from 'react'
import { Button } from '@/components/ui'
import { HiDownload, HiPlusCircle } from 'react-icons/hi'
import { Link } from 'react-router-dom'

const RbacTableTools = () => {
	return (
		<div className="flex flex-col lg:flex-row lg:items-center">
			<Link 
				className="block lg:inline-block md:mb-0 mb-4"
			 	to="/rbac-roleAdd"
			>
				<Button
					block
					variant="solid"
					className="bg-[#00C3DE] hover:bg-[#00c4debd]"
					color="black"
					size="sm" 
					icon={<HiPlusCircle />}
				>
					Add New Role
				</Button>
			</Link>
		</div>
	)
}

export default RbacTableTools