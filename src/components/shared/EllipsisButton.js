import React from 'react'
import { VscEllipsis } from 'react-icons/vsc'
import { Button } from '@/components/ui'

const EllipsisButton = props => {

	const  { shape = 'circle', variant = 'plain', size ='xs'  } = props

	return (
		<Button
			shape={shape}
			variant={variant}
			size={size}
			icon={<VscEllipsis />} 
			{...props}
		/>
	)
}

export default EllipsisButton
