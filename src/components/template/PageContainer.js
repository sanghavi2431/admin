import React, { Suspense } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Container } from '@/components/shared'
import { PAGE_CONTAINER_GUTTER_X, PAGE_CONTAINER_GUTTER_Y } from '@/constants/theme.constant' 

const CustomHeader = ({header}) => {
	const Header = header
	return <Header />
}

const PageContainer = props => {

	const { 
		pageContainerType, 
		children, 
		header, 
		contained, 
		extraHeader,
		footer
	} = props

	return (
		<div className="h-full">
			<main className="h-full overflow-auto">
				<div className={
					classNames(
						'page-container relative flex flex-auto flex-col h-full max-h-fit', 
						pageContainerType !== 'gutterless' && `${PAGE_CONTAINER_GUTTER_X} ${PAGE_CONTAINER_GUTTER_Y}`,
						pageContainerType === 'contained' && 'container mx-auto'
					)
				}>
					{
						(header || extraHeader) && (
							<div className={
								classNames(
									contained && 'container mx-auto', 
									'flex items-center justify-between mb-4'
								)
							}>
								<div>
									{(header && typeof header === 'string') && <h3>{header}</h3>}
									<Suspense fallback={<div></div>}>
										{(header && typeof header !== 'string') && <CustomHeader header={header} />}
									</Suspense>
								</div>
								<Suspense fallback={<div></div>}>
									{(extraHeader && typeof extraHeader !== 'string') && (
										<CustomHeader header={extraHeader} />
									)}
								</Suspense>
							</div>
						)
					}
					{
						pageContainerType === 'contained' 
						?  
						<Container className="h-full"><>{children}</></Container>
						: 
						<>{children}</>
					}
				</div>
			</main>
			{/* {footer && <Footer pageContainerType={pageContainerType} />} */}
		</div>
	)
}

PageContainer.defaultProps = {
	pageContainerType: 'default',
	contained: false,
	footer: true
}

PageContainer.propTypes = {
	pageContainerType: PropTypes.oneOf(['default', 'gutterless', 'contained']),
	header: PropTypes.oneOfType([
		PropTypes.object,
		PropTypes.string
	]),
	extraHeader: PropTypes.oneOfType([
		PropTypes.object,
		PropTypes.string
	]),
	contained: PropTypes.bool,
	footer: PropTypes.bool,
}

export default PageContainer
