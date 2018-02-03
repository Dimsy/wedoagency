import React from 'react';
import { YMaps, Map, GeoObject, Placemark } from 'react-yandex-maps';

const mapState = { 
										center: [55.91,37.76], 
										zoom: 10,
										width: 1080,
										height: 400
									}

class YandexMap extends React.Component {
  render() {
  	const {contacts} = this.props

    return (
      <YMaps className="test">
        <Map state={mapState} width={mapState.width} height={mapState.height}>
         	<GeoObject
         		geometry={{
         			type: 'Point',
         		 	coordinates: mapState.center
         		}}
         		 properties={{
       			  hintContent: `Офис ${contacts.content.rendered}`,
       			  balloonContent: `${contacts.title.rendered}	${contacts.acf.fullAddr} <br /> ${contacts.acf.phone1} `,
       			}}
         	/>
        </Map>       
      </YMaps>
    )
  }
}


export default YandexMap