import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter  } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import store, { persistor } from './store'
import Theme from '@/components/template/Theme'
import Layout from '@/components/layout'
import history from './history'
import './locales'
import PaymentPlansConfirmation from '@/views/TaskMangement/payment/paymentOnToggle'
import FreeTrialDialog from '@/views/TaskMangement/freeTrialDialog'

function App() {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<BrowserRouter history={history}>
					<Theme>
						<Layout />
						<PaymentPlansConfirmation/>
						<FreeTrialDialog/>
					</Theme>
				</BrowserRouter >
			</PersistGate>
		</Provider>
	)
}

export default App
