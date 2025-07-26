import { useDispatch, useSelector } from 'react-redux'
import {  setMapConfirmation, setInitialCurrentPosition, setCurrentPosition} from '../store/dataSlice'
import MyComponent from './googleMap'
import { Button, Dialog } from '@/components/ui'
import { useEffect } from 'react'

const MapConfirmation = (props) => {
    const { values, type , originalValues,  setFieldValue} = props
    const dialogOpen = useSelector((state) => state.locationAdd?.data?.mapConfirmation)
    const latitude = useSelector((state) => state.locationAdd?.data?.latitude)
    const longitude = useSelector((state) => state.locationAdd?.data?.longitude)
    const address = useSelector((state) => state.locationAdd?.data?.address)
    const latlng = useSelector((state) => state.locationAdd?.data?.latlng)
    const dispatch = useDispatch()

    const onDialogClose = (e) => {
        dispatch(setMapConfirmation(false))
        dispatch( setInitialCurrentPosition() )
        dispatch(setCurrentPosition({lat:originalValues?.latitude, lng:originalValues?.longitude}))

    }

    const onDialogOk = (e) => {

        setFieldValue('lat', latitude)
        setFieldValue('lng', longitude)
        if( latlng.address !== undefined ){
            setFieldValue('address', latlng.address)
        }
        dispatch( setCurrentPosition({lat:latitude, lng:longitude} ))
        dispatch(setMapConfirmation(false))
    }

    return (
        <div>
            <Dialog
                isOpen={dialogOpen}
                onClose={onDialogClose}
                onRequestClose={onDialogClose}
                width={1000}
                style={{
                    marginTop: 250,
                }}
                contentClassName="pb-0 px-0"
            >
                <div className="px-6 pb-6">
                    <h5 className="mb-4">Choose your location</h5>
                      <MyComponent type={type} values={originalValues} array={values?.latitude && values?.longitude ? [{lat:values?.latitude, lng:values?.longitude}] : []} setFieldValue={setFieldValue} />

                </div>
                <div className="text-right px-6 py-3 bg-gray-100 dark:bg-gray-700 rounded-bl-lg rounded-br-lg">
                    <Button
                        className="ltr:mr-2 rtl:ml-2"
                        onClick={onDialogClose}
                    >
                        Cancel
                    </Button>
                    <Button variant="solid" onClick={onDialogOk}>
                        Confirm
                    </Button>
                </div>
            </Dialog>
        </div>
    )
}

export default MapConfirmation