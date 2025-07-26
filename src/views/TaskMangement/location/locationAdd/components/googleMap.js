import React, { useRef, useState, useEffect } from 'react'
import { Input } from '@/components/ui'
import { GoogleMap, useJsApiLoader, Marker, Autocomplete, LoadScript } from '@react-google-maps/api';
import { setCurrentPosition } from '../store/dataSlice';
import { HiOutlineSearch } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';

// const placesLibrary = ['places']

const defaultCenter = {
  lat: 20.5937, lng: 78.9629
}

function MyComponent({ array, isAdding, getLocation, values }) {

  const currentPosition = useSelector((state) => state.locationAdd?.data?.latlng)

  const success = position => {
    const c = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    }
    getFormattedAddress(c.lat, c.lng)
    dispatch( setCurrentPosition(c) )
  };
  const markerRef = useRef(null);
  const [searchResult, setSearchResult] = useState('')
  
  const searchInput = useRef()


  const mapStyles = () => {
    return {
      marginTop: "15px",
      height: "65vh",
      width: "100%"
    }
  }
  

  function report(state) {
  }
  const getFormattedAddress = (lat, lng) => {
    
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&sensor=false&key=AIzaSyCkPmUz4UlRdzcKG9gniW9Qfrgzsjhnb_4`;

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        dispatch( setCurrentPosition({ lat:lat, lng:lng, address:json.results[0].formatted_address }))
      } catch (error) {
        console.log("error", error);
      }
    }
    fetchData()

  }
  useEffect(() => {
   
    if( values?.latitude !== "" && values?.longitude !== "" ){
      dispatch(setCurrentPosition({lat:values?.latitude, lng:values?.longitude, address:values?.google_address}))
    }
    else{
      navigator.geolocation.getCurrentPosition(success);
    }
  }, [])
  const dispatch = useDispatch()

  const [selected, setSelected] = useState({});
  const [p, setP] = useState('')
  const onSelect = item => {
    dispatch( setCurrentPosition(item) )
  }
  const onMarkerDragEnd = (e, map, coord) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    dispatch( setCurrentPosition({ lat, lng }) )
  };
  function onLoad(autocomplete) {
    setSearchResult(autocomplete);
  }
  function onPlaceChanged() {
    if (searchResult != null) {
      //variable to store the result
      const place = searchResult.getPlace();
      //variable to store the name from place details result 
      const name = place.name;
      //variable to store the status from place details result
      const status = place.business_status;
      //variable to store the formatted address from place details result
      const formattedAddress = place.formatted_address;
      // console.log(place);
      //console log all results
      setP(formattedAddress)
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      const address = formattedAddress
      dispatch( setCurrentPosition({ lat, lng , address}) )
    } else {
      alert("Please enter text");
    }
  }
  


  
  return (
    <>
      <LoadScript
        id="script-loader"
        googleMapsApiKey={"AIzaSyCkPmUz4UlRdzcKG9gniW9Qfrgzsjhnb_4"}
        libraries={["places"]}
      >

        <div style={{
          position: "absolute", top: "80px",
          width: "90%",
          margin: "auto",
          height: "100px",
          // zIndex: "1"

        }} >
          <Autocomplete
            onPlaceChanged={(place) =>{
              return onPlaceChanged(place)
            }  }
            restrictions={{country: "ind"}}
            onLoad={onLoad}
          >
            <Input
              ref={searchInput}
              className="max-w-md md:w-72 md:mb-0 mb-4 ml-80 "
              style={{
                boxSizing: `border-box`,
                border: `1px solid transparent`,
                width: `450px`,
                height: `36px`,
                padding: `0 12px`,
                borderRadius: `3px`,
                boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                fontSize: `14px`,
                outline: `none`,
                textOverflow: `ellipses`,
                zIndex: "1"
              }}
              size="md"
              placeholder="Search your location..."
              prefix={<HiOutlineSearch style={{
                zIndex: "99"
              }}  className="text-lg" />}
            />
           
          </Autocomplete>
        </div>
        <GoogleMap
          id='example-map'
          mapContainerStyle={mapStyles()}
          draggable={true}
          zoom={13}
          // style={{ position: "relative" }}
          center={currentPosition.lat ? currentPosition : defaultCenter}
        >
       
          {
            currentPosition.lat ?
              <Marker
                position={currentPosition}
                ref={() => markerRef}
                onDragEnd={(e, map, coord) => {
                  onMarkerDragEnd(e, map, coord)
                  const lat = e.latLng.lat();
                  const lng = e.latLng.lng();
                  getFormattedAddress(lat, lng)
                }}
                draggable={true} /> :
              null
          }

         

        </GoogleMap>
      </LoadScript>
      <p>{currentPosition.address}</p>
    
      
     
    </>
  )
}

export default MyComponent