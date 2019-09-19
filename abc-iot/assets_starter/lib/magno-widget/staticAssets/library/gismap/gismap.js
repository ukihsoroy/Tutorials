(function (win) {
  // 常量
  const DEFAULT_MARKER_WIDTH = 32
  const DEFAULT_MARKER_HEIGHT = 32
  const DEFAULT_STROKE_COLOR = 'blue'
  const DEFAULT_MARKER_COLOR = 'rgb(0,100,255)'

  const MapType = {
    GAODE_MAP: 'GAODE_MAP', // 高德地图
    BAIDU_MAP: 'BAIDU_MAP', // 百度地图
	    GOOGLE_MAP: 'GOOGLE_MAP' // google地图
  }

  const CONTROL = {
    MAPTYPE: 'MAPTYPE',
    SCALE: 'SCALE',
    CONTROL_BAR: 'ControlBar'
  }

  const ROUTEPLAN_MODE = {
    DRIVING: 'driving',
    WALKING: 'walking',
    RIDING: 'riding'
  }

  const DEFAULT_ROUTEPLAN_MODE = 'driving'

  // google地图的主题
  const GoogleStyle = {
    DARK: [
		  {
        'elementType': 'geometry',
        'stylers': [
			  {
            'color': '#212121'
			  }
        ]
		  },
		  {
        'elementType': 'labels.icon',
        'stylers': [
			  {
            'visibility': 'off'
			  }
        ]
		  },
		  {
        'elementType': 'labels.text.fill',
        'stylers': [
			  {
            'color': '#757575'
			  }
        ]
		  },
		  {
        'elementType': 'labels.text.stroke',
        'stylers': [
			  {
            'color': '#212121'
			  }
        ]
		  },
		  {
        'featureType': 'administrative',
        'elementType': 'geometry',
        'stylers': [
			  {
            'color': '#757575'
			  }
        ]
		  },
		  {
        'featureType': 'administrative.country',
        'elementType': 'labels.text.fill',
        'stylers': [
			  {
            'color': '#9e9e9e'
			  }
        ]
		  },
		  {
        'featureType': 'administrative.land_parcel',
        'stylers': [
			  {
            'visibility': 'off'
			  }
        ]
		  },
		  {
        'featureType': 'administrative.locality',
        'elementType': 'labels.text.fill',
        'stylers': [
			  {
            'color': '#bdbdbd'
			  }
        ]
		  },
		  {
        'featureType': 'poi',
        'elementType': 'labels.text.fill',
        'stylers': [
			  {
            'color': '#757575'
			  }
        ]
		  },
		  {
        'featureType': 'poi.park',
        'elementType': 'geometry',
        'stylers': [
			  {
            'color': '#181818'
			  }
        ]
		  },
		  {
        'featureType': 'poi.park',
        'elementType': 'labels.text.fill',
        'stylers': [
			  {
            'color': '#616161'
			  }
        ]
		  },
		  {
        'featureType': 'poi.park',
        'elementType': 'labels.text.stroke',
        'stylers': [
			  {
            'color': '#1b1b1b'
			  }
        ]
		  },
		  {
        'featureType': 'road',
        'elementType': 'geometry.fill',
        'stylers': [
			  {
            'color': '#2c2c2c'
			  }
        ]
		  },
		  {
        'featureType': 'road',
        'elementType': 'labels.text.fill',
        'stylers': [
			  {
            'color': '#8a8a8a'
			  }
        ]
		  },
		  {
        'featureType': 'road.arterial',
        'elementType': 'geometry',
        'stylers': [
			  {
            'color': '#373737'
			  }
        ]
		  },
		  {
        'featureType': 'road.highway',
        'elementType': 'geometry',
        'stylers': [
			  {
            'color': '#3c3c3c'
			  }
        ]
		  },
		  {
        'featureType': 'road.highway.controlled_access',
        'elementType': 'geometry',
        'stylers': [
			  {
            'color': '#4e4e4e'
			  }
        ]
		  },
		  {
        'featureType': 'road.local',
        'elementType': 'labels.text.fill',
        'stylers': [
			  {
            'color': '#616161'
			  }
        ]
		  },
		  {
        'featureType': 'transit',
        'elementType': 'labels.text.fill',
        'stylers': [
			  {
            'color': '#757575'
			  }
        ]
		  },
		  {
        'featureType': 'water',
        'elementType': 'geometry',
        'stylers': [
			  {
            'color': '#000000'
			  }
        ]
		  },
		  {
        'featureType': 'water',
        'elementType': 'labels.text.fill',
        'stylers': [
			  {
            'color': '#3d3d3d'
			  }
        ]
		  }
    ],
    LIGHT: [
		  {
        'elementType': 'geometry',
        'stylers': [
			  {
            'color': '#f5f5f5'
			  }
        ]
		  },
		  {
        'elementType': 'labels.icon',
        'stylers': [
			  {
            'visibility': 'off'
			  }
        ]
		  },
		  {
        'elementType': 'labels.text.fill',
        'stylers': [
			  {
            'color': '#616161'
			  }
        ]
		  },
		  {
        'elementType': 'labels.text.stroke',
        'stylers': [
			  {
            'color': '#f5f5f5'
			  }
        ]
		  },
		  {
        'featureType': 'administrative.country',
        'elementType': 'geometry.stroke',
        'stylers': [
			  {
            'color': '#b1a590'
			  },
			  {
            'weight': 1
			  }
        ]
		  },
		  {
        'featureType': 'administrative.land_parcel',
        'elementType': 'labels.text.fill',
        'stylers': [
			  {
            'color': '#bdbdbd'
			  }
        ]
		  },
		  {
        'featureType': 'landscape',
        'elementType': 'geometry.fill',
        'stylers': [
			  {
            'color': '#e6f6fc'
			  }
        ]
		  },
		  {
        'featureType': 'landscape.man_made',
        'elementType': 'geometry.stroke',
        'stylers': [
			  {
            'color': '#e6f6fc'
			  }
        ]
		  },
		  {
        'featureType': 'landscape.natural.landcover',
        'elementType': 'geometry.fill',
        'stylers': [
			  {
            'color': '#e6f6fc'
			  }
        ]
		  },
		  {
        'featureType': 'landscape.natural.terrain',
        'elementType': 'geometry.fill',
        'stylers': [
			  {
            'color': '#e6f6fc'
			  }
        ]
		  },
		  {
        'featureType': 'poi',
        'elementType': 'geometry',
        'stylers': [
			  {
            'color': '#eeeeee'
			  }
        ]
		  },
		  {
        'featureType': 'poi',
        'elementType': 'labels.text.fill',
        'stylers': [
			  {
            'color': '#757575'
			  }
        ]
		  },
		  {
        'featureType': 'poi.park',
        'elementType': 'geometry',
        'stylers': [
			  {
            'color': '#e5e5e5'
			  }
        ]
		  },
		  {
        'featureType': 'poi.park',
        'elementType': 'labels.text.fill',
        'stylers': [
			  {
            'color': '#9e9e9e'
			  }
        ]
		  },
		  {
        'featureType': 'road',
        'elementType': 'geometry',
        'stylers': [
			  {
            'color': '#ffffff'
			  }
        ]
		  },
		  {
        'featureType': 'road.arterial',
        'elementType': 'labels.text.fill',
        'stylers': [
			  {
            'color': '#757575'
			  }
        ]
		  },
		  {
        'featureType': 'road.highway',
        'elementType': 'geometry',
        'stylers': [
			  {
            'color': '#dadada'
			  }
        ]
		  },
		  {
        'featureType': 'road.highway',
        'elementType': 'labels.text.fill',
        'stylers': [
			  {
            'color': '#616161'
			  }
        ]
		  },
		  {
        'featureType': 'road.local',
        'elementType': 'labels.text.fill',
        'stylers': [
			  {
            'color': '#9e9e9e'
			  }
        ]
		  },
		  {
        'featureType': 'transit.line',
        'elementType': 'geometry',
        'stylers': [
			  {
            'color': '#e5e5e5'
			  }
        ]
		  },
		  {
        'featureType': 'transit.station',
        'elementType': 'geometry',
        'stylers': [
			  {
            'color': '#eeeeee'
			  }
        ]
		  },
		  {
        'featureType': 'water',
        'elementType': 'geometry',
        'stylers': [
			  {
            'color': '#c9c9c9'
			  }
        ]
		  },
		  {
        'featureType': 'water',
        'elementType': 'geometry.fill',
        'stylers': [
			  {
            'color': '#95b4d6'
			  }
        ]
		  },
		  {
        'featureType': 'water',
        'elementType': 'labels.text.fill',
        'stylers': [
			  {
            'color': '#9e9e9e'
			  }
        ]
		  }
    ],
    BLUE: [
      {
        'featureType': 'all',
        'elementType': 'labels.text.fill',
        'stylers': [
          {
            'color': '#ffffff'
          }
        ]
      },
      {
        'featureType': 'all',
        'elementType': 'labels.text.stroke',
        'stylers': [
          {
            'visibility': 'on'
          },
          {
            'color': '#3e606f'
          },
          {
            'weight': 2
          },
          {
            'gamma': 0.84
          }
        ]
      },
      {
        'featureType': 'all',
        'elementType': 'labels.icon',
        'stylers': [
          {
            'visibility': 'off'
          }
        ]
      },
      {
        'featureType': 'administrative',
        'elementType': 'geometry',
        'stylers': [
          {
            'weight': 0.6
          },
          {
            'color': '#1a3541'
          }
        ]
      },
      {
        'featureType': 'landscape',
        'elementType': 'geometry',
        'stylers': [
          {
            'color': '#0A133B'
          }
        ]
      },
      {
        'featureType': 'poi',
        'elementType': 'geometry',
        'stylers': [
          {
            'color': '#406d80'
          }
        ]
      },
      {
        'featureType': 'poi.park',
        'elementType': 'geometry',
        'stylers': [
          {
            'color': '#0A133B'
          }
        ]
      },
      {
        'featureType': 'road',
        'elementType': 'geometry',
        'stylers': [
          {
            'color': '#29768a'
          },
          {
            'lightness': -37
          }
        ]
      },
      {
        'featureType': 'transit',
        'elementType': 'geometry',
        'stylers': [
          {
            'color': '#406d80'
          }
        ]
      },
      {
        'featureType': 'water',
        'elementType': 'geometry',
        'stylers': [
          {
            'color': '#1F5C94'
          }
        ]
      }
    ],
    DARKBLUE: [
      {
        'featureType': 'all',
        'elementType': 'labels.text.fill',
        'stylers': [
          {
            'color': '#ffffff'
          }
        ]
      },
      {
        'featureType': 'all',
        'elementType': 'labels.text.stroke',
        'stylers': [
          {
            'visibility': 'on'
          },
          {
            'color': '#3e606f'
          },
          {
            'weight': 2
          },
          {
            'gamma': 0.84
          }
        ]
      },
      {
        'featureType': 'all',
        'elementType': 'labels.icon',
        'stylers': [
          {
            'visibility': 'off'
          }
        ]
      },
      {
        'featureType': 'administrative',
        'elementType': 'geometry',
        'stylers': [
				  {
            'visibility': 'off'
				  }
        ]
			  },
			  {
        'featureType': 'administrative.country',
        'elementType': 'geometry.stroke',
        'stylers': [
				  {
            'color': '#2b3a7c'
				  },
				  {
            'visibility': 'on'
				  },
				  {
            'weight': 1.5
				  }
        ]
			  },
			  {
        'featureType': 'administrative.land_parcel',
        'elementType': 'labels.text.fill',
        'stylers': [
				  {
            'color': '#64779e'
				  }
        ]
			  },
			  {
        'featureType': 'administrative.province',
        'elementType': 'geometry.stroke',
        'stylers': [
				  {
            'color': '#4b6878'
				  }
        ]
			  },
      {
        'featureType': 'landscape',
        'elementType': 'geometry',
        'stylers': [
          {
            'color': '#031220'
          }
        ]
      },
      {
        'featureType': 'poi',
        'elementType': 'geometry',
        'stylers': [
          {
            'color': '#406d80'
          }
        ]
      },
      {
        'featureType': 'poi.park',
        'elementType': 'geometry',
        'stylers': [
          {
            'color': '#0A133B'
          }
        ]
      },
      {
        'featureType': 'road',
        'stylers': [
				  {
            'visibility': 'off'
				  }
        ]
			  },
      {
        'featureType': 'transit',
        'elementType': 'geometry',
        'stylers': [
          {
            'color': '#406d80'
          }
        ]
      },
      {
        'featureType': 'water',
        'elementType': 'geometry',
        'stylers': [
          {
            'color': '#102445'
          }
        ]
      }
    ],
    LIGHTBLUE: [
		  {
        'elementType': 'geometry',
        'stylers': [
			  {
            'color': '#f5f5f5'
			  }
        ]
		  },
		  {
        'elementType': 'labels.icon',
        'stylers': [
			  {
            'visibility': 'off'
			  }
        ]
		  },
		  {
        'elementType': 'labels.text.fill',
        'stylers': [
			  {
            'color': '#616161'
			  }
        ]
		  },
		  {
        'elementType': 'labels.text.stroke',
        'stylers': [
			  {
            'color': '#f5f5f5'
			  }
        ]
		  },
		  {
        'featureType': 'administrative.land_parcel',
        'elementType': 'labels.text.fill',
        'stylers': [
			  {
            'color': '#bdbdbd'
			  }
        ]
		  },
		  {
        'featureType': 'landscape',
        'elementType': 'geometry.fill',
        'stylers': [
			  {
            'color': '#b5cdef'
			  }
        ]
		  },
		  {
        'featureType': 'poi',
        'elementType': 'geometry',
        'stylers': [
			  {
            'color': '#eeeeee'
			  }
        ]
		  },
		  {
        'featureType': 'poi',
        'elementType': 'labels.text.fill',
        'stylers': [
			  {
            'color': '#757575'
			  }
        ]
		  },
		  {
        'featureType': 'poi.park',
        'elementType': 'geometry',
        'stylers': [
			  {
            'color': '#e5e5e5'
			  }
        ]
		  },
		  {
        'featureType': 'poi.park',
        'elementType': 'labels.text.fill',
        'stylers': [
			  {
            'color': '#9e9e9e'
			  }
        ]
		  },
		  {
        'featureType': 'road',
        'elementType': 'geometry',
        'stylers': [
			  {
            'color': '#ffffff'
			  }
        ]
		  },
		  {
        'featureType': 'road.arterial',
        'elementType': 'labels.text.fill',
        'stylers': [
			  {
            'color': '#757575'
			  }
        ]
		  },
		  {
        'featureType': 'road.highway',
        'elementType': 'geometry',
        'stylers': [
			  {
            'color': '#dadada'
			  }
        ]
		  },
		  {
        'featureType': 'road.highway',
        'elementType': 'labels.text.fill',
        'stylers': [
			  {
            'color': '#616161'
			  }
        ]
		  },
		  {
        'featureType': 'road.local',
        'elementType': 'labels.text.fill',
        'stylers': [
			  {
            'color': '#9e9e9e'
			  }
        ]
		  },
		  {
        'featureType': 'transit.line',
        'elementType': 'geometry',
        'stylers': [
			  {
            'color': '#e5e5e5'
			  }
        ]
		  },
		  {
        'featureType': 'transit.station',
        'elementType': 'geometry',
        'stylers': [
			  {
            'color': '#eeeeee'
			  }
        ]
		  },
		  {
        'featureType': 'water',
        'elementType': 'geometry',
        'stylers': [
			  {
            'color': '#c9c9c9'
			  }
        ]
		  },
		  {
        'featureType': 'water',
        'elementType': 'geometry.fill',
        'stylers': [
			  {
            'color': '#dfebff'
			  }
        ]
		  },
		  {
        'featureType': 'water',
        'elementType': 'labels.text.fill',
        'stylers': [
			  {
            'color': '#9e9e9e'
			  }
        ]
		  }
    ],
    LIGHTGREEN: [
		  {
        'elementType': 'geometry',
        'stylers': [
			  {
            'color': '#f5f5f5'
			  }
        ]
		  },
		  {
        'elementType': 'labels.icon',
        'stylers': [
			  {
            'visibility': 'off'
			  }
        ]
		  },
		  {
        'elementType': 'labels.text.fill',
        'stylers': [
			  {
            'color': '#616161'
			  }
        ]
		  },
		  {
        'elementType': 'labels.text.stroke',
        'stylers': [
			  {
            'color': '#f5f5f5'
			  }
        ]
		  },
		  {
        'featureType': 'administrative.land_parcel',
        'elementType': 'labels.text.fill',
        'stylers': [
			  {
            'color': '#bdbdbd'
			  }
        ]
		  },
		  {
        'featureType': 'landscape',
        'stylers': [
			  {
            'color': '#c0d0cf'
			  }
        ]
		  },
		  {
        'featureType': 'poi',
        'elementType': 'geometry',
        'stylers': [
			  {
            'color': '#eeeeee'
			  }
        ]
		  },
		  {
        'featureType': 'poi',
        'elementType': 'labels.text.fill',
        'stylers': [
			  {
            'color': '#757575'
			  }
        ]
		  },
		  {
        'featureType': 'poi.park',
        'elementType': 'geometry',
        'stylers': [
			  {
            'color': '#e5e5e5'
			  }
        ]
		  },
		  {
        'featureType': 'poi.park',
        'elementType': 'labels.text.fill',
        'stylers': [
			  {
            'color': '#9e9e9e'
			  }
        ]
		  },
		  {
        'featureType': 'road',
        'elementType': 'geometry',
        'stylers': [
			  {
            'color': '#ffffff'
			  }
        ]
		  },
		  {
        'featureType': 'road.arterial',
        'elementType': 'labels.text.fill',
        'stylers': [
			  {
            'color': '#757575'
			  }
        ]
		  },
		  {
        'featureType': 'road.highway',
        'elementType': 'geometry',
        'stylers': [
			  {
            'color': '#dadada'
			  }
        ]
		  },
		  {
        'featureType': 'road.highway',
        'elementType': 'labels.text.fill',
        'stylers': [
			  {
            'color': '#616161'
			  }
        ]
		  },
		  {
        'featureType': 'road.local',
        'elementType': 'labels.text.fill',
        'stylers': [
			  {
            'color': '#9e9e9e'
			  }
        ]
		  },
		  {
        'featureType': 'transit.line',
        'elementType': 'geometry',
        'stylers': [
			  {
            'color': '#e5e5e5'
			  }
        ]
		  },
		  {
        'featureType': 'transit.station',
        'elementType': 'geometry',
        'stylers': [
			  {
            'color': '#eeeeee'
			  }
        ]
		  },
		  {
        'featureType': 'water',
        'elementType': 'geometry',
        'stylers': [
			  {
            'color': '#c9c9c9'
			  }
        ]
		  },
		  {
        'featureType': 'water',
        'elementType': 'geometry.fill',
        'stylers': [
			  {
            'color': '#dce9e9'
			  }
        ]
		  },
		  {
        'featureType': 'water',
        'elementType': 'labels.text.fill',
        'stylers': [
			  {
            'color': '#9e9e9e'
			  }
        ]
		  }
    ],
    DIANQINGLAN: [
		  {
        'elementType': 'geometry',
        'stylers': [
			  {
            'color': '#1d2c4d'
			  }
        ]
		  },
		  {
        'elementType': 'labels.text.fill',
        'stylers': [
			  {
            'color': '#8ec3b9'
			  }
        ]
		  },
		  {
        'elementType': 'labels.text.stroke',
        'stylers': [
			  {
            'color': '#1a3646'
			  }
        ]
		  },
		  {
        'featureType': 'administrative.country',
        'elementType': 'geometry.stroke',
        'stylers': [
			  {
            'color': '#4b6878'
			  }
        ]
		  },
		  {
        'featureType': 'administrative.land_parcel',
        'elementType': 'labels.text.fill',
        'stylers': [
			  {
            'color': '#64779e'
			  }
        ]
		  },
		  {
        'featureType': 'administrative.province',
        'elementType': 'geometry.stroke',
        'stylers': [
			  {
            'color': '#4b6878'
			  }
        ]
		  },
		  {
        'featureType': 'landscape',
        'stylers': [
			  {
            'color': '#033447'
			  }
        ]
		  },
		  {
        'featureType': 'landscape',
        'elementType': 'geometry.fill',
        'stylers': [
			  {
            'color': '#033447'
			  }
        ]
		  },
		  {
        'featureType': 'landscape.man_made',
        'elementType': 'geometry.stroke',
        'stylers': [
			  {
            'color': '#334e87'
			  }
        ]
		  },
		  {
        'featureType': 'landscape.natural',
        'elementType': 'geometry',
        'stylers': [
			  {
            'color': '#023e58'
			  }
        ]
		  },
		  {
        'featureType': 'landscape.natural',
        'elementType': 'geometry.fill',
        'stylers': [
			  {
            'color': '#033447'
			  }
        ]
		  },
		  {
        'featureType': 'poi',
        'elementType': 'geometry',
        'stylers': [
			  {
            'color': '#283d6a'
			  }
        ]
		  },
		  {
        'featureType': 'poi',
        'elementType': 'labels.text.fill',
        'stylers': [
			  {
            'color': '#6f9ba5'
			  }
        ]
		  },
		  {
        'featureType': 'poi',
        'elementType': 'labels.text.stroke',
        'stylers': [
			  {
            'color': '#1d2c4d'
			  }
        ]
		  },
		  {
        'featureType': 'poi.park',
        'elementType': 'geometry.fill',
        'stylers': [
			  {
            'color': '#023e58'
			  }
        ]
		  },
		  {
        'featureType': 'poi.park',
        'elementType': 'labels.text.fill',
        'stylers': [
			  {
            'color': '#3C7680'
			  }
        ]
		  },
		  {
        'featureType': 'road',
        'elementType': 'geometry',
        'stylers': [
			  {
            'color': '#304a7d'
			  }
        ]
		  },
		  {
        'featureType': 'road',
        'elementType': 'labels.text.fill',
        'stylers': [
			  {
            'color': '#98a5be'
			  }
        ]
		  },
		  {
        'featureType': 'road',
        'elementType': 'labels.text.stroke',
        'stylers': [
			  {
            'color': '#1d2c4d'
			  }
        ]
		  },
		  {
        'featureType': 'road.highway',
        'elementType': 'geometry',
        'stylers': [
			  {
            'color': '#2c6675'
			  }
        ]
		  },
		  {
        'featureType': 'road.highway',
        'elementType': 'geometry.stroke',
        'stylers': [
			  {
            'color': '#255763'
			  }
        ]
		  },
		  {
        'featureType': 'road.highway',
        'elementType': 'labels.text.fill',
        'stylers': [
			  {
            'color': '#b0d5ce'
			  }
        ]
		  },
		  {
        'featureType': 'road.highway',
        'elementType': 'labels.text.stroke',
        'stylers': [
			  {
            'color': '#023e58'
			  }
        ]
		  },
		  {
        'featureType': 'transit',
        'elementType': 'labels.text.fill',
        'stylers': [
			  {
            'color': '#98a5be'
			  }
        ]
		  },
		  {
        'featureType': 'transit',
        'elementType': 'labels.text.stroke',
        'stylers': [
			  {
            'color': '#1d2c4d'
			  }
        ]
		  },
		  {
        'featureType': 'transit.line',
        'elementType': 'geometry.fill',
        'stylers': [
			  {
            'color': '#283d6a'
			  }
        ]
		  },
		  {
        'featureType': 'transit.station',
        'elementType': 'geometry',
        'stylers': [
			  {
            'color': '#3a4762'
			  }
        ]
		  },
		  {
        'featureType': 'water',
        'elementType': 'geometry',
        'stylers': [
			  {
            'color': '#0e1626'
			  }
        ]
		  },
		  {
        'featureType': 'water',
        'elementType': 'geometry.fill',
        'stylers': [
			  {
            'color': '#133f58'
			  }
        ]
		  },
		  {
        'featureType': 'water',
        'elementType': 'labels.text.fill',
        'stylers': [
			  {
            'color': '#4e6d70'
			  }
        ]
		  }
    ],
    YUEGUANGYIN: [
		  {
        'elementType': 'geometry',
        'stylers': [
			  {
            'color': '#f5f5f5'
			  }
        ]
		  },
		  {
        'elementType': 'labels.icon',
        'stylers': [
			  {
            'visibility': 'off'
			  }
        ]
		  },
		  {
        'elementType': 'labels.text.fill',
        'stylers': [
			  {
            'color': '#616161'
			  }
        ]
		  },
		  {
        'elementType': 'labels.text.stroke',
        'stylers': [
			  {
            'color': '#f5f5f5'
			  }
        ]
		  },
		  {
        'featureType': 'administrative.country',
        'elementType': 'geometry.stroke',
        'stylers': [
			  {
            'color': '#c9c9c9'
			  }
        ]
		  },
		  {
        'featureType': 'administrative.land_parcel',
        'elementType': 'labels.text.fill',
        'stylers': [
			  {
            'color': '#bdbdbd'
			  }
        ]
		  },
		  {
        'featureType': 'landscape.natural',
        'elementType': 'geometry.fill',
        'stylers': [
			  {
            'color': '#f2f2f2'
			  }
        ]
		  },
		  {
        'featureType': 'poi',
        'elementType': 'geometry',
        'stylers': [
			  {
            'color': '#eeeeee'
			  }
        ]
		  },
		  {
        'featureType': 'poi',
        'elementType': 'labels.text.fill',
        'stylers': [
			  {
            'color': '#757575'
			  }
        ]
		  },
		  {
        'featureType': 'poi.park',
        'elementType': 'geometry',
        'stylers': [
			  {
            'color': '#e5e5e5'
			  }
        ]
		  },
		  {
        'featureType': 'poi.park',
        'elementType': 'labels.text.fill',
        'stylers': [
			  {
            'color': '#9e9e9e'
			  }
        ]
		  },
		  {
        'featureType': 'road',
        'elementType': 'geometry',
        'stylers': [
			  {
            'color': '#ffffff'
			  }
        ]
		  },
		  {
        'featureType': 'road.arterial',
        'elementType': 'labels.text.fill',
        'stylers': [
			  {
            'color': '#757575'
			  }
        ]
		  },
		  {
        'featureType': 'road.highway',
        'elementType': 'geometry',
        'stylers': [
			  {
            'color': '#dadada'
			  }
        ]
		  },
		  {
        'featureType': 'road.highway',
        'elementType': 'labels.text.fill',
        'stylers': [
			  {
            'color': '#616161'
			  }
        ]
		  },
		  {
        'featureType': 'road.local',
        'elementType': 'labels.text.fill',
        'stylers': [
			  {
            'color': '#9e9e9e'
			  }
        ]
		  },
		  {
        'featureType': 'transit.line',
        'elementType': 'geometry',
        'stylers': [
			  {
            'color': '#e5e5e5'
			  }
        ]
		  },
		  {
        'featureType': 'transit.station',
        'elementType': 'geometry',
        'stylers': [
			  {
            'color': '#eeeeee'
			  }
        ]
		  },
		  {
        'featureType': 'water',
        'elementType': 'geometry',
        'stylers': [
			  {
            'color': '#c9c9c9'
			  }
        ]
		  },
		  {
        'featureType': 'water',
        'elementType': 'labels.text.fill',
        'stylers': [
			  {
            'color': '#9e9e9e'
			  }
        ]
		  }
    ],
    YASHIHUI: [
		  {
        'elementType': 'geometry',
        'stylers': [
			  {
            'color': '#212121'
			  }
        ]
		  },
		  {
        'elementType': 'labels.icon',
        'stylers': [
			  {
            'visibility': 'off'
			  }
        ]
		  },
		  {
        'elementType': 'labels.text.fill',
        'stylers': [
			  {
            'color': '#757575'
			  }
        ]
		  },
		  {
        'elementType': 'labels.text.stroke',
        'stylers': [
			  {
            'color': '#212121'
			  }
        ]
		  },
		  {
        'featureType': 'administrative',
        'elementType': 'geometry',
        'stylers': [
			  {
            'color': '#757575'
			  }
        ]
		  },
		  {
        'featureType': 'administrative.country',
        'elementType': 'geometry.stroke',
        'stylers': [
			  {
            'color': '#0a141c'
			  },
			  {
            'weight': 1.5
			  }
        ]
		  },
		  {
        'featureType': 'administrative.country',
        'elementType': 'labels.text.fill',
        'stylers': [
			  {
            'color': '#9e9e9e'
			  }
        ]
		  },
		  {
        'featureType': 'administrative.land_parcel',
        'stylers': [
			  {
            'visibility': 'off'
			  }
        ]
		  },
		  {
        'featureType': 'administrative.locality',
        'elementType': 'labels.text.fill',
        'stylers': [
			  {
            'color': '#bdbdbd'
			  }
        ]
		  },
		  {
        'featureType': 'administrative.province',
        'elementType': 'geometry.stroke',
        'stylers': [
			  {
            'color': '#0a141c'
			  },
			  {
            'weight': 1.5
			  }
        ]
		  },
		  {
        'featureType': 'landscape.man_made',
        'elementType': 'geometry.fill',
        'stylers': [
			  {
            'color': '#202b34'
			  }
        ]
		  },
		  {
        'featureType': 'landscape.natural',
        'elementType': 'geometry.fill',
        'stylers': [
			  {
            'color': '#1a232c'
			  }
        ]
		  },
		  {
        'featureType': 'poi',
        'elementType': 'labels.text.fill',
        'stylers': [
			  {
            'color': '#757575'
			  }
        ]
		  },
		  {
        'featureType': 'poi.park',
        'elementType': 'geometry',
        'stylers': [
			  {
            'color': '#181818'
			  }
        ]
		  },
		  {
        'featureType': 'poi.park',
        'elementType': 'labels.text.fill',
        'stylers': [
			  {
            'color': '#616161'
			  }
        ]
		  },
		  {
        'featureType': 'poi.park',
        'elementType': 'labels.text.stroke',
        'stylers': [
			  {
            'color': '#1b1b1b'
			  }
        ]
		  },
		  {
        'featureType': 'road',
        'elementType': 'geometry.fill',
        'stylers': [
			  {
            'color': '#2c2c2c'
			  }
        ]
		  },
		  {
        'featureType': 'road',
        'elementType': 'labels.text.fill',
        'stylers': [
			  {
            'color': '#8a8a8a'
			  }
        ]
		  },
		  {
        'featureType': 'road.arterial',
        'elementType': 'geometry',
        'stylers': [
			  {
            'color': '#373737'
			  }
        ]
		  },
		  {
        'featureType': 'road.arterial',
        'elementType': 'geometry.fill',
        'stylers': [
			  {
            'color': '#0a141c'
			  }
        ]
		  },
		  {
        'featureType': 'road.arterial',
        'elementType': 'geometry.stroke',
        'stylers': [
			  {
            'color': '#0a141c'
			  }
        ]
		  },
		  {
        'featureType': 'road.highway',
        'elementType': 'geometry',
        'stylers': [
			  {
            'color': '#3c3c3c'
			  }
        ]
		  },
		  {
        'featureType': 'road.highway',
        'elementType': 'geometry.fill',
        'stylers': [
			  {
            'color': '#0a141c'
			  },
			  {
            'weight': 0.5
			  }
        ]
		  },
		  {
        'featureType': 'road.highway',
        'elementType': 'geometry.stroke',
        'stylers': [
			  {
            'color': '#0a141c'
			  },
			  {
            'weight': 0.5
			  }
        ]
		  },
		  {
        'featureType': 'road.highway.controlled_access',
        'elementType': 'geometry',
        'stylers': [
			  {
            'color': '#4e4e4e'
			  }
        ]
		  },
		  {
        'featureType': 'road.local',
        'elementType': 'geometry.fill',
        'stylers': [
			  {
            'color': '#0a141c'
			  }
        ]
		  },
		  {
        'featureType': 'road.local',
        'elementType': 'geometry.stroke',
        'stylers': [
			  {
            'color': '#0a141c'
			  }
        ]
		  },
		  {
        'featureType': 'road.local',
        'elementType': 'labels.text.fill',
        'stylers': [
			  {
            'color': '#616161'
			  }
        ]
		  },
		  {
        'featureType': 'transit',
        'elementType': 'labels.text.fill',
        'stylers': [
			  {
            'color': '#757575'
			  }
        ]
		  },
		  {
        'featureType': 'water',
        'elementType': 'geometry',
        'stylers': [
			  {
            'color': '#000000'
			  }
        ]
		  },
		  {
        'featureType': 'water',
        'elementType': 'geometry.fill',
        'stylers': [
			  {
            'color': '#0a141c'
			  }
        ]
		  },
		  {
        'featureType': 'water',
        'elementType': 'labels.text.fill',
        'stylers': [
			  {
            'color': '#3d3d3d'
			  }
        ]
		  }
    ]
  }

  // 百度地图的主题
  const BaiduStyle = {
    BLUE: [{
      'featureType': 'water',
      'elementType': 'all',
      'stylers': {
        'color': '#004881'
      }
    },
    {
      'featureType': 'land',
      'elementType': 'all',
      'stylers': {
        'color': '#070D40'
      }
    },
    {
      'featureType': 'boundary',
      'elementType': 'geometry',
      'stylers': {
        'color': '#064f85'
      }
    },
    {
      'featureType': 'railway',
      'elementType': 'all',
      'stylers': {
        'visibility': 'off'
      }
    },
    {
      'featureType': 'highway',
      'elementType': 'geometry',
      'stylers': {
        'color': '#004981'
      }
    },
    {
      'featureType': 'highway',
      'elementType': 'geometry.fill',
      'stylers': {
        'color': '#005b96',
        'lightness': 1
      }
    },
    {
      'featureType': 'highway',
      'elementType': 'labels',
      'stylers': {
        'visibility': 'off'
      }
    },
    {
      'featureType': 'arterial',
      'elementType': 'geometry',
      'stylers': {
        'color': '#004981'
      }
    },
    {
      'featureType': 'arterial',
      'elementType': 'geometry.fill',
      'stylers': {
        'color': '#00508b'
      }
    },
    {
      'featureType': 'poi',
      'elementType': 'all',
      'stylers': {
        'visibility': 'off'
      }
    },
    {
      'featureType': 'green',
      'elementType': 'all',
      'stylers': {
        'color': '#056197',
        'visibility': 'off'
      }
    },
    {
      'featureType': 'subway',
      'elementType': 'all',
      'stylers': {
        'visibility': 'off'
      }
    },
    {
      'featureType': 'manmade',
      'elementType': 'all',
      'stylers': {
        'visibility': 'off'
      }
    },
    {
      'featureType': 'local',
      'elementType': 'all',
      'stylers': {
        'visibility': 'off'
      }
    },
    {
      'featureType': 'arterial',
      'elementType': 'labels',
      'stylers': {
        'visibility': 'off'
      }
    },
    {
      'featureType': 'boundary',
      'elementType': 'geometry.fill',
      'stylers': {
        'color': '#029fd4'
      }
    },
    {
      'featureType': 'building',
      'elementType': 'all',
      'stylers': {
        'color': '#1a5787'
      }
    },
    {
      'featureType': 'label',
      'elementType': 'all',
      'stylers': {
        'visibility': 'off'
      }
    }],
    DARKBLUE: [{
      'featureType': 'water',
      'elementType': 'all',
      'stylers': {
        'color': '#102445'
      }
    },
    {
      'featureType': 'land',
      'elementType': 'all',
      'stylers': {
        'color': '#031220'
      }
    },
    {
      'featureType': 'boundary',
      'elementType': 'geometry',
      'stylers': {
        'color': '#2B3A7C'
      }
    },
    {
      'featureType': 'railway',
      'elementType': 'all',
      'stylers': {
        'visibility': 'off'
      }
    },
    {
      'featureType': 'highway',
      'elementType': 'geometry',
      'stylers': {
        'color': '#004981'
      }
    },
    {
      'featureType': 'highway',
      'elementType': 'geometry.fill',
      'stylers': {
        'color': '#005b96',
        'lightness': 1
      }
    },
    {
      'featureType': 'highway',
      'elementType': 'labels',
      'stylers': {
        'visibility': 'off'
      }
    },
    {
      'featureType': 'arterial',
      'elementType': 'geometry',
      'stylers': {
        'color': '#004981'
      }
    },
    {
      'featureType': 'arterial',
      'elementType': 'geometry.fill',
      'stylers': {
        'color': '#00508b'
      }
    },
    {
      'featureType': 'poi',
      'elementType': 'all',
      'stylers': {
        'visibility': 'off'
      }
    },
    {
      'featureType': 'green',
      'elementType': 'all',
      'stylers': {
        'color': '#056197',
        'visibility': 'off'
      }
    },
    {
      'featureType': 'subway',
      'elementType': 'all',
      'stylers': {
        'visibility': 'off'
      }
    },
    {
      'featureType': 'manmade',
      'elementType': 'all',
      'stylers': {
        'visibility': 'off'
      }
    },
    {
      'featureType': 'local',
      'elementType': 'all',
      'stylers': {
        'visibility': 'off'
      }
    },
    {
      'featureType': 'arterial',
      'elementType': 'labels',
      'stylers': {
        'visibility': 'off'
      }
    },
    {
      'featureType': 'boundary',
      'elementType': 'geometry.fill',
      'stylers': {
        'color': '#2B3A7C'
      }
    },
    {
      'featureType': 'building',
      'elementType': 'all',
      'stylers': {
        'color': '#1a5787'
      }
    },
    {
      'featureType': 'label',
      'elementType': 'all',
      'stylers': {
        'visibility': 'off'
      }
    }],
    LIGHTGREEN: [
      {
        'featureType': 'water',
        'elementType': 'all',
        'stylers': {
          'color': '#dce9e9ff'
        }
      },
      {
        'featureType': 'land',
        'elementType': 'geometry.fill',
        'stylers': {
          'color': '#c0d0cfff'
        }
      },
      {
        'featureType': 'green',
        'elementType': 'all',
        'stylers': {
          'color': '#d7e4e3ff'
        }
      },
      {
        'featureType': 'boundary',
        'elementType': 'geometry',
        'stylers': {
          'color': '#bcc4c4ff'
        }
      },
      {
        'featureType': 'country',
        'elementType': 'labels.text.fill',
        'stylers': {
          'color': '#bab4b4ff'
        }
      }
    ],
    LIGHTBLUE: [
      {
        'featureType': 'water',
        'elementType': 'all',
        'stylers': {
          'color': '#dfebff'
        }
      },
      {
        'featureType': 'land',
        'elementType': 'geometry.fill',
        'stylers': {
          'color': '#b5cdef'
        }
      },
      {
        'featureType': 'green',
        'elementType': 'all',
        'stylers': {
          'color': '#dee5e5'
        }
      },
      {
        'featureType': 'boundary',
        'elementType': 'geometry',
        'stylers': {
          'color': '#a5bbd0'
        }
      },
      {
        'featureType': 'country',
        'elementType': 'labels.text.fill',
        'stylers': {
          'color': '#bab4b4ff'
        }
      }
    ],
    DIANQINGLAN: [
      {
        'featureType': 'water',
        'elementType': 'all',
        'stylers': {
          'color': '#133f58ff'
        }
      },
      {
        'featureType': 'highway',
        'elementType': 'geometry.fill',
        'stylers': {
          'color': '#2d6976c9',
          'lightness': -20
        }
      },
      {
        'featureType': 'highway',
        'elementType': 'geometry.stroke',
        'stylers': {
          'color': '#147a92'
        }
      },
      {
        'featureType': 'arterial',
        'elementType': 'geometry.fill',
        'stylers': {
          'color': '#000000'
        }
      },
      {
        'featureType': 'arterial',
        'elementType': 'geometry.stroke',
        'stylers': {
          'color': '#0b3d51'
        }
      },
      {
        'featureType': 'local',
        'elementType': 'geometry',
        'stylers': {
          'color': '#000000'
        }
      },
      {
        'featureType': 'land',
        'elementType': 'all',
        'stylers': {
          'color': '#033447ff'
        }
      },
      {
        'featureType': 'railway',
        'elementType': 'geometry.fill',
        'stylers': {
          'color': '#000000'
        }
      },
      {
        'featureType': 'railway',
        'elementType': 'geometry.stroke',
        'stylers': {
          'color': '#08304b'
        }
      },
      {
        'featureType': 'subway',
        'elementType': 'geometry',
        'stylers': {
          'lightness': -70
        }
      },
      {
        'featureType': 'building',
        'elementType': 'geometry.fill',
        'stylers': {
          'color': '#000000'
        }
      },
      {
        'featureType': 'all',
        'elementType': 'labels.text.fill',
        'stylers': {
          'color': '#857f7f'
        }
      },
      {
        'featureType': 'all',
        'elementType': 'labels.text.stroke',
        'stylers': {
          'color': '#000000'
        }
      },
      {
        'featureType': 'building',
        'elementType': 'geometry',
        'stylers': {
          'color': '#022338'
        }
      },
      {
        'featureType': 'green',
        'elementType': 'geometry',
        'stylers': {
          'color': '#062032'
        }
      },
      {
        'featureType': 'boundary',
        'elementType': 'all',
        'stylers': {
          'color': '#00646fff'
        }
      },
      {
        'featureType': 'manmade',
        'elementType': 'geometry',
        'stylers': {
          'color': '#022338'
        }
      },
      {
        'featureType': 'poi',
        'elementType': 'all',
        'stylers': {
          'visibility': 'off'
        }
      },
      {
        'featureType': 'all',
        'elementType': 'labels.icon',
        'stylers': {
          'visibility': 'off'
        }
      },
      {
        'featureType': 'all',
        'elementType': 'labels.text.fill',
        'stylers': {
          'color': '#2da0c6',
          'visibility': 'on'
        }
      }
    ],
    YUEGUANGYIN: [
      {
        'featureType': 'land',
        'elementType': 'all',
        'stylers': {
          'color': '#f2f2f2ff'
        }
      },
      {
        'featureType': 'water',
        'elementType': 'all',
        'stylers': {
          'color': '#c9c9c9ff'
        }
      },
      {
        'featureType': 'boundary',
        'elementType': 'all',
        'stylers': {
          'color': '#dbdbdbff'
        }
      },
      {
        'featureType': 'country',
        'elementType': 'labels.text.fill',
        'stylers': {
          'color': '#444444ff'
        }
      },
      {
        'featureType': 'green',
        'elementType': 'all',
        'stylers': {
          'color': '#e0ebdcff'
        }
      },
      {
        'featureType': 'building',
        'elementType': 'all',
        'stylers': {
          'color': '#dfdfdfff'
        }
      },
      {
        'featureType': 'highway',
        'elementType': 'all',
        'stylers': {
          'color': '#dbdbdbff'
        }
      }
    ],
    YASHIHUI: [
      {
        'featureType': 'land',
        'elementType': 'geometry',
        'stylers': {
          'color': '#1a232cff'
        }
      },
      {
        'featureType': 'building',
        'elementType': 'geometry',
        'stylers': {
          'color': '#222d37ff'
        }
      },
      {
        'featureType': 'highway',
        'elementType': 'all',
        'stylers': {
          'color': '#060d16ff',
          'lightness': -42,
          'saturation': -91
        }
      },
      {
        'featureType': 'arterial',
        'elementType': 'geometry',
        'stylers': {
          'lightness': -77,
          'saturation': -94
        }
      },
      {
        'featureType': 'green',
        'elementType': 'geometry',
        'stylers': {
          'color': '#222d37ff'
        }
      },
      {
        'featureType': 'water',
        'elementType': 'geometry',
        'stylers': {
          'color': '#0a141cff'
        }
      },
      {
        'featureType': 'subway',
        'elementType': 'geometry.stroke',
        'stylers': {
          'color': '#181818'
        }
      },
      {
        'featureType': 'railway',
        'elementType': 'geometry',
        'stylers': {
          'lightness': -52
        }
      },
      {
        'featureType': 'all',
        'elementType': 'labels.text.stroke',
        'stylers': {
          'color': '#313131'
        }
      },
      {
        'featureType': 'all',
        'elementType': 'labels.text.fill',
        'stylers': {
          'color': '#8b8787'
        }
      },
      {
        'featureType': 'manmade',
        'elementType': 'geometry',
        'stylers': {
          'color': '#1b1b1b'
        }
      },
      {
        'featureType': 'local',
        'elementType': 'geometry',
        'stylers': {
          'color': '#060d16ff',
          'lightness': -75,
          'saturation': -91
        }
      },
      {
        'featureType': 'subway',
        'elementType': 'geometry',
        'stylers': {
          'color': '#060d16ff',
          'lightness': -65
        }
      },
      {
        'featureType': 'railway',
        'elementType': 'all',
        'stylers': {
          'lightness': -40
        }
      },
      {
        'featureType': 'boundary',
        'elementType': 'geometry',
        'stylers': {
          'color': '#0a141cff',
          'weight': '1',
          'lightness': -29
        }
      },
      {
        'featureType': 'country',
        'elementType': 'labels.text.fill',
        'stylers': {
          'color': '#a5adc8ff'
        }
      }
    ]
  }

  // 高德地图的主题
  const GaodeStyle = {
    DARK: 'amap://styles/23ee90d14fc162d38217030531ceb590',
    // DARK:"amap://styles/dark",
    LIGHT: 'amap://styles/fresh',
    NORMAL: 'amap://styles/normal',
    // BLUE:"amap://styles/0a293ee211224237f973963785159c00"  //大屏
    BLUE: 'amap://styles/c7f70679a11cf44a1e46536213ffbbf7',
    DARKBLUE: 'amap://styles/b9de2a0a444a90859371f0418a6fa3fa',
    LIGHTBLUE: 'amap://styles/4aca2d6335e3de5895e095f2ed869372',
    LIGHTGREEN: 'amap://styles/99feeb678929dee39707070ba89f9d1a', // "amap://styles/417ac51b222df762eaac065fdb45ad2d",
    DIANQINGLAN: 'amap://styles/blue',
    YUEGUANGYIN: 'amap://styles/light',
    YASHIHUI: 'amap://styles/grey'
  }

  // 坐标转换工具类
  var GPSCoverterUtils = {
    PI: 3.14159265358979324,
    x_pi: 3.14159265358979324 * 3000.0 / 180.0,
    delta: function (lat, lng) {
      var a = 6378245.0 //  a: 卫星椭球坐标投影到平面地图坐标系的投影因子。
      var ee = 0.00669342162296594323 //  ee: 椭球的偏心率。
      var dLat = this.transformLat(lng - 105.0, lat - 35.0)
      var dLng = this.transformLng(lng - 105.0, lat - 35.0)
      var radLat = lat / 180.0 * this.PI
      var magic = Math.sin(radLat)
      magic = 1 - ee * magic * magic
      var sqrtMagic = Math.sqrt(magic)
      dLat = (dLat * 180.0) / ((a * (1 - ee)) / (magic * sqrtMagic) * this.PI)
      dLng = (dLng * 180.0) / (a / sqrtMagic * Math.cos(radLat) * this.PI)
      return { 'lat': dLat, 'lng': dLng }
    },
    /**
		 * WGS-84 to GCJ-02 GPS坐标转中国坐标
		 * @param  {number} wgsLat GPS纬度
		 * @param  {number} wgsLng GPS经度
		 * @return {object}        返回中国坐标经纬度对象
		 */
    GPSToChina: function (wgsLat, wgsLng) {
      if (this.outOfChina(wgsLat, wgsLng)) { return { 'lat': wgsLat, 'lng': wgsLng } }
      var d = this.delta(wgsLat, wgsLng)
      return { 'lat': Number(wgsLat) + Number(d.lat), 'lng': Number(wgsLng) + Number(d.lng) }
    },
    /**
		 * GCJ-02 to WGS-84 exactly 中国标准坐标转GPS坐标(精确)
		 * @param  {number} gcjLat  中国标准坐标纬度
		 * @param  {number} gcjLng  中国标准坐标经度
		 * @return {object}         返回GPS经纬度对象(精确)
		 */
    chinaToGPSExact: function (gcjLat, gcjLng) {
      var initDelta = 0.01
      var threshold = 0.000000001
      var dLat = initDelta
      var dLng = initDelta
      var mLat = gcjLat - dLat
      var mLng = gcjLng - dLng
      var pLat = gcjLat + dLat
      var pLng = gcjLng + dLng
      var wgsLat; var wgsLng; var i = 0
      while (1) {
        wgsLat = (mLat + pLat) / 2
        wgsLng = (mLng + pLng) / 2
        var tmp = this.GPSToChina(wgsLat, wgsLng)
        dLat = tmp.lat - gcjLat
        dLng = tmp.lng - gcjLng
        if ((Math.abs(dLat) < threshold) && (Math.abs(dLng) < threshold)) { break }

        if (dLat > 0) pLat = wgsLat
        else mLat = wgsLat
        if (dLng > 0) pLng = wgsLng
        else mLng = wgsLng

        if (++i > 10000) break
      }
      // console.log(i);
      return { 'lat': wgsLat, 'lng': wgsLng }
    },
    /**
		 * GCJ-02 to BD-09 中国标准坐标转百度坐标(精确)
		 * @param  {number} gcjLat  中国标准坐标纬度
		 * @param  {number} gcjLng  中国标准坐标经度
		 * @return {object}         返回百度经纬度对象
		 */
    chinaToBaidu: function (gcjLat, gcjLng) {
      var x = gcjLng
      var y = gcjLat
      var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * this.x_pi)
      var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * this.x_pi)
      bdLng = z * Math.cos(theta) + 0.0065
      bdLat = z * Math.sin(theta) + 0.006
      return { 'lat': bdLat, 'lng': bdLng }
    },
		  /**
		 * BD-09 to GCJ-02 百度坐标转中国标准坐标
		 * @param  {number} bdLat  百度坐标纬度
		 * @param  {number} bdLng  百度坐标经度
		 * @return {object}        返回中国标准经纬度对象
		 */
    baiduToChina: function (bdLat, bdLng) {
      var x = bdLng - 0.0065
      var y = bdLat - 0.006
      var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * this.x_pi)
      var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * this.x_pi)
      var gcjLng = z * Math.cos(theta)
      var gcjLat = z * Math.sin(theta)
      return { 'lat': gcjLat, 'lng': gcjLng }
    },
    /**
		 * 是否在中国之外
		 * @param  {number} lat 纬度
		 * @param  {number} lng 经度
		 * @return {boolean]}     返回结果真或假
		 */
    outOfChina: function (lat, lng) {
      if (lng < 72.004 || lng > 137.8347) { return true }
      if (lat < 0.8293 || lat > 55.8271) { return true }
      return false
    },
    transformLat: function (x, y) {
      var ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x))
      ret += (20.0 * Math.sin(6.0 * x * this.PI) + 20.0 * Math.sin(2.0 * x * this.PI)) * 2.0 / 3.0
      ret += (20.0 * Math.sin(y * this.PI) + 40.0 * Math.sin(y / 3.0 * this.PI)) * 2.0 / 3.0
      ret += (160.0 * Math.sin(y / 12.0 * this.PI) + 320 * Math.sin(y * this.PI / 30.0)) * 2.0 / 3.0
      return ret
    },
    transformLng: function (x, y) {
      var ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x))
      ret += (20.0 * Math.sin(6.0 * x * this.PI) + 20.0 * Math.sin(2.0 * x * this.PI)) * 2.0 / 3.0
      ret += (20.0 * Math.sin(x * this.PI) + 40.0 * Math.sin(x / 3.0 * this.PI)) * 2.0 / 3.0
      ret += (150.0 * Math.sin(x / 12.0 * this.PI) + 300.0 * Math.sin(x / 30.0 * this.PI)) * 2.0 / 3.0
      return ret
    }
  }

  // google坐标转换工具类
  var GoogleCoverterUtils = {
    latLng2Point: function (latLng, map) {
		    var topRight = map.getProjection().fromLatLngToPoint(map.getBounds().getNorthEast())
		    var bottomLeft = map.getProjection().fromLatLngToPoint(map.getBounds().getSouthWest())
		    var scale = Math.pow(2, map.getZoom())
		    var worldPoint = map.getProjection().fromLatLngToPoint(latLng)
		    return new google.maps.Point((worldPoint.x - bottomLeft.x) * scale, (worldPoint.y - topRight.y) * scale)
    },

    point2LatLng: function (point, map) {
		    var topRight = map.getProjection().fromLatLngToPoint(map.getBounds().getNorthEast())
		    var bottomLeft = map.getProjection().fromLatLngToPoint(map.getBounds().getSouthWest())
		    var scale = Math.pow(2, map.getZoom())
		    var worldPoint = new google.maps.Point(point.x / scale + bottomLeft.x, point.y / scale + topRight.y)
		    return map.getProjection().fromPointToLatLng(worldPoint)
    }
  }

  /* var GoogleCoverterUtils2 = {
		latLng2Point: function(latLng, zoom) {
			var pixelY = (latLng.lng + 180) * (256L << zoom) / 360;
			var siny = Math.sin(latLng.lat * Math.PI / 180);
			var y = Math.log((1 + siny) / (1 - siny));
			var pixelX = (128 << zoom) * (1 - y / (2 * Math.PI));
		    return {x:pixelX, y:pixelY}；
		},
	} */

  // 生成指定位数的纯数字字符串
  var randomNum = function (n) {
    var res = ''
    for (var i = 0; i < n; i++) {
      res += Math.floor(Math.random() * 10)
    }
    return res
  }

  // 对外暴露的事件类型
  const EVENT_TYPE = {
    CLICK: 'click',
    DOUBLE_CLICK: 'dblclick',
    RIGHT_CLICK: 'rightclick',
    DRAGGING: 'dragging',
    DRAG_START: 'dragstart',
    DRAG_END: 'dragend',
    ZOOM_CHANGE: 'zoomchanged',
    ZOOM_START: 'zoomstart',
    ZOOM_END: 'zoomend',
    OPEN: 'open',
    CLOSE: 'close',
    MOVING: 'moving',
    MOVESTART: 'movestart',
    MOVEEND: 'moveend',
    PROJECTION_CHANGE: 'projectionChanged',
    BOUNDS_CHANGE: 'boundsChanged'
  }

  // 将事件类型映射为高德地图的事件类型
  const convertEvent2AMapType = function (event) {
    if (event == EVENT_TYPE.CLICK) {
      return 'click'
    } else if (event == EVENT_TYPE.DOUBLE_CLICK) {
      return 'dblclick'
    } else if (event == EVENT_TYPE.RIGHT_CLICK) {
      return 'rightclick'
    } else if (event == EVENT_TYPE.DRAGGING) {
      return 'dragging'
    } else if (event == EVENT_TYPE.DRAG_START) {
      return 'dragstart'
    } else if (event == EVENT_TYPE.DRAG_END) {
      return 'dragend'
    } else if (event == EVENT_TYPE.ZOOM_CHANGE) {
      return 'zoomchange'
    } else if (event == EVENT_TYPE.ZOOM_START) {
      return 'zoomstart'
    } else if (event == EVENT_TYPE.ZOOM_END) {
      return 'zoomend'
    } else if (event == EVENT_TYPE.OPEN) {
      return 'open'
    } else if (event == EVENT_TYPE.CLOSE) {
      return 'close'
    } else if (event == EVENT_TYPE.MOVING) { // 高德地图没有moving事件
      return 'movestart'
    } else if (event == EVENT_TYPE.MOVESTART) {
      return 'movestart'
    } else if (event == EVENT_TYPE.MOVEEND) {
      return 'moveend'
    } else {
      return ''
    }
  }

  // 将事件类型映射为谷歌地图的事件类型
  const convertEvent2GoogleMapType = function (event) {
    if (event == EVENT_TYPE.CLICK) {
      return 'click'
    } else if (event == EVENT_TYPE.DOUBLE_CLICK) {
      return 'dblclick'
    } else if (event == EVENT_TYPE.RIGHT_CLICK) {
      return 'rightclick'
    } else if (event == EVENT_TYPE.DRAGGING) {
      return 'drag'
    } else if (event == EVENT_TYPE.DRAG_START) {
      return 'dragstart'
    } else if (event == EVENT_TYPE.DRAG_END) {
      return 'dragend'
    } else if (event == EVENT_TYPE.ZOOM_CHANGE) {
      return 'zoom_changed'
    } else if (event == EVENT_TYPE.ZOOM_START) { // 谷歌地图没有zoomstart
      return 'zoom_changed'
    } else if (event == EVENT_TYPE.ZOOM_END) { // 谷歌地图没有zoomend
      return 'zoom_changed'
    }
    /* else if (event == EVENT_TYPE.OPEN) { //谷歌地图没有open
			return "open";
		} */
    else if (event == EVENT_TYPE.CLOSE) {
      return 'closeclick'
    }
    // 谷歌地图没有move相关事件
    else if (event == EVENT_TYPE.PROJECTION_CHANGE) {
      return 'projection_changed'
    } else if (event == EVENT_TYPE.BOUNDS_CHANGE) {
      return 'bounds_changed'
    } else {
      return ''
    }
  }

  // 将事件类型映射为百度地图的事件类型
  const convertEvent2BMapType = function (event) {
    if (event == EVENT_TYPE.CLICK) {
      return 'click'
    } else if (event == EVENT_TYPE.DOUBLE_CLICK) {
      return 'dblclick'
    } else if (event == EVENT_TYPE.RIGHT_CLICK) {
      return 'rightclick'
    } else if (event == EVENT_TYPE.DRAGGING) {
      return 'dragging'
    } else if (event == EVENT_TYPE.DRAG_START) {
      return 'dragstart'
    } else if (event == EVENT_TYPE.DRAG_END) {
      return 'dragend'
    } else if (event == EVENT_TYPE.ZOOM_CHANGE) {
      return 'zoomend' // 百度地图没有zoomchange
    } else if (event == EVENT_TYPE.ZOOM_START) {
      return 'zoomstart'
    } else if (event == EVENT_TYPE.ZOOM_END) {
      return 'zoomend'
    } else if (event == EVENT_TYPE.MOVING) {
      return 'moving'
    } else if (event == EVENT_TYPE.MOVESTART) {
      return 'movestart'
    } else if (event == EVENT_TYPE.MOVEEND) {
      return 'moveend'
    } else {
      return ''
    }
  }

  const CALLBACK_STATUS = {
    SUCCESS: 'success',
    ERROR: 'error'
  }

  var gis = {}

  /*
	* 加载地图JS API
	*/
  gis.Hmap2D = function (mapType, key, callback) {
    // gis地图实例
	    /* var gisMap = {
			mapType: mapType
		}; */

    // 引入css样式
    /* var head = document.getElementsByTagName('head')[0];
		var link = document.createElement('link');
		link.rel = 'stylesheet';
		link.type = 'text/css';
		link.href = 'gismap.css';
		head.appendChild(link); */

    switch (mapType) {
      case MapType.GAODE_MAP:
        window.onLoadAMap = function () {
          gis.mapTypeLoading = mapType
          callback(gis)
        }
        var url = 'https://webapi.amap.com/maps?v=1.4.12&key=' + key + '&plugin=AMap.Driving,AMap.Riding,AMap.Walking,AMap.MapType,AMap.Scale,AMap.Geocoder,AMap.ControlBar,AMap.CustomLayer,AMap.MarkerClusterer&callback=onLoadAMap'
        break

      case MapType.BAIDU_MAP:
        var onloadMarkerClusterer = function () {
          gis.mapTypeLoading = mapType
          callback(gis)
        }

        var onloadTextIconOverlay = function () {
          var jsapi2 = document.createElement('script')
          jsapi2.type = 'text/javascript'
          jsapi2.src = 'https://api.map.baidu.com/library/MarkerClusterer/1.2/src/MarkerClusterer_min.js'
          document.head.appendChild(jsapi2)
          jsapi2.onload = onloadMarkerClusterer
        }

        window.onLoadBMap = function () {
          var jsapi1 = document.createElement('script')
          jsapi1.type = 'text/javascript'
          jsapi1.src = 'https://api.map.baidu.com/library/TextIconOverlay/1.2/src/TextIconOverlay_min.js'
          document.head.appendChild(jsapi1)
          jsapi1.onload = onloadTextIconOverlay

          var jsapi3 = document.createElement('script')
          jsapi3.type = 'text/javascript'
          jsapi3.src = 'https://api.map.baidu.com/library/InfoBox/1.2/src/InfoBox_min.js'
          document.head.appendChild(jsapi3)
        }
        var url = 'https://api.map.baidu.com/api?v=3.0&ak=' + key + '&callback=onLoadBMap'
        break

      case MapType.GOOGLE_MAP:
      default:
        /* window.onLoadGoogleMap = function () {
					callback(gisMap);
				}
				var url = 'https://maps.googleapis.com/maps/api/js?key=' + key + '&libraries=geometry,places&callback=onLoadGoogleMap'; */

        var onloadMarkerClusterer = function () {
          gis.mapTypeLoading = mapType
          callback(gis)
        }

        window.onLoadGoogleMap = function () {
          var jsapi1 = document.createElement('script')
          jsapi1.type = 'text/javascript'
          jsapi1.src = 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/markerclusterer.js'
          document.head.appendChild(jsapi1)
          jsapi1.onload = onloadMarkerClusterer
        }
        var url = 'https://maps.googleapis.com/maps/api/js?key=' + key + '&libraries=geometry,places&callback=onLoadGoogleMap'

        break
    }

    var jsapi = document.createElement('script')
    jsapi.charset = 'utf-8'
    jsapi.src = url
    document.head.appendChild(jsapi)
  }

  /*
	* 初始化地图
	*/
  gis.loadMap = function (options) {
    var gisMap = {
      mapType: gis.mapTypeLoading
    }

    if (!options) {
      throw new Error('Map inputs are required.')
    }
    if (options.mapType) {
      if (options.mapType != 'BAIDU_MAP' && options.mapType != 'GOOGLE_MAP' && options.mapType != 'GAODE_MAP') {
        throw new Error("Input 'mapType' should be 'BAIDU_MAP' or 'GOOGLE_MAP' or 'GAODE_MAP'.")
      } else {
        gisMap.mapType = options.mapType
      }
    }
    if (!options.container) {
      throw new Error("Input 'container' is required.")
    }
    if (typeof options.zoom !== 'number' || options.zoom < 1 || options.zoom > 19) {
      throw new Error("Input 'zoom' is required and should between number 1 to 19.")
    }
    if (!Array.isArray(options.center) || options.center.length < 2) {
      throw new Error("Input 'center' is required and should be Array.")
    }
    /* if(!Array.isArray(options.layers)) {
			throw new Error("Input 'layers' is required and should be Array.");
		} */
    if (typeof options.mapStyle !== 'string') {
      throw new Error("Input 'mapStyle' is required and should be String.")
    }
    if (typeof options.viewMode !== 'string') {
      throw new Error("Input 'viewMode' is required and should be String.")
    }
    if (options.zooms) {
      if (!Array.isArray(options.zooms) || options.zooms.length < 2) {
        throw new Error("Input 'zooms' should be Array.")
      }
    }
    options.scrollWheel = !!options.scrollWheel

    switch (gisMap.mapType) {
      case MapType.GAODE_MAP:
        var centerPoint = GPSCoverterUtils.GPSToChina(options.center[1], options.center[0])
        var aMapOptions = {
          center: new AMap.LngLat(centerPoint.lng, centerPoint.lat),
          zoom: options.zoom,
          viewMode: options.viewMode
        }
        if (options.viewMode == '3D') {
          aMapOptions.resizeEnable = true
          aMapOptions.rotateEnable = true
          aMapOptions.pitchEnable = true
          aMapOptions.pitch = options.pitch
          // aMapOptions.rotation = -15;
          // aMapOptions.buildingAnimation = true;
          aMapOptions.expandZoomRange = true
          // aMapOptions.zooms = [3,20];
        }
        if (options.mapStyle == 'dark') {
          aMapOptions.mapStyle = GaodeStyle.DARK
        } else if (options.mapStyle == 'light') {
          aMapOptions.mapStyle = GaodeStyle.LIGHT
        } else if (options.mapStyle == 'blue') {
          aMapOptions.mapStyle = GaodeStyle.BLUE
        } else if (options.mapStyle == 'darkBlue') {
          aMapOptions.mapStyle = GaodeStyle.DARKBLUE
        } else if (options.mapStyle == 'lightBlue') {
          aMapOptions.mapStyle = GaodeStyle.LIGHTBLUE
        } else if (options.mapStyle == 'lightGreen') {
          aMapOptions.mapStyle = GaodeStyle.LIGHTGREEN
        } else if (options.mapStyle == 'dianqinglan') {
          aMapOptions.mapStyle = GaodeStyle.DIANQINGLAN
        } else if (options.mapStyle == 'yueguangyin') {
          aMapOptions.mapStyle = GaodeStyle.YUEGUANGYIN
        } else if (options.mapStyle == 'yashihui') {
          aMapOptions.mapStyle = GaodeStyle.YASHIHUI
        }
        // test
        /* else {
					aMapOptions.mapStyle = "amap://styles/c7f70679a11cf44a1e46536213ffbbf7";
				} */
        // test

        if (!options.scrollWheel) {
          aMapOptions.scrollWheel = false
        }
        if (options.zooms) {
          aMapOptions.zooms = options.zooms
        }

        gisMap['originalMap'] = new AMap.Map(options.container, aMapOptions)

        /* var marker1 = new AMap.Marker({
					position: new AMap.LngLat(centerPoint.lng, centerPoint.lat),
						icon: new AMap.Icon({
							size: new AMap.Size(32, 32),
							image: "images/engineer.png",
							imageSize: new AMap.Size(32, 32),
							//imageOffset: new AMap.Pixel(16, 16)
						})
				});
				var marker2 = new AMap.Circle({center:new AMap.LngLat(centerPoint.lng, centerPoint.lat),radius:1});
				//gisMap['originalMap'].add(marker1);
				gisMap['originalMap'].add(marker2); */

        break

      case MapType.BAIDU_MAP:
        var gcj02Point = GPSCoverterUtils.GPSToChina(options.center[1], options.center[0])
        var centerPoint = GPSCoverterUtils.chinaToBaidu(gcj02Point.lat, gcj02Point.lng)
        var bMapOptions = {
          enableMapClick: false
        }
        if (options.zooms) {
          bMapOptions.minZoom = options.zooms[0]
          bMapOptions.maxZoom = options.zooms[1]
        }
        gisMap['originalMap'] = new BMap.Map(options.container, bMapOptions)
        gisMap['originalMap'].centerAndZoom(new BMap.Point(centerPoint.lng, centerPoint.lat), options.zoom)
        if (options.mapStyle == 'dark') {
          gisMap['originalMap'].setMapStyle({ style: 'dark' })
        } else if (options.mapStyle == 'light') {
          gisMap['originalMap'].setMapStyle({ style: 'light' })
        } else if (options.mapStyle == 'normal') {
          gisMap['originalMap'].setMapStyle({ style: 'normal' })
        } else if (options.mapStyle == 'blue') {
          gisMap['originalMap'].setMapStyle({ styleJson: BaiduStyle.BLUE })
        } else if (options.mapStyle == 'darkBlue') {
          gisMap['originalMap'].setMapStyle({ styleJson: BaiduStyle.DARKBLUE })
        } else if (options.mapStyle == 'lightBlue') {
          gisMap['originalMap'].setMapStyle({ styleJson: BaiduStyle.LIGHTBLUE })
        } else if (options.mapStyle == 'lightGreen') {
          gisMap['originalMap'].setMapStyle({ styleJson: BaiduStyle.LIGHTGREEN })
        } else if (options.mapStyle == 'dianqinglan') {
          gisMap['originalMap'].setMapStyle({ styleJson: BaiduStyle.DIANQINGLAN })
        } else if (options.mapStyle == 'yueguangyin') {
          gisMap['originalMap'].setMapStyle({ styleJson: BaiduStyle.YUEGUANGYIN })
        } else if (options.mapStyle == 'yashihui') {
          gisMap['originalMap'].setMapStyle({ styleJson: BaiduStyle.YASHIHUI })
        }
        // 滚轮缩放,
        if (options.scrollWheel) {
          gisMap['originalMap'].enableScrollWheelZoom()
        }

        // test
        /* var marker1 = new BMap.Marker(new BMap.Point(centerPoint.lng, centerPoint.lat));
				//var circle = new BMap.Circle(new BMap.Point(centerPoint.lng, centerPoint.lat), 1,{'fillColor':'red'});
				var marker2 = new BMap.Marker(new BMap.Point(centerPoint.lng, centerPoint.lat), {
					icon: new BMap.Icon("images/engineer.png", new BMap.Size(70, 70),{
						imageSize: new BMap.Size(70, 70)
					})
				});
				gisMap['originalMap'].addOverlay(marker1);
				//gisMap['originalMap'].addOverlay(marker2); */
        // test
        break

      case MapType.GOOGLE_MAP:
      default:
        var centerPoint = GPSCoverterUtils.GPSToChina(options.center[1], options.center[0])
        var googleMapOptions = {
          center: new google.maps.LatLng(centerPoint.lat, centerPoint.lng),
          zoom: options.zoom,
          mapTypeControl: false,
          fullscreenControl: false,
          zoomControl: false,
          streetViewControl: false
        }
        if (options.mapStyle == 'dark') {
          googleMapOptions.styles = GoogleStyle.DARK
        } else if (options.mapStyle == 'light') {
          googleMapOptions.styles = GoogleStyle.LIGHT
        } else if (options.mapStyle == 'blue') {
          googleMapOptions.styles = GoogleStyle.BLUE
        } else if (options.mapStyle == 'darkBlue') {
          googleMapOptions.styles = GoogleStyle.DARKBLUE
        } else if (options.mapStyle == 'lightBlue') {
          googleMapOptions.styles = GoogleStyle.LIGHTBLUE
        } else if (options.mapStyle == 'lightGreen') {
          googleMapOptions.styles = GoogleStyle.LIGHTGREEN
        } else if (options.mapStyle == 'dianqinglan') {
          googleMapOptions.styles = GoogleStyle.DIANQINGLAN
        } else if (options.mapStyle == 'yueguangyin') {
          googleMapOptions.styles = GoogleStyle.YUEGUANGYIN
        } else if (options.mapStyle == 'yashihui') {
          googleMapOptions.styles = GoogleStyle.YASHIHUI
        }

        if (!options.scrollWheel) {
          googleMapOptions.scrollwheel = false
        }
        if (options.zooms) {
          googleMapOptions.minZoom = options.zooms[0]
          googleMapOptions.maxZoom = options.zooms[1]
        }

        if (typeof options.container === 'string') {
          gisMap['originalMap'] = new google.maps.Map(document.getElementById(options.container), googleMapOptions)
        } else {
          gisMap['originalMap'] = new google.maps.Map(options.container, googleMapOptions)
        }

        // test
        /* var circle = new google.maps.Marker({position:new google.maps.LatLng(centerPoint.lat, centerPoint.lng)});
				//var circle = new google.maps.Circle({center:new google.maps.LatLng(centerPoint.lat, centerPoint.lng),radius:1});
				circle.setMap(gisMap['originalMap']); */
        // test
        break
    }

    // this.container = options.container;
    // this.center = options.center;

    /*
		* 地图颜色主题切换
		*/
    gisMap.setTheme = function (options) {
      if (!options) {
        throw new Error('Map inputs are required.')
      }
      if (typeof options.mapStyle !== 'string') {
        throw new Error("Input 'mapStyle' is required and should be String.")
      }

      switch (gisMap.mapType) {
        case MapType.GAODE_MAP:
          if (options.mapStyle == 'dark') {
            this['originalMap'].setMapStyle(GaodeStyle.DARK)
          } else if (options.mapStyle == 'normal') {
            this['originalMap'].setMapStyle(GaodeStyle.NORMAL)
          } else if (options.mapStyle == 'light') {
            this['originalMap'].setMapStyle(GaodeStyle.LIGHT)
          } else if (options.mapStyle == 'blue') {
            this['originalMap'].setMapStyle(GaodeStyle.BLUE)
          } else if (options.mapStyle == 'darkBlue') {
            this['originalMap'].setMapStyle(GaodeStyle.DARKBLUE)
          } else if (options.mapStyle == 'lightBlue') {
            this['originalMap'].setMapStyle(GaodeStyle.LIGHTBLUE)
          } else if (options.mapStyle == 'lightGreen') {
            this['originalMap'].setMapStyle(GaodeStyle.LIGHTGREEN)
          } else if (options.mapStyle == 'dianqinglan') {
            this['originalMap'].setMapStyle(GaodeStyle.DIANQINGLAN)
          } else if (options.mapStyle == 'yueguangyin') {
            this['originalMap'].setMapStyle(GaodeStyle.YUEGUANGYIN)
          } else if (options.mapStyle == 'yashihui') {
            this['originalMap'].setMapStyle(GaodeStyle.YASHIHUI)
          }

          break

        case MapType.BAIDU_MAP:
          if (options.mapStyle == 'dark') {
            this['originalMap'].setMapStyle({ style: 'dark' })
          } else if (options.mapStyle == 'normal') {
            this['originalMap'].setMapStyle({ style: 'normal' })
          } else if (options.mapStyle == 'light') {
            this['originalMap'].setMapStyle({ style: 'light' })
          } else if (options.mapStyle == 'blue') {
            this['originalMap'].setMapStyle({ styleJson: BaiduStyle.BLUE })
          } else if (options.mapStyle == 'darkBlue') {
            this['originalMap'].setMapStyle({ styleJson: BaiduStyle.DARKBLUE })
          } else if (options.mapStyle == 'lightBlue') {
            this['originalMap'].setMapStyle({ styleJson: BaiduStyle.LIGHTBLUE })
          } else if (options.mapStyle == 'lightGreen') {
            this['originalMap'].setMapStyle({ styleJson: BaiduStyle.LIGHTGREEN })
          } else if (options.mapStyle == 'dianqinglan') {
            this['originalMap'].setMapStyle({ styleJson: BaiduStyle.DIANQINGLAN })
          } else if (options.mapStyle == 'yueguangyin') {
            this['originalMap'].setMapStyle({ styleJson: BaiduStyle.YUEGUANGYIN })
          } else if (options.mapStyle == 'yashihui') {
            this['originalMap'].setMapStyle({ styleJson: BaiduStyle.YASHIHUI })
          }

          break

        case MapType.GOOGLE_MAP:
        default:
          if (options.mapStyle == 'dark') {
            this['originalMap'].setOptions({ styles: GoogleStyle.DARK })
          } else if (options.mapStyle == 'normal') {
            this['originalMap'].setOptions({ styles: null })
          } else if (options.mapStyle == 'light') {
            this['originalMap'].setOptions({ styles: GoogleStyle.LIGHT })
          } else if (options.mapStyle == 'blue') {
            this['originalMap'].setOptions({ styles: GoogleStyle.BLUE })
          } else if (options.mapStyle == 'darkBlue') {
            this['originalMap'].setOptions({ styles: GoogleStyle.DARKBLUE })
          } else if (options.mapStyle == 'lightBlue') {
            this['originalMap'].setOptions({ styles: GoogleStyle.LIGHTBLUE })
          } else if (options.mapStyle == 'lightGreen') {
            this['originalMap'].setOptions({ styles: GoogleStyle.LIGHTGREEN })
          } else if (options.mapStyle == 'dianqinglan') {
            this['originalMap'].setOptions({ styles: GoogleStyle.DIANQINGLAN })
          } else if (options.mapStyle == 'yueguangyin') {
            this['originalMap'].setOptions({ styles: GoogleStyle.YUEGUANGYIN })
          } else if (options.mapStyle == 'yashihui') {
            this['originalMap'].setOptions({ styles: GoogleStyle.YASHIHUI })
          }
          break
      }
    }

    /*
		* 自定义地图样式
		*/
    gisMap.setMapStyle = function (options) {
      if (!options) {
        throw new Error('Map inputs are required.')
      }

      switch (gisMap.mapType) {
        case MapType.GAODE_MAP:
          if (options.GaodeStyle) {
            this['originalMap'].setMapStyle(options.GaodeStyle)
          }
          break

        case MapType.BAIDU_MAP:
          if (options.BaiduStyle) {
            this['originalMap'].setMapStyle({ styleJson: options.BaiduStyle })
          }
          break

        case MapType.GOOGLE_MAP:
        default:
          if (options.GoogleStyle) {
            this['originalMap'].setOptions({ styles: options.GoogleStyle })
          }
          break
      }
    }

    /*
		* 设置缩放级别
		*/
    gisMap.setZoom = function (zoom) {
      /* if(!options) {
				throw new Error("Map inputs are required.");
			}
			if(typeof options.zoom != 'number' || options.zoom < 1 || options.zoom > 19) {
				throw new Error("Input 'zoom' is required and should between 1 to 19.");
			}
			if(!Array.isArray(options.center) || options.center.length < 2) {
				throw new Error("Input 'center' is required and should be Array.");
			} */
      if (typeof zoom !== 'number' || zoom < 1 || zoom > 19) {
        throw new Error("Input 'zoom' is required and should between 1 to 19.")
      }

      switch (gisMap.mapType) {
        case MapType.GAODE_MAP:
          // var centerPoint = GPSCoverterUtils.GPSToChina(options.center[1], options.center[0]);
          // this['originalMap'].setZoomAndCenter(options.zoom, new AMap.LngLat(centerPoint.lng, centerPoint.lat));
          this['originalMap'].setZoom(zoom)
          // test
          // var circle = new AMap.Circle({center:new AMap.LngLat(centerPoint.lng, centerPoint.lat),radius:1});
          // this['originalMap'].add(circle);
          // test
          break

        case MapType.BAIDU_MAP:
          // var gcj02Point = GPSCoverterUtils.GPSToChina(options.center[1], options.center[0]);
          // var centerPoint = GPSCoverterUtils.chinaToBaidu(gcj02Point.lat, gcj02Point.lng);
          // this['originalMap'].centerAndZoom(new BMap.Point(centerPoint.lng, centerPoint.lat), options.zoom);
          this['originalMap'].setZoom(zoom)
          // test
          // var circle = new BMap.Circle(new BMap.Point(centerPoint.lng, centerPoint.lat), 1,{'fillColor':'red'});
          // this['originalMap'].addOverlay(circle);
          // test
          break

        case MapType.GOOGLE_MAP:
        default:
          // var centerPoint = GPSCoverterUtils.GPSToChina(options.center[1], options.center[0]);
          // this['originalMap'].setCenter(new google.maps.LatLng(centerPoint.lat, centerPoint.lng));
          this['originalMap'].setZoom(zoom)
          // test
          // var circle = new google.maps.Circle({center:new google.maps.LatLng(centerPoint.lat, centerPoint.lng),radius:1});
          // circle.setMap(this['originalMap']);
          break
      }

      // this.center = options.center;
    }

    /*
		* 获取缩放级别
		*/
    gisMap.getZoom = function () {
      return this['originalMap'].getZoom()
    }

    /*
		* 注册地图缩放事件
		*/
    gisMap.onZoom = function (eventName, callback) {
      this.on(eventName, callback)
    }

    /*
		* 注销地图缩放事件
		*/
    gisMap.removeZoomEvent = function () {
      Object.keys(this).forEach((key) => {
        var handlerNameArray = key.split('_')
        if (handlerNameArray.length == 3 && handlerNameArray[0] == 'convert') {
          if (handlerNameArray[1] == 'zoomstart' || handlerNameArray[1] == 'zoomchanged' || handlerNameArray[1] == 'zoomend') {
            // this.off(handlerNameArray[1], handlerNameArray[2]);
            switch (gisMap.mapType) {
              case MapType.GAODE_MAP:
                this['originalMap'].off(convertEvent2AMapType(handlerNameArray[1]), this['convert_' + handlerNameArray[1] + '_' + handlerNameArray[2]])
                break

              case MapType.BAIDU_MAP:
                this['originalMap'].removeEventListener(convertEvent2BMapType(handlerNameArray[1]), this['convert_' + handlerNameArray[1] + '_' + handlerNameArray[2]])
                break
              case MapType.GOOGLE_MAP:
              default:
                google.maps.event.clearListeners(this['originalMap'], convertEvent2GoogleMapType(handlerNameArray[1]))
                // handler();传handler进来是为了解除绑定，不是为了调起
                break
            }
          }
        }
      })
    }

    /*
		* 放大
		*/
    gisMap.zoomIn = function () {
      switch (gisMap.mapType) {
        case MapType.GAODE_MAP:
        case MapType.BAIDU_MAP:
          this['originalMap'].zoomIn()
          break

        case MapType.GOOGLE_MAP:
        default:
          var zoom = this['originalMap'].getZoom() + 1
          this['originalMap'].setZoom(zoom)
          break
      }
    }

    /*
		* 缩小
		*/
    gisMap.zoomOut = function () {
      switch (gisMap.mapType) {
        case MapType.GAODE_MAP:
        case MapType.BAIDU_MAP:
          this['originalMap'].zoomOut()
          break

        case MapType.GOOGLE_MAP:
        default:
          var zoom = this['originalMap'].getZoom() - 1
          this['originalMap'].setZoom(zoom)
          break
      }
    }

    /*
		* 销毁地图对象、清空地图容器
		*/
    gisMap.destroy = function () {
      switch (gisMap.mapType) {
        case MapType.GAODE_MAP:
          this['originalMap'].destroy()
          delete this['originalMap']
          break

        case MapType.GOOGLE_MAP:
        case MapType.BAIDU_MAP:
        default:
          document.getElementById(this['container']).innerHTML = null
          delete this['originalMap']
          break
      }
    }

    gisMap.markerList = []

    /*
		* 添加单个图标
		*/
    gisMap.addOneMarker = function (options) {
      // 图标
      var marker = {
        overlayType: 'Marker'
      }

      if (!options) {
        throw new Error('Map inputs are required.')
      }
      if (!Array.isArray(options.position) || options.position.length < 2) {
        throw new Error("Input 'position' is required and should be Array.")
      }
      if (options.image) {
        if (typeof options.image !== 'string') {
          throw new Error("Input 'image' should be string.")
        } else {
          if (typeof options.width !== 'number') {
            options.width = DEFAULT_MARKER_WIDTH
          }
          if (typeof options.height !== 'number') {
            options.height = DEFAULT_MARKER_HEIGHT
          }
        }
      }
      if (options.title) {
        if (typeof options.title !== 'string') {
          throw new Error("Input 'title' should be string.")
        }
      }

      if (options.label) {
        if (typeof options.label.text !== 'string') {
          throw new Error("Input 'label.text' should be string.")
        }
        if (options.label.offset) {
          if (!Array.isArray(options.label.offset) || options.label.offset.length < 2) {
            throw new Error("Input 'label.offset' is required and should be Array.")
          }
        }
      }

      switch (gisMap.mapType) {
        case MapType.GAODE_MAP:
          var gcj02Point = GPSCoverterUtils.GPSToChina(options.position[1], options.position[0])
          var aMarkerOptions = {
            position: new AMap.LngLat(gcj02Point.lng, gcj02Point.lat)
          }
          if (typeof options.image === 'string') {
            aMarkerOptions.icon = new AMap.Icon({
              image: options.image,
              imageSize: new AMap.Size(options.width, options.height),
              size: new AMap.Size(options.width, options.height)
            })
            aMarkerOptions.offset = new AMap.Pixel(-options.width / 2, -options.height / 2)
          }
          if (typeof options.title === 'string') {
            aMarkerOptions.title = options.title
          }
          if (options.label) {
            aMarkerOptions.label = {
              content: "<div class='gismap-label'>" + options.label.text + '</div>'
            }
            if (options.label.offset) {
              aMarkerOptions.label.offset = new AMap.Pixel(options.label.offset[0], options.label.offset[1])
            }
          }
          marker['originalMarker'] = new AMap.Marker(aMarkerOptions)
          marker.id = 'marker_' + randomNum(16)
          this.markerList.push(marker)
          this['originalMap'].add(marker['originalMarker'])
          break

        case MapType.BAIDU_MAP:
          var gcj02Point = GPSCoverterUtils.GPSToChina(options.position[1], options.position[0])
          var bdPoint = GPSCoverterUtils.chinaToBaidu(gcj02Point.lat, gcj02Point.lng)
          var mPoint = new BMap.Point(bdPoint.lng, bdPoint.lat)
          var bMarkerOptions = {}
          if (typeof options.image === 'string') {
            bMarkerOptions.icon = new BMap.Icon(options.image, new BMap.Size(options.width, options.height), {
              imageSize: new BMap.Size(options.width, options.height)
            })
          }
          if (typeof options.title === 'string') {
            bMarkerOptions.title = options.title
          }
          marker['originalMarker'] = new BMap.Marker(mPoint, bMarkerOptions)
          if (options.label) {
            var labelOptions = {}
            if (options.label.offset) {
              labelOptions.offset = new BMap.Size(options.label.offset[0], options.label.offset[1])
            }
            var label = new BMap.Label("<div class='gismap-label'>" + options.label.text + '</div>', labelOptions)
            label.setStyle({
              backgroundColor: 'rgba(32,42,53,.8)',
              color: 'white',
              border: 'none',
              padding: '2px 5px',
              borderRadius: '2px'
            })
            marker['originalMarker'].setLabel(label)
          }
          marker.id = 'marker_' + randomNum(16)
          this.markerList.push(marker)
          this['originalMap'].addOverlay(marker['originalMarker'])
          break

        case MapType.GOOGLE_MAP:
        default:
          var gcj02Point = GPSCoverterUtils.GPSToChina(options.position[1], options.position[0])
          var gMarkerOptions = {
            position: new google.maps.LatLng(gcj02Point.lat, gcj02Point.lng)
          }
          if (typeof options.image === 'string') {
            gMarkerOptions.icon = {
              size: new google.maps.Size(options.width, options.height),
              url: options.image,
              scaledSize: new google.maps.Size(options.width, options.height),
              anchor: new google.maps.Point(options.width / 2, options.height / 2)
            }
          }
          if (typeof options.title === 'string') {
            gMarkerOptions.title = options.title
          }
          if (options.label) {
            gMarkerOptions.label = {
              text: options.label.text
            }
          }
          marker['originalMarker'] = new google.maps.Marker(gMarkerOptions)
          marker.id = 'marker_' + randomNum(16)
          this.markerList.push(marker)
          marker['originalMarker'].setMap(this['originalMap'])
          break
      }

      /*
			* 给marker绑定事件
			*/
      marker.on = function (eventName, handler) {
        if (!eventName || typeof eventName !== 'string') {
          throw new Error("Input 'eventName' is required and should be string.")
        }
        if (typeof handler !== 'function') {
          throw new Error("Input 'handler' is required and should be function.")
        }

        this['convert_' + eventName + '_' + handler.name] = function (e) {
          switch (gisMap.mapType) {
            case MapType.GAODE_MAP:
              // console.log("转换前", e);
              var outputLnglat = []
              if (e && e.lnglat) {
                var gpsPoint = GPSCoverterUtils.chinaToGPSExact(e.lnglat.getLat(), e.lnglat.getLng())
                outputLnglat = [gpsPoint.lng, gpsPoint.lat]
              }
              var outputPixel = []
              if (e && e.pixel) {
                outputPixel = [e.pixel.getX(), e.pixel.getY()]
              }
              handler({
                lngLat: outputLnglat,
                pixel: outputPixel,
                type: eventName,
                target: this
              })
              break

            case MapType.BAIDU_MAP:
              // console.log("转换前", e);
              var outputLnglat = []
              if (e && e.point) {
                var gcj02 = GPSCoverterUtils.baiduToChina(e.point.lat, e.point.lng)
                var gpsPoint = GPSCoverterUtils.chinaToGPSExact(gcj02.lat, gcj02.lng)
                outputLnglat = [gpsPoint.lng, gpsPoint.lat]
              }
              var outputPixel = []
              if (e && e.pixel) {
                outputPixel = [e.pixel.x, e.pixel.y]
              }
              handler({
                lngLat: outputLnglat,
                pixel: outputPixel,
                type: eventName,
                target: this
              })
              break

            case MapType.GOOGLE_MAP:
            default:
              // console.log("转换前", e);
              var outputLnglat = []
              if (e && e.latLng) {
                var gpsPoint = GPSCoverterUtils.chinaToGPSExact(e.latLng.lat(), e.latLng.lng())
                outputLnglat = [gpsPoint.lng, gpsPoint.lat]
              }
              var outputPixel = []
              if (e && e.pixel) {
                outputPixel = [e.pixel.x, e.pixel.y]
              }
              handler({
                lngLat: outputLnglat,
                pixel: outputPixel,
                type: eventName,
                target: this
              })
              break
          }
        }

        switch (gisMap.mapType) {
          case MapType.GAODE_MAP:
            this['originalMarker'].on(convertEvent2AMapType(eventName), this['convert_' + eventName + '_' + handler.name])
            break

          case MapType.BAIDU_MAP:
            this['originalMarker'].addEventListener(convertEvent2BMapType(eventName), this['convert_' + eventName + '_' + handler.name])
            break
          case MapType.GOOGLE_MAP:
          default:
            this['originalMarker'].addListener(convertEvent2GoogleMapType(eventName), this['convert_' + eventName + '_' + handler.name])
            break
        }
      }

      /*
			* 给marker解除事件绑定
			*/
      marker.off = function (eventName, handler) {
        if (!eventName || typeof eventName !== 'string') {
          throw new Error("Input 'eventName' is required and should be string.")
        }
        if (typeof handler !== 'function') {
          throw new Error("Input 'handler' is required and should be function.")
        }

        switch (gisMap.mapType) {
          case MapType.GAODE_MAP:
            this['originalMarker'].off(convertEvent2AMapType(eventName), this['convert_' + eventName + '_' + handler.name])
            break

          case MapType.BAIDU_MAP:
            this['originalMarker'].removeEventListener(convertEvent2BMapType(eventName), this['convert_' + eventName + '_' + handler.name])
            break
          case MapType.GOOGLE_MAP:
          default:
            google.maps.event.clearListeners(this['originalMarker'], convertEvent2GoogleMapType(eventName))
            // handler();传handler进来是为了解除绑定，不是为了调起
            break
        }
      }

      return marker
    }

    gisMap.flashMarkerList = []

    /*
		* 添加单个闪烁图标
		*/
    gisMap.addOneFlashMarker = function (options) {
      var _this = this
      // 图标
      var marker = {
        overlayType: 'FlashMarker'
      }

      if (!options) {
        throw new Error('Map inputs are required.')
      }
      if (!Array.isArray(options.position) || options.position.length < 2) {
        throw new Error("Input 'position' is required and should be Array.")
      }
      if (options.color) {
        if (typeof options.color !== 'string') {
          throw new Error("Input 'color' should be string.")
        }
      } else {
        options.color = DEFAULT_MARKER_COLOR
      }

      switch (gisMap.mapType) {
        case MapType.GAODE_MAP:
				    // 高德地图经纬度
          var gcj02Point = GPSCoverterUtils.GPSToChina(options.position[1], options.position[0])
          // 初始化canvas
          marker.id = 'flashMarker_' + randomNum(16)
          var canvas = document.createElement('canvas')
          canvas.id = marker.id
          var RADIUS = 100
          canvas.width = canvas.height = 2 * RADIUS

          var context = canvas.getContext('2d')
          context.fillStyle = options.color// 填充颜色
          context.strokeStyle = 'white'// 边框颜色
          context.globalAlpha = 1// 1不透明 0透明
          context.lineWidth = 2 // 边框宽度
          var radious = 0
          var interval = null

          var customLayer = new AMap.CustomLayer(canvas, {
            alwaysRender: true,
            zIndex: 120// 暂时这么设置
          })

          var onRender = function () {
            clearInterval(interval)
            // 绘制点的像素坐标
            var pos = _this['originalMap'].lngLatToContainer(new AMap.LngLat(gcj02Point.lng, gcj02Point.lat))

            interval = setInterval(function () {
              if (document.getElementById(marker.id)) {
                console.log('amap visible')
                radious = (radious + 1) % RADIUS
                canvas.style.top = pos.y - RADIUS + 'px'
                canvas.style.left = pos.x - RADIUS + 'px'
                context.clearRect(0, 0, 2 * RADIUS, 2 * RADIUS)
                context.globalAlpha = (context.globalAlpha - 0.01 + 1) % 1

                context.beginPath()
                context.arc(RADIUS, RADIUS, radious, 0, 2 * Math.PI)
                context.fill()
                context.stroke()
              } else {
                console.log('amap invisible')
                clearInterval(interval)
              }
            }, 15)

            // AMap.Util.requestAnimFrame(onRender);
          }
          customLayer.render = onRender
			        customLayer.setMap(this['originalMap'])

          marker['originalFlashMarker'] = customLayer
          // marker.id = 'flashMarker_'+ randomNum(16);
          this.flashMarkerList.push(marker)
          break

        case MapType.BAIDU_MAP:
          var gcj02Point = GPSCoverterUtils.GPSToChina(options.position[1], options.position[0])
          var bdPoint = GPSCoverterUtils.chinaToBaidu(gcj02Point.lat, gcj02Point.lng)
          var mPoint = new BMap.Point(bdPoint.lng, bdPoint.lat)

          function CustomLayer () {

          }

          CustomLayer.prototype = new BMap.Overlay()

          marker.id = 'flashMarker_' + randomNum(16)
          var canvas = document.createElement('canvas')
          canvas.id = marker.id
          var RADIUS = 100
          canvas.width = canvas.height = 2 * RADIUS

          var context = canvas.getContext('2d')
          context.fillStyle = options.color// 填充颜色
          context.strokeStyle = 'white'// 边框颜色
          context.globalAlpha = 1// 1不透明 0透明
          context.lineWidth = 2 // 边框宽度
          var radious = 0
          var interval = null

          CustomLayer.prototype.initialize = function (map) {
            this._map = map
            // canvas.onclick = function(){}
            this._map.getPanes().labelPane.appendChild(canvas)
            return canvas
          }
          CustomLayer.prototype.draw = function () {
            clearInterval(interval)

            // 绘制点的像素坐标
            var pos = this._map.pointToOverlayPixel(mPoint)

            interval = setInterval(function () {
              if (marker['originalFlashMarker'].isVisible()) {
                console.log('bmap visible')
                radious = (radious + 1) % RADIUS
                // 绘制点的像素坐标
                canvas.style.marginTop = pos.y - RADIUS + 'px'
                canvas.style.marginLeft = pos.x - RADIUS + 'px'

                context.clearRect(0, 0, 2 * RADIUS, 2 * RADIUS)
                context.globalAlpha = (context.globalAlpha - 0.01 + 1) % 1

                context.beginPath()
                context.arc(RADIUS, RADIUS, radious, 0, 2 * Math.PI)
                context.fill()
                context.stroke()
              } else {
                console.log('bmap invisible')
                clearInterval(interval)
              }
					    }, 15)

            // window.requestAnimationFrame(this.draw);
          }

          marker['originalFlashMarker'] = new CustomLayer()
          this['originalMap'].addOverlay(marker['originalFlashMarker'])
          // marker.id = 'flashMarker_'+ randomNum(16);
          this.flashMarkerList.push(marker)
          break

        case MapType.GOOGLE_MAP:
        default:
          var gcj02Point = GPSCoverterUtils.GPSToChina(options.position[1], options.position[0])
          var ggPoint = new google.maps.LatLng(gcj02Point.lat, gcj02Point.lng)

          marker.id = 'flashMarker_' + randomNum(16)
          var canvas = document.createElement('canvas')
          canvas.id = marker.id
          var RADIUS = 100
          canvas.width = canvas.height = 2 * RADIUS

          var context = canvas.getContext('2d')
          context.fillStyle = options.color// 填充颜色
          context.strokeStyle = 'white'// 边框颜色
          context.globalAlpha = 1// 1不透明 0透明
          context.lineWidth = 2 // 边框宽度
          var radious = 0
          var interval = null

          USGSOverlay.prototype = new google.maps.OverlayView()

          function USGSOverlay (map) {
            this.map_ = map
            this.setMap(map)
          }

          USGSOverlay.prototype.onAdd = function () {
            var panes = this.getPanes()
            panes.overlayLayer.appendChild(canvas)
          }

          USGSOverlay.prototype.draw = function () {
            clearInterval(interval)

            var overlayProjection = this.getProjection()
            var pos = overlayProjection.fromLatLngToDivPixel(ggPoint)

            interval = setInterval(function () {
						    console.log('google visible')
              radious = (radious + 1) % RADIUS
              // 绘制点的像素坐标
              canvas.style.top = pos.y - RADIUS + 'px'
              canvas.style.left = pos.x - RADIUS + 'px'
              canvas.style.position = 'absolute'

              context.clearRect(0, 0, 2 * RADIUS, 2 * RADIUS)
              context.globalAlpha = (context.globalAlpha - 0.01 + 1) % 1

              context.beginPath()
              context.arc(RADIUS, RADIUS, radious, 0, 2 * Math.PI)
              context.fill()
              context.stroke()
					    }, 15)

            // window.requestAnimationFrame(this.draw);
          }

          USGSOverlay.prototype.onRemove = function () {
            canvas.parentNode.removeChild(canvas)
            canvas = null
            clearInterval(interval)
          }

          marker['originalFlashMarker'] = new USGSOverlay(this['originalMap'])
          // marker.id = 'flashMarker_'+ randomNum(16);
          this.flashMarkerList.push(marker)

          break
      }

      /*
			* 给marker绑定事件
			*/
      /* marker.on = function(eventName, handler) {
				if(!eventName || typeof eventName != 'string') {
					throw new Error("Input 'eventName' is required and should be string.");
				}
				if(typeof handler != 'function') {
					throw new Error("Input 'handler' is required and should be function.");
				}

				this['convert_'+eventName+'_'+handler.name] = function(e) {
					switch (gisMap.mapType) {
						case MapType.GAODE_MAP:
							//console.log("转换前", e);
							var outputLnglat = [];
							if(e && e.lnglat) {
								var gpsPoint = GPSCoverterUtils.chinaToGPSExact(e.lnglat.getLat(), e.lnglat.getLng());
								outputLnglat = [gpsPoint.lng, gpsPoint.lat];
							}
							var outputPixel = [];
							if(e && e.pixel) {
								outputPixel = [e.pixel.getX(), e.pixel.getY()];
							}
							handler({
								lngLat: outputLnglat,
								pixel: outputPixel,
								type: eventName,
								target: this
							});
							break;

						case MapType.BAIDU_MAP:
							//console.log("转换前", e);
							var outputLnglat = [];
							if(e && e.point) {
								var gcj02 = GPSCoverterUtils.baiduToChina(e.point.lat, e.point.lng);
								var gpsPoint = GPSCoverterUtils.chinaToGPSExact(gcj02.lat, gcj02.lng);
								outputLnglat = [gpsPoint.lng, gpsPoint.lat];
							}
							var outputPixel = [];
							if(e && e.pixel) {
								outputPixel = [e.pixel.x, e.pixel.y];
							}
							handler({
								lngLat: outputLnglat,
								pixel: outputPixel,
								type: eventName,
								target: this
							});
							break;

						case MapType.GOOGLE_MAP:
						default:
							//console.log("转换前", e);
							var outputLnglat = [];
							if(e && e.latLng) {
								var gpsPoint = GPSCoverterUtils.chinaToGPSExact(e.latLng.lat(), e.latLng.lng());
								outputLnglat = [gpsPoint.lng, gpsPoint.lat];
							}
							var outputPixel = [];
							if(e && e.pixel) {
								outputPixel = [e.pixel.x, e.pixel.y];
							}
							handler({
								lngLat: outputLnglat,
								pixel: outputPixel,
								type: eventName,
								target: this
							});
							break;
					}
				};
				//todo todo todo
				switch (gisMap.mapType) {
					case MapType.GAODE_MAP:
						document.getElementById(this.id).addEventListener(convertEvent2AMapType(eventName), this['convert_'+eventName+'_'+handler.name]);
						//AMap.event.addDomListener(this['originalFlashMarker'],convertEvent2AMapType(eventName), this['convert_'+eventName+'_'+handler.name]);
						break;

					case MapType.BAIDU_MAP:
						//this['originalFlashMarker'].addEventListener(convertEvent2BMapType(eventName), this['convert_'+eventName+'_'+handler.name]);
						break;
					case MapType.GOOGLE_MAP:
					default:
						//this['originalFlashMarker'].addEventListener(convertEvent2GoogleMapType(eventName), this['convert_'+eventName+'_'+handler.name]);
						//document.getElementById(this.id).addEventListener(convertEvent2GoogleMapType(eventName), this['convert_'+eventName+'_'+handler.name]);
						break;
				}

			}; */

      /*
			* 给marker解除事件绑定
			*/
      /* marker.off = function(eventName, handler) {
				if(!eventName || typeof eventName != 'string') {
					throw new Error("Input 'eventName' is required and should be string.");
				}
				if(typeof handler != 'function') {
					throw new Error("Input 'handler' is required and should be function.");
				}

				switch (gisMap.mapType) {
					case MapType.GAODE_MAP:
						this['originalMarker'].off(convertEvent2AMapType(eventName), this['convert_'+eventName+'_'+handler.name]);
						break;

					case MapType.BAIDU_MAP:
						this['originalMarker'].removeEventListener(convertEvent2BMapType(eventName), this['convert_'+eventName+'_'+handler.name]);
						break;
					case MapType.GOOGLE_MAP:
					default:
						google.maps.event.clearListeners(this['originalMarker'], convertEvent2GoogleMapType(eventName));
						//handler();传handler进来是为了解除绑定，不是为了调起
						break;
				}

			}; */

      return marker
    }

    /*
		* 添加一到多个普通图标
		*/
    gisMap.addMarker = function (options) {
      if (!options) {
        throw new Error('Map inputs are required.')
      }
      if (!Array.isArray(options.markers) || options.markers.length < 1) {
        throw new Error("Input 'markers' is required and should be Array.")
      }

      var _this = this
      var markerList = []
      options.markers.forEach(function (item) {
        if (item.tag && item.tag.label) {
          item.label = item.tag.label
        }
        markerList.push(_this.addOneMarker(item))
      })

      return markerList
    }

    gisMap.infoWindowList = []

    /*
		* 添加信息窗口
		*/
    gisMap.addPopup = function (options) {
      // 信息窗口
      var infoWindow = {}

      if (!options) {
        throw new Error('Map inputs are required.')
      }
      if (!Array.isArray(options.position) || options.position.length < 2) {
        throw new Error("Input 'position' is required and should be Array.")
      } else {
        infoWindow.position = options.position
      }
      /* if(typeof options.content != 'string') {
				throw new Error("Input 'content' is required and should be HTMLElement in string.");
			} */
      if (!options.content) {
        throw new Error("Input 'content' is required.")
      }
      if (!Array.isArray(options.offset) || options.offset.length < 2) {
        throw new Error("Input 'offset' is required and should be Array.")
      }
      if (typeof options.width !== 'number') {
        throw new Error("Input 'width' is required and should number.")
      }
      // 传0表示auto自适应
      if (typeof options.height !== 'number') {
        throw new Error("Input 'height' is required and should number.")
      }

      options.enableAutoPan = !!options.enableAutoPan

      switch (gisMap.mapType) {
        case MapType.GAODE_MAP:
          var openPoint = GPSCoverterUtils.GPSToChina(options.position[1], options.position[0])

          if (options.boxTheme == 'dark') {
            infoWindow.isCustom = true
            function createInfoWindow (content, width, height) {
              var info = document.createElement('div')
              info.className = 'custom-infowin-box'
              info.style.width = width + 'px'
              info.style.height = height == 0 ? 'auto' : height + 'px'

              var top = document.createElement('div')
              top.className = 'custom-infowin-top'
              info.appendChild(top)

              var close = document.createElement('span')
              close.className = 'custom-infowin-close'
              top.appendChild(close)
              close.onclick = function () {
                infoWindow['originalInfoWindow'].close()
              }

              var middle = document.createElement('div')
              middle.className = 'custom-infowin-middle'
              middle.innerHTML = content
              info.appendChild(middle)

              return info
            }

            infoWindow['originalInfoWindow'] = new AMap.InfoWindow({
              isCustom: true, // 使用自定义窗体
              content: createInfoWindow(options.content, options.width, options.height),
              position: new AMap.LngLat(openPoint.lng, openPoint.lat),
              offset: new AMap.Pixel(options.offset[0], options.offset[1] - 28),
              autoMove: options.enableAutoPan
            })
          } else {
            var aInfoWindowOptions = {
              autoMove: options.enableAutoPan,
              content: options.content,
              position: new AMap.LngLat(openPoint.lng, openPoint.lat),
              offset: new AMap.Pixel(options.offset[0], options.offset[1]),
              size: new AMap.Size(options.width, options.height)
            }
            infoWindow['originalInfoWindow'] = new AMap.InfoWindow(aInfoWindowOptions)
          }
          break

        case MapType.BAIDU_MAP:
          if (options.boxTheme == 'dark') {
            infoWindow.isCustom = true
            infoWindow['originalInfoWindow'] = new BMapLib.InfoBox(this['originalMap'], options.content, {
              boxStyle: {
                background: 'rgba(32,42,53,.9)',
                width: options.width + 'px',
							    height: options.height == 0 ? 'auto' : options.height + 'px'
              },
              offset: new BMap.Size(options.offset[0], -options.offset[1] + 28),
              // closeIconUrl: "img/close.png",
              closeIconMargin: '0 10px 0 0',
              enableAutoPan: options.enableAutoPan,
              align: INFOBOX_AT_TOP
            })
          } else {
            var bInfoWindowOptions = {
              enableAutoPan: options.enableAutoPan,
              enableCloseOnClick: false,
              width: options.width,
              height: options.height,
              offset: new BMap.Size(options.offset[0], options.offset[1])
            }
            infoWindow['originalInfoWindow'] = new BMap.InfoWindow(options.content, bInfoWindowOptions)
          }
          break
        case MapType.GOOGLE_MAP:
        default:
				    var openPoint = GPSCoverterUtils.GPSToChina(options.position[1], options.position[0])

				    if (options.boxTheme == 'dark') {
            infoWindow.isCustom = true

            function Popup (openPoint, content, width, height, offset) {
              this.position = new google.maps.LatLng(openPoint.lat, openPoint.lng)
              this.width = width
              this.offset = offset
              this.containerDiv = document.createElement('div')
              this.containerDiv.className = 'google-infowin-box'
              this.containerDiv.style.width = width + 'px'
              this.containerDiv.style.height = height == 0 ? 'auto' : height + 'px'

              var top = document.createElement('div')
              top.className = 'google-infowin-top'
              this.containerDiv.appendChild(top)

              var close = document.createElement('span')
              close.className = 'google-infowin-close'
              top.appendChild(close)
						    close.onclick = function () {
                infoWindow['originalInfoWindow'].setMap(null)
              }

              var middle = document.createElement('div')
              middle.className = 'google-infowin-middle'
              middle.innerHTML = content
              this.containerDiv.appendChild(middle)

              var after = document.createElement('div')
              after.className = 'google-infowin-after'
              this.containerDiv.appendChild(after)
              after.style.left = width / 2 + 'px'

              google.maps.OverlayView.preventMapHitsAndGesturesFrom(this.containerDiv)
						  }

						  Popup.prototype = Object.create(google.maps.OverlayView.prototype)

						  /** Called when the popup is added to the map. */
						  Popup.prototype.onAdd = function () {
              this.getPanes().floatPane.appendChild(this.containerDiv)
						  }

						  /** Called when the popup is removed from the map. */
						  Popup.prototype.onRemove = function () {
              if (this.containerDiv.parentElement) {
							  this.containerDiv.parentElement.removeChild(this.containerDiv)
              }
						  }

						  /** Called each frame when the popup needs to draw itself. */
						  Popup.prototype.draw = function () {
              var divPosition = this.getProjection().fromLatLngToDivPixel(this.position)
              var offsetX = this.width / 2 - this.offset[0]
              var offsetY = document.getElementsByClassName('google-infowin-box')[0].offsetHeight + 28 - this.offset[1]
              this.containerDiv.style.left = divPosition.x - offsetX + 'px'
              this.containerDiv.style.top = divPosition.y - offsetY + 'px'
						  }

            infoWindow['originalInfoWindow'] = new Popup(openPoint, options.content, options.width, options.height, options.offset)
          } else {
            var gInfoWindowOptions = {
              disableAutoPan: !options.enableAutoPan,
              content: options.content,
              position: new google.maps.LatLng(openPoint.lat, openPoint.lng),
              pixelOffset: new google.maps.Size(options.offset[0], options.offset[1]),
              maxWidth: options.width
            }
            infoWindow['originalInfoWindow'] = new google.maps.InfoWindow(gInfoWindowOptions)
          }
          break
      }

      /*
			* 打开信息窗口
			*/
      infoWindow.openPopup = function (map) {
        switch (gisMap.mapType) {
          case MapType.BAIDU_MAP:
            var gcj02Point = GPSCoverterUtils.GPSToChina(this.position[1], this.position[0])
            var openPoint = GPSCoverterUtils.chinaToBaidu(gcj02Point.lat, gcj02Point.lng)
            var bPoint = new BMap.Point(openPoint.lng, openPoint.lat)
            if (this.isCustom) {
              this['originalInfoWindow'].open(bPoint)
            } else {
              map['originalMap'].openInfoWindow(this['originalInfoWindow'], bPoint)
            }

            break

          case MapType.GAODE_MAP:
            this['originalInfoWindow'].open(map['originalMap'])
            break

          case MapType.GOOGLE_MAP:
          default:
            if (this.isCustom) {
              this['originalInfoWindow'].setMap(map['originalMap'])
            } else {
              this['originalInfoWindow'].open(map['originalMap'])
            }
            break
        }
      }

      /*
			* 关闭信息窗口
			*/
      infoWindow.closePopup = function () {
        if (gisMap.mapType == MapType.GOOGLE_MAP && this.isCustom) {
          this['originalInfoWindow'].setMap(null)
        } else {
          this['originalInfoWindow'].close()
        }
      }

		    this.infoWindowList.push(infoWindow)
      return infoWindow
    }

    /*
		* 注册所有图标鼠标事件
		*/
    /* gisMap.onMarker = function(eventName, handler) {
			switch (gisMap.mapType) {
				case MapType.BAIDU_MAP:

					break;

				case MapType.GAODE_MAP:

					break;
				case MapType.GOOGLE_MAP:
				default:

					break;
			}
		}; */

    /*
		* 注销所有图标鼠标事件
		*/
    /* gisMap.removeMarkerEvent = function() {
			switch (gisMap.mapType) {
				case MapType.BAIDU_MAP:

					break;

				case MapType.GAODE_MAP:

					break;
				case MapType.GOOGLE_MAP:
				default:

					break;
			}
		}; */

    gisMap.circleList = []
    /*
		* 添加圆
		*/
    gisMap.addCircle = function (options) {
      // 圆
      var circle = {
        overlayType: 'Circle'
      }

      if (!options) {
        throw new Error('Map inputs are required.')
      }
      if (!Array.isArray(options.position) || options.position.length < 2) {
        throw new Error("Input 'position' is required and should be Array.")
      }
      if (typeof options.radius !== 'number') {
        throw new Error("Input 'radius' is required and should be number.")
      }
      if (options.fillColor) {
        if (typeof options.fillColor !== 'string') {
          throw new Error("Input 'fillColor' should be string.")
        }
      }
      if (options.fillOpacity) {
        if (typeof options.fillOpacity !== 'number') {
          throw new Error("Input 'fillOpacity' should be number.")
        }
      }
      if (options.strokeColor) {
        if (typeof options.strokeColor !== 'string') {
          throw new Error("Input 'strokeColor' should be string.")
        }
      }
      if (options.strokeOpacity) {
        if (typeof options.strokeOpacity !== 'number') {
          throw new Error("Input 'strokeOpacity' should be number.")
        }
      }
      if (options.strokeWeight) {
        if (typeof options.strokeWeight !== 'number') {
          throw new Error("Input 'strokeWeight' should be number.")
        }
      }

      switch (gisMap.mapType) {
        case MapType.GAODE_MAP:
          var gcj02Point = GPSCoverterUtils.GPSToChina(options.position[1], options.position[0])
          var aMapOptions = {
            center: new AMap.LngLat(gcj02Point.lng, gcj02Point.lat),
            radius: options.radius,
            fillColor: options.fillColor,
            fillOpacity: options.fillOpacity,
            strokeColor: options.strokeColor,
            strokeOpacity: options.strokeOpacity,
            strokeWeight: options.strokeWeight
          }
          circle['originalCircle'] = new AMap.Circle(aMapOptions)
          circle.id = 'circle_' + randomNum(16)
          this.circleList.push(circle)
          this['originalMap'].add(circle['originalCircle'])
          break

        case MapType.BAIDU_MAP:
          var gcj02Point = GPSCoverterUtils.GPSToChina(options.position[1], options.position[0])
          var bdPoint = GPSCoverterUtils.chinaToBaidu(gcj02Point.lat, gcj02Point.lng)
          var bMapOptions = {
            fillColor: options.fillColor,
            fillOpacity: options.fillOpacity,
            strokeColor: options.strokeColor,
            strokeOpacity: options.strokeOpacity,
            strokeWeight: options.strokeWeight
          }
          var centerPoint = new BMap.Point(bdPoint.lng, bdPoint.lat)
          circle['originalCircle'] = new BMap.Circle(centerPoint, options.radius, bMapOptions)
          circle.id = 'circle_' + randomNum(16)
          this.circleList.push(circle)
          this['originalMap'].addOverlay(circle['originalCircle'])
          break
        case MapType.GOOGLE_MAP:
        default:
          var gcj02Point = GPSCoverterUtils.GPSToChina(options.position[1], options.position[0])
          var gMapOptions = {
            center: new google.maps.LatLng(gcj02Point.lat, gcj02Point.lng),
            radius: options.radius,
            fillColor: options.fillColor,
            fillOpacity: options.fillOpacity,
            strokeColor: options.strokeColor,
            strokeOpacity: options.strokeOpacity,
            strokeWeight: options.strokeWeight
          }
          circle['originalCircle'] = new google.maps.Circle(gMapOptions)
          circle.id = 'circle_' + randomNum(16)
          this.circleList.push(circle)
          circle['originalCircle'].setMap(this['originalMap'])

          break
      }

      /*
			* 给circle绑定事件
			*/
      circle.on = function (eventName, handler) {
        if (!eventName || typeof eventName !== 'string') {
          throw new Error("Input 'eventName' is required and should be string.")
        }
        if (typeof handler !== 'function') {
          throw new Error("Input 'handler' is required and should be function.")
        }

        this['convert_' + eventName + '_' + handler.name] = function (e) {
          switch (gisMap.mapType) {
            case MapType.GAODE_MAP:
              // console.log("转换前", e);
              var outputLnglat = []
              if (e && e.lnglat) {
                var gpsPoint = GPSCoverterUtils.chinaToGPSExact(e.lnglat.getLat(), e.lnglat.getLng())
                outputLnglat = [gpsPoint.lng, gpsPoint.lat]
              }
              var outputPixel = []
              if (e && e.pixel) {
                outputPixel = [e.pixel.getX(), e.pixel.getY()]
              }
              handler({
                lngLat: outputLnglat,
                pixel: outputPixel,
                type: eventName,
                target: this
              })
              break

            case MapType.BAIDU_MAP:
              // console.log("转换前", e);
              var outputLnglat = []
              if (e && e.point) {
                var gcj02 = GPSCoverterUtils.baiduToChina(e.point.lat, e.point.lng)
                var gpsPoint = GPSCoverterUtils.chinaToGPSExact(gcj02.lat, gcj02.lng)
                outputLnglat = [gpsPoint.lng, gpsPoint.lat]
              }
              var outputPixel = []
              if (e && e.pixel) {
                outputPixel = [e.pixel.x, e.pixel.y]
              }
              handler({
                lngLat: outputLnglat,
                pixel: outputPixel,
                type: eventName,
                target: this
              })
              break

            case MapType.GOOGLE_MAP:
            default:
              // console.log("转换前", e);
              var outputLnglat = []
              if (e && e.latLng) {
                var gpsPoint = GPSCoverterUtils.chinaToGPSExact(e.latLng.lat(), e.latLng.lng())
                outputLnglat = [gpsPoint.lng, gpsPoint.lat]
              }
              var outputPixel = []
              if (e && e.pixel) {
                outputPixel = [e.pixel.x, e.pixel.y]
              }
              handler({
                lngLat: outputLnglat,
                pixel: outputPixel,
                type: eventName,
                target: this
              })
              break
          }
        }

        switch (gisMap.mapType) {
          case MapType.GAODE_MAP:
            this['originalCircle'].on(convertEvent2AMapType(eventName), this['convert_' + eventName + '_' + handler.name])
            break

          case MapType.BAIDU_MAP:
            this['originalCircle'].addEventListener(convertEvent2BMapType(eventName), this['convert_' + eventName + '_' + handler.name])
            break
          case MapType.GOOGLE_MAP:
          default:
            this['originalCircle'].addListener(convertEvent2GoogleMapType(eventName), this['convert_' + eventName + '_' + handler.name])
            break
        }
      }

      /*
			* 给circle解除事件绑定
			*/
      circle.off = function (eventName, handler) {
        if (!eventName || typeof eventName !== 'string') {
          throw new Error("Input 'eventName' is required and should be string.")
        }
        if (typeof handler !== 'function') {
          throw new Error("Input 'handler' is required and should be function.")
        }

        switch (gisMap.mapType) {
          case MapType.GAODE_MAP:
            this['originalCircle'].off(convertEvent2AMapType(eventName), this['convert_' + eventName + '_' + handler.name])
            break

          case MapType.BAIDU_MAP:
            this['originalCircle'].removeEventListener(convertEvent2BMapType(eventName), this['convert_' + eventName + '_' + handler.name])
            break
          case MapType.GOOGLE_MAP:
          default:
            google.maps.event.clearListeners(this['originalCircle'], convertEvent2GoogleMapType(eventName))
            // handler();传handler进来是为了解除绑定，不是为了调起
            break
        }
      }

      return circle
    }

    gisMap.polylineList = []

    /*
		* 添加折线
		*/
    gisMap.addPolyline = function (options) {
      // 折线
      var polyline = {
        overlayType: 'Polyline'
      }

      if (!options) {
        throw new Error('Map inputs are required.')
      }
      if (!Array.isArray(options.path) || options.path.length < 2) {
        throw new Error("Input 'path' is required and should be Array.")
      } else {
        options.path.forEach(function (pos) {
          if (!Array.isArray(pos) || pos.length < 2) {
            throw new Error('Each point of the path should be Array.')
          }
        })
      }
      if (options.strokeColor) {
        if (typeof options.strokeColor !== 'string') {
          throw new Error("Input 'strokeColor' should be string.")
        }
      } else {
        options.strokeColor = DEFAULT_STROKE_COLOR
      }
      if (options.strokeOpacity) {
        if (typeof options.strokeOpacity !== 'number') {
          throw new Error("Input 'strokeOpacity' should be number.")
        }
      }
      if (options.strokeWeight) {
        if (typeof options.strokeWeight !== 'number') {
          throw new Error("Input 'strokeWeight' should be number.")
        }
      }

      switch (gisMap.mapType) {
        case MapType.GAODE_MAP:
          var aPath = []
          options.path.forEach(function (pos) {
            var gcj02Point = GPSCoverterUtils.GPSToChina(pos[1], pos[0])
            var each = new AMap.LngLat(gcj02Point.lng, gcj02Point.lat)
            aPath.push(each)
          })
          var aMapOptions = {
            path: aPath,
            strokeColor: options.strokeColor,
            strokeOpacity: options.strokeOpacity,
            strokeWeight: options.strokeWeight
          }
          polyline['originalPolyline'] = new AMap.Polyline(aMapOptions)
          polyline.id = 'polyline_' + randomNum(16)
          this.polylineList.push(polyline)
          this['originalMap'].add(polyline['originalPolyline'])
          break

        case MapType.BAIDU_MAP:
          var bPath = []
          options.path.forEach(function (pos) {
            var gcj02Point = GPSCoverterUtils.GPSToChina(pos[1], pos[0])
            var bdPoint = GPSCoverterUtils.chinaToBaidu(gcj02Point.lat, gcj02Point.lng)
            var each = new BMap.Point(bdPoint.lng, bdPoint.lat)
            bPath.push(each)
          })
          var bMapOptions = {
            strokeColor: options.strokeColor,
            strokeOpacity: options.strokeOpacity,
            strokeWeight: options.strokeWeight
          }
          polyline['originalPolyline'] = new BMap.Polyline(bPath, bMapOptions)
          polyline.id = 'polyline_' + randomNum(16)
          this.polylineList.push(polyline)
          this['originalMap'].addOverlay(polyline['originalPolyline'])
          break
        case MapType.GOOGLE_MAP:
        default:
          var gPath = []
          options.path.forEach(function (pos) {
            var gcj02Point = GPSCoverterUtils.GPSToChina(pos[1], pos[0])
            var each = new google.maps.LatLng(gcj02Point.lat, gcj02Point.lng)
            gPath.push(each)
          })
          var gMapOptions = {
            path: gPath,
            strokeColor: options.strokeColor,
            strokeOpacity: options.strokeOpacity,
            strokeWeight: options.strokeWeight
          }
          polyline['originalPolyline'] = new google.maps.Polyline(gMapOptions)
          polyline.id = 'polyline_' + randomNum(16)
          this.polylineList.push(polyline)
          polyline['originalPolyline'].setMap(this['originalMap'])
          break
      }

      /*
			* 隐藏折线
			*/
      polyline.hide = function () {
        switch (gisMap.mapType) {
          case MapType.GAODE_MAP:
          case MapType.BAIDU_MAP:
            this['originalPolyline'].hide()
            break

          case MapType.GOOGLE_MAP:
          default:
            this['originalPolyline'].setVisible(false)
            break
        }
      }

      /*
			* 给polyline绑定事件
			*/
      polyline.on = function (eventName, handler) {
        if (!eventName || typeof eventName !== 'string') {
          throw new Error("Input 'eventName' is required and should be string.")
        }
        if (typeof handler !== 'function') {
          throw new Error("Input 'handler' is required and should be function.")
        }

        this['convert_' + eventName + '_' + handler.name] = function (e) {
          switch (gisMap.mapType) {
            case MapType.GAODE_MAP:
              // console.log("转换前", e);
              var outputLnglat = []
              if (e && e.lnglat) {
                var gpsPoint = GPSCoverterUtils.chinaToGPSExact(e.lnglat.getLat(), e.lnglat.getLng())
                outputLnglat = [gpsPoint.lng, gpsPoint.lat]
              }
              var outputPixel = []
              if (e && e.pixel) {
                outputPixel = [e.pixel.getX(), e.pixel.getY()]
              }
              handler({
                lngLat: outputLnglat,
                pixel: outputPixel,
                type: eventName,
                target: this
              })
              break

            case MapType.BAIDU_MAP:
              // console.log("转换前", e);
              var outputLnglat = []
              if (e && e.point) {
                var gcj02 = GPSCoverterUtils.baiduToChina(e.point.lat, e.point.lng)
                var gpsPoint = GPSCoverterUtils.chinaToGPSExact(gcj02.lat, gcj02.lng)
                outputLnglat = [gpsPoint.lng, gpsPoint.lat]
              }
              var outputPixel = []
              if (e && e.pixel) {
                outputPixel = [e.pixel.x, e.pixel.y]
              }
              handler({
                lngLat: outputLnglat,
                pixel: outputPixel,
                type: eventName,
                target: this
              })
              break

            case MapType.GOOGLE_MAP:
            default:
              // console.log("转换前", e);
              var outputLnglat = []
              if (e && e.latLng) {
                var gpsPoint = GPSCoverterUtils.chinaToGPSExact(e.latLng.lat(), e.latLng.lng())
                outputLnglat = [gpsPoint.lng, gpsPoint.lat]
              }
              var outputPixel = []
              if (e && e.pixel) {
                outputPixel = [e.pixel.x, e.pixel.y]
              }
              handler({
                lngLat: outputLnglat,
                pixel: outputPixel,
                type: eventName,
                target: this
              })
              break
          }
        }

        switch (gisMap.mapType) {
          case MapType.GAODE_MAP:
            this['originalPolyline'].on(convertEvent2AMapType(eventName), this['convert_' + eventName + '_' + handler.name])
            break

          case MapType.BAIDU_MAP:
            this['originalPolyline'].addEventListener(convertEvent2BMapType(eventName), this['convert_' + eventName + '_' + handler.name])
            break
          case MapType.GOOGLE_MAP:
          default:
            this['originalPolyline'].addListener(convertEvent2GoogleMapType(eventName), this['convert_' + eventName + '_' + handler.name])
            break
        }
      }

      /*
			* 给polyline解除事件绑定
			*/
      polyline.off = function (eventName, handler) {
        if (!eventName || typeof eventName !== 'string') {
          throw new Error("Input 'eventName' is required and should be string.")
        }
        if (typeof handler !== 'function') {
          throw new Error("Input 'handler' is required and should be function.")
        }

        switch (gisMap.mapType) {
          case MapType.GAODE_MAP:
            this['originalPolyline'].off(convertEvent2AMapType(eventName), this['convert_' + eventName + '_' + handler.name])
            break

          case MapType.BAIDU_MAP:
            this['originalPolyline'].removeEventListener(convertEvent2BMapType(eventName), this['convert_' + eventName + '_' + handler.name])
            break
          case MapType.GOOGLE_MAP:
          default:
            google.maps.event.clearListeners(this['originalPolyline'], convertEvent2GoogleMapType(eventName))
            // handler();传handler进来是为了解除绑定，不是为了调起
            break
        }
      }

      return polyline
    }

    /*
		* 获取地图覆盖物（Marker、Circle、Polyline、FlashMarker）
		*/
    gisMap.getOverlays = function () {
      var overlays = []
      if (this.markerList && this.markerList.length > 0) {
        overlays = overlays.concat(this.markerList)
      }
      if (this.circleList && this.circleList.length > 0) {
        overlays = overlays.concat(this.circleList)
      }
      if (this.polylineList && this.polylineList.length > 0) {
        overlays = overlays.concat(this.polylineList)
      }
      if (this.flashMarkerList && this.flashMarkerList.length > 0) {
        overlays = overlays.concat(this.flashMarkerList)
      }
      return overlays
    }

    /*
		* 删除某个地图覆盖物(图标、圆、折线、闪烁图标)
		*/
    gisMap.removeOverlay = function (overlay) {
      var type = ''
      var listType = ''
      if (overlay['originalMarker']) {
        type = 'originalMarker'
        listType = 'markerList'
      } else if (overlay['originalCircle'])	{
        type = 'originalCircle'
        listType = 'circleList'
      } else if (overlay['originalPolyline']) {
        type = 'originalPolyline'
        listType = 'polylineList'
      } else if (overlay['originalFlashMarker']) {
        type = 'originalFlashMarker'
        listType = 'flashMarkerList'
      } else {
        throw new Error("Input 'overlay' should be overlay type.")
      }

      switch (gisMap.mapType) {
        case MapType.GAODE_MAP:
          this['originalMap'].remove(overlay[type])
          break

        case MapType.BAIDU_MAP:
          this['originalMap'].removeOverlay(overlay[type])
          break

        case MapType.GOOGLE_MAP:
        default:
          overlay[type].setMap(null)
          break
      }

      var _this = this
      _this[listType].forEach(function (item, idx) {
        if (item.id == overlay.id) {
          _this[listType].splice(idx, 1)
        }
      })
    }

    /*
		* 清除地图覆盖物
		*/
    gisMap.clearOverlays = function () {
      var _this = this
      switch (gisMap.mapType) {
        case MapType.GAODE_MAP:
          this['originalMap'].clearMap()
          // flashMarker要手动清
          _this['flashMarkerList'].forEach(function (item, idx) {
            // document.getElementById(item.id).parentNode.removeChild(document.getElementById(item.id));
            _this['originalMap'].remove(item['originalFlashMarker'])
          })
          break

        case MapType.BAIDU_MAP:
          this['originalMap'].clearOverlays()
          break

        case MapType.GOOGLE_MAP:
        default:
          var markerList = _this['markerList'].slice(0)
          var circleList = _this['circleList'].slice(0)
          var polylineList = _this['polylineList'].slice(0)
          var flashMarkerList = _this['flashMarkerList'].slice(0)
          var polylinePaths = _this['polylinePaths'].slice(0)

          markerList.forEach(function (item, idx) {
            _this.removeOverlay(item)
          })

          circleList.forEach(function (item, idx) {
            _this.removeOverlay(item)
          })

          polylineList.forEach(function (item, idx) {
            _this.removeOverlay(item)
          })

          flashMarkerList.forEach(function (item, idx) {
            _this.removeOverlay(item)
          })

          polylinePaths.forEach(function (item, idx) {
            item.setMap(null)
          })

          _this.routePlanList.forEach(function (item, idx) {
            item['originalRoutePlan'].DirectionsRenderer.setMap(null)
          })

          _this.infoWindowList.forEach(function (item, idx) {
            item.closePopup()
          })

          break
      }

      this['markerList'] = []
      this['circleList'] = []
      this['polylineList'] = []
      this['flashMarkerList'] = []
      this['polylinePaths'] = []
      // this['routePlanList'] = [];
      // this['infoWindowList'] = [];
    }

    /*
		* 清除地图覆盖物(图标、圆、折线、闪烁图标)
		*/
    /* gisMap.clearOverlays = function() {
			var _this = this;
			var markerList = _this['markerList'].slice(0);
			var circleList = _this['circleList'].slice(0);
			var polylineList = _this['polylineList'].slice(0);
			var flashMarkerList = _this['flashMarkerList'].slice(0);

			markerList.forEach(function (item, idx) {
				_this.removeOverlay(item);
			});

			circleList.forEach(function (item, idx) {
				_this.removeOverlay(item);
			});

			polylineList.forEach(function (item, idx) {
				_this.removeOverlay(item);
			});

			flashMarkerList.forEach(function (item, idx) {
				_this.removeOverlay(item);
			});
			this['markerList'] = [];
			this['circleList'] = [];
			this['polylineList'] = [];
			this['flashMarkerList'] = [];
		}; */

    /*
		* 获取地图中心
		*/
    gisMap.getCenter = function () {
      var center = []// gps
      switch (gisMap.mapType) {
        case MapType.GAODE_MAP:
          var gdCenter = this['originalMap'].getCenter()
          // 高德坐标转gps
          var gpsPoint = GPSCoverterUtils.chinaToGPSExact(gdCenter.lat, gdCenter.lng)
          center = [gpsPoint.lng, gpsPoint.lat]
          break

        case MapType.BAIDU_MAP:
          var bdCenter = this['originalMap'].getCenter()
          var gcj02Point = GPSCoverterUtils.baiduToChina(bdCenter.lat, bdCenter.lng)
          var gpsPoint = GPSCoverterUtils.chinaToGPSExact(gcj02Point.lat, gcj02Point.lng)
          center = [gpsPoint.lng, gpsPoint.lat]
          break

        case MapType.GOOGLE_MAP:
        default:
          var ggCenter = this['originalMap'].getCenter()
          var gpsPoint = GPSCoverterUtils.chinaToGPSExact(ggCenter.lat(), ggCenter.lng())
          center = [gpsPoint.lng, gpsPoint.lat]
          break
      }
      return center
    }

    /*
		* 设置地图中心
		*/
    gisMap.setCenter = function (center) {
      if (!Array.isArray(center) || center.length < 2) {
        throw new Error("Input 'center' is required and should be Array.")
      }

      var gcj02Point = GPSCoverterUtils.GPSToChina(center[1], center[0])

      switch (gisMap.mapType) {
        case MapType.GAODE_MAP:
          var centerPoint = new AMap.LngLat(gcj02Point.lng, gcj02Point.lat)
          break

        case MapType.BAIDU_MAP:
          var bdPoint = GPSCoverterUtils.chinaToBaidu(gcj02Point.lat, gcj02Point.lng)
          var centerPoint = new BMap.Point(bdPoint.lng, bdPoint.lat)
          break

        case MapType.GOOGLE_MAP:
        default:
          var centerPoint = new google.maps.LatLng(gcj02Point.lat, gcj02Point.lng)
          break
      }
      this['originalMap'].setCenter(centerPoint)
      // this.center = center;
    }

    /*
		* 地理编码
		*/
    gisMap.getGeocoder = function () {
      var geocoder = {}

      switch (gisMap.mapType) {
        case MapType.GAODE_MAP:
          geocoder['originalGeocoder'] = new AMap.Geocoder()
          break

        case MapType.BAIDU_MAP:
          geocoder['originalGeocoder'] = new BMap.Geocoder()
          break
        case MapType.GOOGLE_MAP:
        default:
          geocoder['originalGeocoder'] = new google.maps.Geocoder()
          break
      }

      geocoder.getPoint = function (address, cbkFunc) {
        if (!address || typeof address !== 'string') {
          throw new Error("Input 'address' is required and should be string.")
        }
        if (cbkFunc) {
          if (typeof cbkFunc !== 'function') {
            throw new Error("Input 'cbkFunc' should be function.")
          }
        }

        var searchStatus = ''
        var searchResult = {}
        switch (gisMap.mapType) {
          case MapType.GAODE_MAP:
            geocoder['originalGeocoder'].getLocation(
              address,
              function (status, result) {
                if (status === 'complete' && result.info === 'OK') {
                  if (result && result.geocodes && result.geocodes[0]) {
                    var lng = result.geocodes[0].location.getLng()
                    var lat = result.geocodes[0].location.getLat()
                    // 高德坐标转换为GPS坐标
                    var gpsPoint = GPSCoverterUtils.chinaToGPSExact(lat, lng)
                    searchResult.lat = gpsPoint.lat
                    searchResult.lng = gpsPoint.lng
                    searchStatus = CALLBACK_STATUS.SUCCESS
                  } else {
                    searchStatus = CALLBACK_STATUS.ERROR
                  }
                } else {
                  searchStatus = CALLBACK_STATUS.ERROR
                }
                cbkFunc(searchStatus, searchResult)
              })
            break

          case MapType.BAIDU_MAP:
            geocoder['originalGeocoder'].getPoint(
              address,
              function (point) {
                if (point && point.lng && point.lat) {
                  // test
                  // map['originalMap'].setCenter(new BMap.Point(point.lng, point.lat));
                  // test
                  var gcj02 = GPSCoverterUtils.baiduToChina(point.lat, point.lng)
                  var gpsPoint = GPSCoverterUtils.chinaToGPSExact(gcj02.lat, gcj02.lng)
                  searchResult.lng = gpsPoint.lng
                  searchResult.lat = gpsPoint.lat
                  searchStatus = CALLBACK_STATUS.SUCCESS
                } else {
                  searchStatus = CALLBACK_STATUS.ERROR
                }
                cbkFunc(searchStatus, searchResult)
						    }, '')
            break
          case MapType.GOOGLE_MAP:
          default:
            geocoder['originalGeocoder'].geocode({
              address: address
            }, function (result, status) {
              if (status === 'OK') {
                if (result && result[0] && result[0].geometry && result[0].geometry.location) {
                  var lng = result[0].geometry.location.lng()
                  var lat = result[0].geometry.location.lat()
                  var gpsPoint = GPSCoverterUtils.chinaToGPSExact(lat, lng)
                  searchResult.lat = gpsPoint.lat
                  searchResult.lng = gpsPoint.lng
                  searchStatus = CALLBACK_STATUS.SUCCESS
                } else {
                  searchStatus = CALLBACK_STATUS.ERROR
                }
              } else {
                searchStatus = CALLBACK_STATUS.ERROR
              }
              cbkFunc(searchStatus, searchResult)
            })
            break
        }
      }
      return geocoder
    }

    /*
		* 给地图绑定事件
		*/
    gisMap.on = function (eventName, handler) {
      if (!eventName || typeof eventName !== 'string') {
        throw new Error("Input 'eventName' is required and should be string.")
      }
      if (typeof handler !== 'function') {
        throw new Error("Input 'handler' is required and should be function.")
      }

      this['convert_' + eventName + '_' + handler.name] = function (e) {
        switch (gisMap.mapType) {
          case MapType.GAODE_MAP:
            // console.log("转换前", e);
            var outputLnglat = []
            if (e && e.lnglat) {
              var gpsPoint = GPSCoverterUtils.chinaToGPSExact(e.lnglat.getLat(), e.lnglat.getLng())
              outputLnglat = [gpsPoint.lng, gpsPoint.lat]
            }
            var outputPixel = []
            if (e && e.pixel) {
              outputPixel = [e.pixel.getX(), e.pixel.getY()]
            }
            handler({
              lngLat: outputLnglat,
              pixel: outputPixel,
              type: eventName,
              target: this
            })
            break

          case MapType.BAIDU_MAP:
            // console.log("转换前", e);
            var outputLnglat = []
            if (e && e.point) {
              var gcj02 = GPSCoverterUtils.baiduToChina(e.point.lat, e.point.lng)
              var gpsPoint = GPSCoverterUtils.chinaToGPSExact(gcj02.lat, gcj02.lng)
              outputLnglat = [gpsPoint.lng, gpsPoint.lat]
            }
            var outputPixel = []
            if (e && e.pixel) {
              outputPixel = [e.pixel.x, e.pixel.y]
            }
            handler({
              lngLat: outputLnglat,
              pixel: outputPixel,
              type: eventName,
              target: this
            })
            break

          case MapType.GOOGLE_MAP:
          default:
            // console.log("转换前", e);
            var outputLnglat = []
            if (e && e.latLng) {
              var gpsPoint = GPSCoverterUtils.chinaToGPSExact(e.latLng.lat(), e.latLng.lng())
              outputLnglat = [gpsPoint.lng, gpsPoint.lat]
            }
            var outputPixel = []
            if (e && e.pixel) {
              outputPixel = [e.pixel.x, e.pixel.y]
            }
            handler({
              lngLat: outputLnglat,
              pixel: outputPixel,
              type: eventName,
              target: this
            })
            break
        }
      }

      switch (gisMap.mapType) {
        case MapType.GAODE_MAP:
          if (convertEvent2AMapType(eventName)) {
            this['originalMap'].on(convertEvent2AMapType(eventName), this['convert_' + eventName + '_' + handler.name])
          } else {
            handler()
          }

          break

        case MapType.BAIDU_MAP:
          if (convertEvent2BMapType(eventName)) {
            this['originalMap'].addEventListener(convertEvent2BMapType(eventName), this['convert_' + eventName + '_' + handler.name])
          } else {
            handler()
          }

          break
        case MapType.GOOGLE_MAP:
        default:
          if (convertEvent2GoogleMapType(eventName)) {
            this['originalMap'].addListener(convertEvent2GoogleMapType(eventName), this['convert_' + eventName + '_' + handler.name])
          } else {
            handler()
          }

          break
      }
    }

    /*
		* 给地图解除事件绑定
		*/
    gisMap.off = function (eventName, handler) {
      if (!eventName || typeof eventName !== 'string') {
        throw new Error("Input 'eventName' is required and should be string.")
      }
      if (typeof handler !== 'function') {
        throw new Error("Input 'handler' is required and should be function.")
      }

      switch (gisMap.mapType) {
        case MapType.GAODE_MAP:
          if (convertEvent2AMapType(eventName)) {
            this['originalMap'].off(convertEvent2AMapType(eventName), this['convert_' + eventName + '_' + handler.name])
          }

          break

        case MapType.BAIDU_MAP:
          if (convertEvent2BMapType(eventName)) {
            this['originalMap'].removeEventListener(convertEvent2BMapType(eventName), this['convert_' + eventName + '_' + handler.name])
          }

          break

        case MapType.GOOGLE_MAP:
        default:
          if (convertEvent2GoogleMapType(eventName)) {
            google.maps.event.clearListeners(this['originalMap'], convertEvent2GoogleMapType(eventName))
            // handler();传handler进来是为了解除绑定，不是为了调起
          }

          break
      }
    }

    /* gisMap.addListenerOnce = function(eventName, handler) {
			if(!eventName || typeof eventName != 'string') {
				throw new Error("Input 'eventName' is required and should be string.");
			}
			if(typeof handler != 'function') {
				throw new Error("Input 'handler' is required and should be function.");
			}

			switch (gisMap.mapType) {
				case MapType.GAODE_MAP:

					break;

				case MapType.BAIDU_MAP:

					break;

				case MapType.GOOGLE_MAP:
				default:
					google.maps.event.clearListeners(this['originalMap'], convertEvent2GoogleMapType(eventName));
					google.maps.event.addListenerOnce(globalMap['originalMap'],"projection_changed", function() {
					break;
			}

		}; */

    /*
		* 添加控件到地图
		*/
    gisMap.addControl = function (controlType, options) {
      switch (gisMap.mapType) {
        case MapType.GAODE_MAP:
          if (controlType == CONTROL.MAPTYPE) {
            var type = new AMap.MapType()
            this['originalMap'].addControl(type)
          } else if (controlType == CONTROL.SCALE) {
            var scale = new AMap.Scale()
            this['originalMap'].addControl(scale)
          } else if (controlType == CONTROL.CONTROL_BAR) {
            var right = '10px'
            var bottom = '-82px'
            if (options && options.position) {
              if (options.position.right) {
                right = options.position.right ? options.position.right : right
              }
              if (options.position.bottom) {
                bottom = options.position.bottom ? options.position.bottom : bottom
              }
            }
            var controlBar = new AMap.ControlBar({
              showZoomBar: false,
              showControlButton: true,
              position: {
							  right: right,
							  bottom: bottom
              }
            })
            this['originalMap'].addControl(controlBar)
          }
          break

        case MapType.BAIDU_MAP:
          if (controlType == CONTROL.MAPTYPE) {
            var control = new BMap.MapTypeControl({ type: BMAP_MAPTYPE_CONTROL_MAP })
            control.setOffset(new BMap.Size(15, 82))
            this['originalMap'].addControl(control)
          } else if (controlType == CONTROL.SCALE) {
            var control = new BMap.ScaleControl()
            this['originalMap'].addControl(control)
          }
          break

        case MapType.GOOGLE_MAP:
        default:
          var gMapOptions = {}
          if (controlType == CONTROL.MAPTYPE) {
            gMapOptions.zoomControl = true
            gMapOptions.zoomControlOptions = {
              position: google.maps.ControlPosition.TOP_RIGHT
            }

            gMapOptions.mapTypeControl = true
            gMapOptions.mapTypeControlOptions = {
              position: google.maps.ControlPosition.RIGHT_TOP
            }
          } else if (controlType == CONTROL.SCALE) {
            gMapOptions.scaleControl = true
          }
          this['originalMap'].setOptions(gMapOptions)
          break
      }
    }

    gisMap.routePlanList = []
    /*
		* 创建路线规划对象
		*/
    gisMap.addRoutePlan = function (options) {
      var routePlan = {}

      // 入参校验
      if (options.mode) {
        if (options.mode != ROUTEPLAN_MODE.DRIVING && options.mode != ROUTEPLAN_MODE.RIDING && options.mode != ROUTEPLAN_MODE.WALKING) {
          throw new Error("Input 'mode' should be 'riding', 'driving', or 'walking'.")
        }
      } else {
        options.mode = DEFAULT_ROUTEPLAN_MODE
      }
      options.autoRender = !!options.autoRender
      if (options.cbkFunc) {
        if (typeof options.cbkFunc !== 'function') {
          throw new Error("Input 'cbkFunc' should be function.")
        }
      }

      // 路径规划返回状态和结果
      var searchStatus = ''
      var searchResult = {}

      switch (gisMap.mapType) {
        case MapType.GAODE_MAP:
          var aOptions = {
            showTraffic: false
          }
          if (options.autoRender) {
            aOptions.map = this['originalMap']
          }
          switch (options.mode) {
            case ROUTEPLAN_MODE.WALKING:
              routePlan['originalRoutePlan'] = new AMap.Walking(aOptions)
              break
            case ROUTEPLAN_MODE.RIDING:
              routePlan['originalRoutePlan'] = new AMap.Riding(aOptions)
              break
            case ROUTEPLAN_MODE.DRIVING:
            default:
              routePlan['originalRoutePlan'] = new AMap.Driving(aOptions)
          }
          break

        case MapType.BAIDU_MAP:
          var bOptions = {
            onSearchComplete: function (results) {
              // console.log("转换前results:", results);
              if (routePlan['originalRoutePlan'].getStatus() == BMAP_STATUS_SUCCESS) {
                var plan = results.getPlan(0)
                searchResult = {
                  distance: plan.getDistance(false),
                  time: plan.getDuration(false)
                }
                searchStatus = CALLBACK_STATUS.SUCCESS
              } else {
                searchStatus = CALLBACK_STATUS.ERROR
              }
              if (typeof options.cbkFunc === 'function') {
                options.cbkFunc(searchStatus, searchResult, { results: results })
              }
            }
          }
          if (options.autoRender) {
            bOptions.renderOptions = { map: this['originalMap'] }
          }
          switch (options.mode) {
            case ROUTEPLAN_MODE.WALKING:
              routePlan['originalRoutePlan'] = new BMap.WalkingRoute(this['originalMap'], bOptions)
              break
            case ROUTEPLAN_MODE.RIDING:
              routePlan['originalRoutePlan'] = new BMap.RidingRoute(this['originalMap'], bOptions)
              break
            case ROUTEPLAN_MODE.DRIVING:
            default:
              routePlan['originalRoutePlan'] = new BMap.DrivingRoute(this['originalMap'], bOptions)
          }
          break

        case MapType.GOOGLE_MAP:
        default:
          routePlan['originalRoutePlan'] = {
            DirectionsService: new google.maps.DirectionsService()
          }
          if (options.autoRender) {
            routePlan['originalRoutePlan'].DirectionsRenderer = new google.maps.DirectionsRenderer()
          }
          break
      }

      this.routePlanList.push(routePlan)

      /*
			* 进行路径规划
			*/
      routePlan.search = function (origin, destination) { // waypoints
			    var _this = this
        // 入参校验
        if (!Array.isArray(origin) || origin.length < 2) {
          throw new Error("Input 'origin' is required and should be Array.")
        }
        if (!Array.isArray(destination) || destination.length < 2) {
          throw new Error("Input 'destination' is required and should be Array.")
        }
        /* if(waypoints && waypoints.length > 0) {
					waypoints.forEach(function (point) {
						if(!Array.isArray(point) || point.length < 2) {
							throw new Error("Every point in waypoints should be Array.");
						}
					});
				} */

        // 坐标系转换
        var newOri = []
        var newDest = []
        // var newWaypoint = [];
        switch (gisMap.mapType) {
          case MapType.BAIDU_MAP:
            var gcj02Point1 = GPSCoverterUtils.GPSToChina(origin[1], origin[0])
            var bdPoint1 = GPSCoverterUtils.chinaToBaidu(gcj02Point1.lat, gcj02Point1.lng)
            newOri = [bdPoint1.lng, bdPoint1.lat]
            var gcj02Point2 = GPSCoverterUtils.GPSToChina(destination[1], destination[0])
            var bdPoint2 = GPSCoverterUtils.chinaToBaidu(gcj02Point2.lat, gcj02Point2.lng)
            newDest = [bdPoint2.lng, bdPoint2.lat]
            break

          case MapType.GAODE_MAP:
          case MapType.GOOGLE_MAP:
          default:
            var gcj02Point1 = GPSCoverterUtils.GPSToChina(origin[1], origin[0])
            newOri = [gcj02Point1.lng, gcj02Point1.lat]
            var gcj02Point2 = GPSCoverterUtils.GPSToChina(destination[1], destination[0])
            newDest = [gcj02Point2.lng, gcj02Point2.lat]
            /* if(waypoints && waypoints.length > 0) {
							waypoints.forEach(function (point) {
								var gcj02Point3 = GPSCoverterUtils.GPSToChina(point[1], point[0]);
								newWaypoint.push([gcj02Point3.lng, gcj02Point3.lat]);
							});
						} */
            break
        }

        // 路径规划
        switch (gisMap.mapType) {
          case MapType.GAODE_MAP:
            /* var wayLngLats = [];
						if(newWaypoint && newWaypoint.length > 0) {
							newWaypoint.forEach(function (point) {
								wayLngLats.push(new AMap.LngLat(point[0], point[1]));
							});
						}

						routePlan['originalRoutePlan'].search(
							new AMap.LngLat(newOri[0], newOri[1]),
							new AMap.LngLat(newDest[0], newDest[1]),
							{waypoints:wayLngLats},
							function (status, result) {
								console.log("转换前status:", status);
								console.log("转换前result:", result);
								switch (status) {
									case 'complete':
										if (result && result.routes && result.routes[0]) {
											searchResult = {
												distance: result.routes[0].distance,
												time: result.routes[0].time
											};
											searchStatus = STATUS_TYPE.OK;
										} else {
											searchStatus = STATUS_TYPE.ZERO_RESULTS;
										}
										break;
									case 'error':
									default:
										searchStatus = STATUS_TYPE.ERROR;
										searchResult = {
											info: result
										};
								}
								if(typeof options.cbkFunc == 'function') {
									options.cbkFunc(searchStatus, searchResult);
								}

							}); */
            routePlan['originalRoutePlan'].search(
              new AMap.LngLat(newOri[0], newOri[1]),
              new AMap.LngLat(newDest[0], newDest[1]),
              function (status, result) {
                // console.log("转换前status:", status);
                // console.log("转换前result:", result);
                if (status == 'complete') {
                  if (result.routes && result.routes[0]) {
                    searchResult = {
                      distance: result.routes[0].distance,
                      time: result.routes[0].time
                    }
                    searchStatus = CALLBACK_STATUS.SUCCESS
                  } else {
                    searchStatus = CALLBACK_STATUS.ERROR
                  }
                } else {
                  searchStatus = CALLBACK_STATUS.ERROR
                }
                if (typeof options.cbkFunc === 'function') {
                  options.cbkFunc(searchStatus, searchResult, { status: status, result: result })
                }
              })
            break

          case MapType.BAIDU_MAP:
            routePlan['originalRoutePlan'].search(new BMap.Point(newOri[0], newOri[1]), new BMap.Point(newDest[0], newDest[1]))
            break

          case MapType.GOOGLE_MAP:
          default:
            function transformDistanceMode (mode) {
              switch (mode) {
                case ROUTEPLAN_MODE.WALKING:
                  return 'WALKING'
                case ROUTEPLAN_MODE.RIDING:
                  return 'BICYCLING'
                case ROUTEPLAN_MODE.DRIVING:
                default:
                  return 'DRIVING'
              }
            }

            // google特殊处理,骑行改为驾车
            if (options.mode == 'riding') {
              options.mode = 'driving'
            }

            routePlan['originalRoutePlan'].DirectionsService.route({
              origin: new google.maps.LatLng(newOri[1], newOri[0]),
              destination: new google.maps.LatLng(newDest[1], newDest[0]),
              travelMode: transformDistanceMode(options.mode)
            }, function (result, status) {
              // console.log("转换前status:", status);
						    // console.log("转换前result:", result);
              if (status === 'OK') {
                if (result && result.routes && result.routes[0] && result.routes[0].legs && result.routes[0].legs[0]) {
                  searchResult = {
                    distance: result.routes[0].legs[0].distance.value,
                    time: result.routes[0].legs[0].duration.value
                  }
                  searchStatus = CALLBACK_STATUS.SUCCESS
                  if (routePlan['originalRoutePlan'].DirectionsRenderer) {
                    routePlan['originalRoutePlan'].DirectionsRenderer.setMap(gisMap['originalMap']) // this or gisMap????
                    routePlan['originalRoutePlan'].DirectionsRenderer.setDirections(result)
                  }
                } else {
                  searchStatus = CALLBACK_STATUS.ERROR
                }
              } else {
                searchStatus = CALLBACK_STATUS.ERROR
              }

              if (typeof options.cbkFunc === 'function') {
                options.cbkFunc(searchStatus, searchResult, { status: status, result: result })
              }
            })
            break
        }
      }

      routePlan.clear = function () {
      }

      return routePlan
    }

    gisMap.polylinePaths = []
    /*
		* 路径规划, 绘制路线(以起点的color作为路线的颜色，width作为线的weight，opacity作为线的透明度)
		*/
    gisMap.calcRoutePath = function (options) {
      var _this = this
      // 入参校验
      if (!options) {
        throw new Error('Map inputs are required.')
      }
      if (!options.startPoint) {
        throw new Error("Input 'startPoint' is required.")
      } else {
        if (!Array.isArray(options.startPoint.coords) || options.startPoint.coords.length < 2) {
          throw new Error("Input 'startPoint.coords' is required and should be Array.")
        }

        if (!options.startPoint.color) {
          options.startPoint.color = DEFAULT_STROKE_COLOR
        }
      }
      if (!options.endPoint) {
        throw new Error("Input 'endPoint' is required.")
      } else {
        if (!Array.isArray(options.endPoint.coords) || options.endPoint.coords.length < 2) {
          throw new Error("Input 'endPoint.coords' is required and should be Array.")
        }

        if (!options.endPoint.color) {
          options.endPoint.color = DEFAULT_STROKE_COLOR
        }
      }
      if (options.wayPoints && options.wayPoints.length > 0) {
        options.wayPoints.forEach(function (point) {
          if (!Array.isArray(point.coords) || point.coords.length < 2) {
            throw new Error("Input 'point.coords' is required and should be Array.")
          }

          if (!point.color) {
            point.color = DEFAULT_STROKE_COLOR
          }
        })
      }

      var points = [options.startPoint]
      if (options.wayPoints && options.wayPoints.length > 0) {
        points = points.concat(options.wayPoints)
      }
      points.push(options.endPoint)

      switch (gisMap.mapType) {
        case MapType.GAODE_MAP:

          var searchAndDraw = function (points, i) {
            var drawPath = function (searchStatus, searchResult, original) {
              // console.log("original",original);
              if (original.status == 'complete' && original.result.routes && original.result.routes[0]) {
                var route = original.result.routes[0]
                var path = []
                for (var k = 0, l = route.steps.length; k < l; k++) {
                  var step = route.steps[k]
                  for (var j = 0, n = step.path.length; j < n; j++) {
									  path.push(step.path[j])
                  }
                }
                var routeLine = new AMap.Polyline({
                  path: path,
                  strokeWeight: points[i].width,
                  strokeColor: points[i].color,
                  strokeOpacity: points[i].opacity
                })
                routeLine.setMap(_this['originalMap'])
                _this.polylinePaths.push(routeLine)
              }
              if (i < points.length - 2) {
                i++
                searchAndDraw(points, i)
              }
            }
            var routePlan = gisMap.addRoutePlan({
              // mode: 'driving', 使用默认的
              // autoRender: true, //自己画
              cbkFunc: drawPath
            })
            routePlan.search(points[i].coords, points[i + 1].coords)
          }
          searchAndDraw(points, 0)
          break

        case MapType.BAIDU_MAP:
          var searchAndDraw = function (points, i) {
            var drawPath = function (searchStatus, searchResult, original) {
              // console.log("original",original);
              if (routePlan['originalRoutePlan'].getStatus() == BMAP_STATUS_SUCCESS) {
                var plan = original.results.getPlan(0)
                var route = plan.getRoute(0)
                var path = route.getPath()
                /* var path = [];
								for (var k = 0; k < route.getNumSteps(); k++){
									var step = route.getStep(k);
									path.push(step.getPosition());
								} */
                var routeLine = new BMap.Polyline(path, {
                  strokeWeight: points[i].width,
                  strokeColor: points[i].color,
                  strokeOpacity: points[i].opacity
                })
                _this['originalMap'].addOverlay(routeLine)
                _this.polylinePaths.push(routeLine)
              }
              if (i < points.length - 2) {
                i++
                searchAndDraw(points, i)
              }
            }
            var routePlan = gisMap.addRoutePlan({
              // mode: 'driving', 使用默认的
              // autoRender: true, //自己画
              cbkFunc: drawPath
            })
            routePlan.search(points[i].coords, points[i + 1].coords)
          }
          searchAndDraw(points, 0)
          break

        case MapType.GOOGLE_MAP:
        default:
          var searchAndDraw = function (points, i) {
            var drawPath = function (searchStatus, searchResult, original) {
              // console.log("original",original);
              if (original.status === 'OK') {
                if (original.result && original.result.routes && original.result.routes[0] && original.result.routes[0].legs && original.result.routes[0].legs[0]) {
                  var leg = original.result.routes[0].legs[0]
                  var path = []
                  for (var k = 0, l = leg.steps.length; k < l; k++) {
                    var step = leg.steps[k]
                    for (var j = 0, n = step.path.length; j < n; j++) {
										  path.push(step.path[j])
                    }
                  }
                  var routeLine = new google.maps.Polyline({
                    path: path,
                    strokeWeight: points[i].width,
                    strokeColor: points[i].color,
                    strokeOpacity: points[i].opacity
                  })
                  routeLine.setMap(_this['originalMap'])
                  _this.polylinePaths.push(routeLine)
                }
              }
              if (i < points.length - 2) {
                i++
                searchAndDraw(points, i)
              }
            }
            var routePlan = gisMap.addRoutePlan({
              // mode: 'driving', 使用默认的
              // autoRender: true, //自己画
              cbkFunc: drawPath
            })
            routePlan.search(points[i].coords, points[i + 1].coords)
          }
          searchAndDraw(points, 0)
          break
      }
    }

    /*
		* 轨迹描绘(以起点的color作为路线的颜色，width作为线的weight，opacity作为线的透明度)
		*/
    gisMap.drawCustomPath = function (options) {
      // 入参校验
      if (!options) {
        throw new Error('Map inputs are required.')
      }
      if (options.points && options.points.length > 0) {
        options.points.forEach(function (point) {
          if (!Array.isArray(point.coords) || point.coords.length < 2) {
            throw new Error("Input 'point.coords' is required and should be Array.")
          }

          if (!point.color) {
            point.color = DEFAULT_STROKE_COLOR
          }
        })
      }

      // 坐标转换

      switch (gisMap.mapType) {
        case MapType.BAIDU_MAP:
          options.points.forEach(function (point) {
            var gcj02Point = GPSCoverterUtils.GPSToChina(point.coords[1], point.coords[0])
            var bdPoint = GPSCoverterUtils.chinaToBaidu(gcj02Point.lat, gcj02Point.lng)
            point.newCoords = [bdPoint.lng, bdPoint.lat]
          })
          break

        case MapType.GAODE_MAP:
        case MapType.GOOGLE_MAP:
        default:
          options.points.forEach(function (point) {
            var gcj02Point = GPSCoverterUtils.GPSToChina(point.coords[1], point.coords[0])
            point.newCoords = [gcj02Point.lng, gcj02Point.lat]
          })
          break
      }

      // 画Polyline
      switch (gisMap.mapType) {
        case MapType.GAODE_MAP:
          for (var i = 0; i < options.points.length - 1; i++) {
            var origin = new AMap.LngLat(options.points[i].newCoords[0], options.points[i].newCoords[1])
            var dest = new AMap.LngLat(options.points[i + 1].newCoords[0], options.points[i + 1].newCoords[1])
            var line = new AMap.Polyline({
              path: [origin, dest],
              strokeWeight: options.points[i].width,
              strokeColor: options.points[i].color,
              strokeOpacity: options.points[i].opacity
            })
            line.setMap(this['originalMap'])
            this.polylinePaths.push(line)
          }
          break

        case MapType.BAIDU_MAP:
          for (var i = 0; i < options.points.length - 1; i++) {
            var origin = new BMap.Point(options.points[i].newCoords[0], options.points[i].newCoords[1])
            var dest = new BMap.Point(options.points[i + 1].newCoords[0], options.points[i + 1].newCoords[1])
            var line = new BMap.Polyline([origin, dest], {
              strokeWeight: options.points[i].width,
              strokeColor: options.points[i].color,
              strokeOpacity: options.points[i].opacity
            })
            this['originalMap'].addOverlay(line)
            this.polylinePaths.push(line)
          }
          break

        case MapType.GOOGLE_MAP:
        default:
          for (var i = 0; i < options.points.length - 1; i++) {
            var origin = new google.maps.LatLng(options.points[i].newCoords[1], options.points[i].newCoords[0])
            var dest = new google.maps.LatLng(options.points[i + 1].newCoords[1], options.points[i + 1].newCoords[0])
            var line = new google.maps.Polyline({
              path: [origin, dest],
              strokeWeight: options.points[i].width,
              strokeColor: options.points[i].color,
              strokeOpacity: options.points[i].opacity
            })
            line.setMap(this['originalMap'])
            this.polylinePaths.push(line)
          }
          break
      }
    }

    /*
		* 清除轨迹（routePlan自动渲染的轨迹和手动描绘的Polyline轨迹）
		*/
    gisMap.clearPath = function () {
      var _this = this
      if (this.routePlanList && this.routePlanList[0]) {
        this.routePlanList.forEach(function (routePlan, i) {
          switch (gisMap.mapType) {
            case MapType.GAODE_MAP:
              routePlan['originalRoutePlan'].clear()
              break

            case MapType.BAIDU_MAP:
              routePlan['originalRoutePlan'].clearResults()
              break

            case MapType.GOOGLE_MAP:
            default:
              if (routePlan['originalRoutePlan'].DirectionsRenderer) {
                routePlan['originalRoutePlan'].DirectionsRenderer.setMap(null)
              }
              break
          }
        })
      }
      this.routePlanList = []

      if (this.polylinePaths && this.polylinePaths[0]) {
        this.polylinePaths.forEach(function (polyline, i) {
          switch (gisMap.mapType) {
            case MapType.GAODE_MAP:
              polyline.setMap(null)
              break

            case MapType.BAIDU_MAP:
              _this['originalMap'].removeOverlay(polyline)
              break

            case MapType.GOOGLE_MAP:
            default:
              polyline.setMap(null)
              break
          }
        })
      }
      this.polylinePaths = []
    }

    /*
		* 获取地图墨卡托投影
		*/
    gisMap.getProjection = function () {
      var _this = this
      var Projection = {}
      switch (gisMap.mapType) {
        case MapType.BAIDU_MAP:
          Projection['originalProjection'] = new BMap.MercatorProjection()
          break

        case MapType.GAODE_MAP:
          Projection['originalProjection'] = {}
          break

        case MapType.GOOGLE_MAP:
        default:
          Projection['originalProjection'] = _this['originalMap'].getProjection()
          break
      }

      // 根据球面坐标获得平面坐标
      Projection.lnglatToPixel = function (position) {
        if (!Array.isArray(position) || position.length < 2) {
          throw new Error("Input 'position' is required and should be Array.")
        }
        var pixel = {}// 返回值[x,y]
        switch (gisMap.mapType) {
          case MapType.BAIDU_MAP:
            // gps坐标转换为百度坐标
            var gcj02Point = GPSCoverterUtils.GPSToChina(position[1], position[0])
            var bdPoint = GPSCoverterUtils.chinaToBaidu(gcj02Point.lat, gcj02Point.lng)
            var bPixel = Projection['originalProjection'].lngLatToPoint(new BMap.Point(bdPoint.lng, bdPoint.lat))
            pixel.x = bPixel.x
            pixel.y = bPixel.y
            break

          case MapType.GAODE_MAP:
            // gps坐标转换gcj02
            var gcj02Point = GPSCoverterUtils.GPSToChina(position[1], position[0])
            var aPixel = gisMap['originalMap'].lnglatToPixel(new AMap.LngLat(gcj02Point.lng, gcj02Point.lat), gisMap['originalMap'].getZoom())
            pixel.x = aPixel.x
            pixel.y = aPixel.y
            break

          case MapType.GOOGLE_MAP:
          default:
            // gps坐标转换gcj02
            var gcj02Point = GPSCoverterUtils.GPSToChina(position[1], position[0])
            var gPixel = Projection['originalProjection'].fromLatLngToPoint(new google.maps.LatLng(gcj02Point.lat, gcj02Point.lng))
            pixel.x = gPixel.x
            pixel.y = gPixel.y
            break
        }

        return pixel
      }

      // 根据平面坐标获得球面坐标 todo

      return Projection
    }

    /* gisMap.getProjection = async function() {
			var Projection = {};
			switch (gisMap.mapType) {
				case MapType.BAIDU_MAP:
					Projection['originalProjection'] = new BMap.MercatorProjection();
					break;

				case MapType.GAODE_MAP:
					Projection['originalProjection'] = {};
					break;

				case MapType.GOOGLE_MAP:
				default:
					Projection['originalProjection'] = await getGoogleProjection(this['originalMap']);
					break;

			}
			return Projection;
		};

		var getGoogleProjection = function (map){
			return new Promise(function (resolve, reject){
				google.maps.event.addListenerOnce(map,"projection_changed", function() {
					resolve(map.getProjection());
				});
			});
		}; */

    /* gisMap.getProjection = function() {
			var _this = this;
			var Projection;
			google.maps.event.addListenerOnce(_this['originalMap'],"projection_changed", function() {
				Projection['originalProjection'] = _this['originalMap'].getProjection();
			});
			while(1) {
				console.log("pending...");
				if(Projection) {
					break;
				}
			}

		}; */

    /*
		*地图容器坐标与经纬度的互换
		*/
    gisMap.lngLatToContainer = function (position) {
      var pixel = {}
      if (!Array.isArray(position) || position.length < 2) {
        throw new Error("Input 'position' is required and should be Array.")
      }
      switch (gisMap.mapType) {
        case MapType.BAIDU_MAP:
          // gps坐标转换为百度坐标
          var gcj02Point = GPSCoverterUtils.GPSToChina(position[1], position[0])
          var bdPoint = GPSCoverterUtils.chinaToBaidu(gcj02Point.lat, gcj02Point.lng)
          var bPixel = this['originalMap'].pointToOverlayPixel(new BMap.Point(bdPoint.lng, bdPoint.lat))
          pixel.x = bPixel.x
          pixel.y = bPixel.y
          break

        case MapType.GAODE_MAP:
          // gps坐标转换gcj02
          var gcj02Point = GPSCoverterUtils.GPSToChina(position[1], position[0])
          var aPixel = this['originalMap'].lngLatToContainer(new AMap.LngLat(gcj02Point.lng, gcj02Point.lat))
          pixel.x = aPixel.x
          pixel.y = aPixel.y
          break

        case MapType.GOOGLE_MAP:
        default:
				    // 此方法计算结果是正确的
          var gcj02Point = GPSCoverterUtils.GPSToChina(position[1], position[0])
          var latLng = new google.maps.LatLng(gcj02Point.lat, gcj02Point.lng)
          var gPixel = {}
          var _this = this
          // google.maps.event.addListenerOnce(this['originalMap'],"projection_changed", function() {
					    gPixel = GoogleCoverterUtils.latLng2Point(latLng, _this['originalMap'])
          // console.log("gPixel",gPixel);
          // });
          pixel.x = gPixel.x
          pixel.y = gPixel.y

          // 此方法不知道算出来什么鬼
          /* var gcj02Point = GPSCoverterUtils.GPSToChina(position[1], position[0]);
					var latLng = new google.maps.LatLng(gcj02Point.lat , gcj02Point.lng);
					var gPixel = {};
					gPixel.x = (latLng.lng() + 180) * (256 << this['originalMap'].getZoom()) / 360;
					var siny = Math.sin(latLng.lat() * Math.PI / 180);
					var y = Math.log((1 + siny) / (1 - siny));
					gPixel.y = (128 << this['originalMap'].getZoom()) * (1 - y / (2 * Math.PI)); */
          break
      }
      return pixel
    }

    /*
		*地图容器坐标与经纬度的互换
		*/
    gisMap.containerToLngLat = function (pixel) {
      var outputLnglat = []
      if (!pixel || !pixel.x || !pixel.y) {
        throw new Error("Input 'pixel' is required and should have properties x and y.")
      }
      switch (gisMap.mapType) {
        case MapType.BAIDU_MAP:
				    var bdPoint = this['originalMap'].overlayPixelToPoint(new BMap.Pixel(pixel.x, pixel.y))
          // 百度坐标转换为gps坐标
          var gcj02 = GPSCoverterUtils.baiduToChina(bdPoint.lat, bdPoint.lng)
          var gpsPoint = GPSCoverterUtils.chinaToGPSExact(gcj02.lat, gcj02.lng)
          outputLnglat = [gpsPoint.lng, gpsPoint.lat]
          break

        case MapType.GAODE_MAP:
          var gcj02 = this['originalMap'].containerToLngLat(new AMap.Pixel(pixel.x, pixel.y))
          // gcj02坐标转换为gps坐标
          var gpsPoint = GPSCoverterUtils.chinaToGPSExact(gcj02.lat, gcj02.lng)
          outputLnglat = [gpsPoint.lng, gpsPoint.lat]
          break

        case MapType.GOOGLE_MAP:
        default:
          var ggPoint = GoogleCoverterUtils.point2LatLng(pixel, this['originalMap'])
          // gcj02坐标转换为gps坐标
          var gpsPoint = GPSCoverterUtils.chinaToGPSExact(ggPoint.lat(), ggPoint.lng())
          outputLnglat = [gpsPoint.lng, gpsPoint.lat]
          break
      }
      return outputLnglat
    }

    /*
		* 设置地图属性(google关闭拖拽会关闭scrollWeel?)
		*/
    gisMap.setMapStatus = function (options) {
      if (!options) {
        return
      }

      // 是否开启地图拖拽
      if (typeof (options.dragEnable) !== 'undefined') {
        if (options.dragEnable) {
          switch (gisMap.mapType) {
            case MapType.BAIDU_MAP:
              this['originalMap'].enableDragging()
              break

            case MapType.GAODE_MAP:
              this['originalMap'].setStatus({ dragEnable: true })
              break

            case MapType.GOOGLE_MAP:
            default:
              this['originalMap'].setOptions({ draggable: true })
              break
          }
        } else {
          switch (gisMap.mapType) {
            case MapType.BAIDU_MAP:
              this['originalMap'].disableDragging()
              break

            case MapType.GAODE_MAP:
              this['originalMap'].setStatus({ dragEnable: false })
              break

            case MapType.GOOGLE_MAP:
            default:
              this['originalMap'].setOptions({ draggable: false })
              break
          }
        }
      }

      // 是否开启鼠标滚轮缩放地图
      if (typeof (options.scrollWheel) !== 'undefined') {
        if (options.scrollWheel) {
          switch (gisMap.mapType) {
            case MapType.BAIDU_MAP:
              this['originalMap'].enableScrollWheelZoom()
              break

            case MapType.GAODE_MAP:
              this['originalMap'].setStatus({ scrollWheel: true })
              break

            case MapType.GOOGLE_MAP:
            default:
              this['originalMap'].setOptions({ scrollwheel: true })
              break
          }
        } else {
          switch (gisMap.mapType) {
            case MapType.BAIDU_MAP:
              this['originalMap'].disableScrollWheelZoom()
              break

            case MapType.GAODE_MAP:
              this['originalMap'].setStatus({ scrollWheel: false })
              break

            case MapType.GOOGLE_MAP:
            default:
              this['originalMap'].setOptions({ scrollwheel: false })
              break
          }
        }
      }

      // 是否开启双击缩放地图
      if (typeof (options.doubleClickZoom) !== 'undefined') {
        if (options.doubleClickZoom) {
          switch (gisMap.mapType) {
            case MapType.BAIDU_MAP:
              this['originalMap'].enableDoubleClickZoom()
              break

            case MapType.GAODE_MAP:
              this['originalMap'].setStatus({ doubleClickZoom: true })
              break

            case MapType.GOOGLE_MAP:
            default:
              this['originalMap'].setOptions({ disableDoubleClickZoom: false })
              break
          }
        } else {
          switch (gisMap.mapType) {
            case MapType.BAIDU_MAP:
              this['originalMap'].disableDoubleClickZoom()
              break

            case MapType.GAODE_MAP:
              this['originalMap'].setStatus({ doubleClickZoom: false })
              break

            case MapType.GOOGLE_MAP:
            default:
              this['originalMap'].setOptions({ disableDoubleClickZoom: true })
              break
          }
        }
      }

      // 是否开启手势控制地图缩放（终端上，google还包括平移等）to be tested
      if (typeof (options.touchZoom) !== 'undefined') {
        if (options.touchZoom) {
          switch (gisMap.mapType) {
            case MapType.BAIDU_MAP:
              this['originalMap'].enablePinchToZoom()
              break

            case MapType.GAODE_MAP:
              this['originalMap'].setStatus({ touchZoom: true })
              break

            case MapType.GOOGLE_MAP:
            default:
              this['originalMap'].setOptions({ gestureHandling: 'greedy' })
              break
          }
        } else {
          switch (gisMap.mapType) {
            case MapType.BAIDU_MAP:
              this['originalMap'].disablePinchToZoom()
              break

            case MapType.GAODE_MAP:
              this['originalMap'].setStatus({ touchZoom: false })
              break

            case MapType.GOOGLE_MAP:
            default:
              this['originalMap'].setOptions({ gestureHandling: 'auto' })
              break
          }
        }
      }
    }

    /*
		* 获取当前地图可视区域
		*/
    gisMap.getBounds = function () {
      var bounds = {}
      switch (gisMap.mapType) {
        case MapType.BAIDU_MAP:
          bounds['originalBounds'] = this['originalMap'].getBounds()
          break

        case MapType.GAODE_MAP:
          bounds['originalBounds'] = this['originalMap'].getBounds()
          break

        case MapType.GOOGLE_MAP:
        default:
          bounds['originalBounds'] = this['originalMap'].getBounds()
          break
      }

      bounds.getSouthWest = function () {
        var swPoint = []
        switch (gisMap.mapType) {
          case MapType.BAIDU_MAP:
            var bdPoint = bounds['originalBounds'].getSouthWest()
            // 百度坐标转换为gps坐标
					    var gcj02 = GPSCoverterUtils.baiduToChina(bdPoint.lat, bdPoint.lng)
            var gpsPoint = GPSCoverterUtils.chinaToGPSExact(gcj02.lat, gcj02.lng)
					    swPoint = [gpsPoint.lng, gpsPoint.lat]
            break

          case MapType.GAODE_MAP:
            var gdPoint = bounds['originalBounds'].getSouthWest()
            var gpsPoint = GPSCoverterUtils.chinaToGPSExact(gdPoint.lat, gdPoint.lng)
					    swPoint = [gpsPoint.lng, gpsPoint.lat]
            break

          case MapType.GOOGLE_MAP:
          default:
            var gdPoint = bounds['originalBounds'].getSouthWest()
            var gpsPoint = GPSCoverterUtils.chinaToGPSExact(gdPoint.lat(), gdPoint.lng())
					    swPoint = [gpsPoint.lng, gpsPoint.lat]
					    break
        }

        return swPoint
      }

      bounds.getNorthEast = function () {
        var nePoint = []
        switch (gisMap.mapType) {
          case MapType.BAIDU_MAP:
            var bdPoint = bounds['originalBounds'].getNorthEast()
            // 百度坐标转换为gps坐标
					    var gcj02 = GPSCoverterUtils.baiduToChina(bdPoint.lat, bdPoint.lng)
            var gpsPoint = GPSCoverterUtils.chinaToGPSExact(gcj02.lat, gcj02.lng)
					    nePoint = [gpsPoint.lng, gpsPoint.lat]
            break

          case MapType.GAODE_MAP:
            var gdPoint = bounds['originalBounds'].getNorthEast()
            var gpsPoint = GPSCoverterUtils.chinaToGPSExact(gdPoint.lat, gdPoint.lng)
					    nePoint = [gpsPoint.lng, gpsPoint.lat]
            break

          case MapType.GOOGLE_MAP:
          default:
            var gdPoint = bounds['originalBounds'].getNorthEast()
            var gpsPoint = GPSCoverterUtils.chinaToGPSExact(gdPoint.lat(), gdPoint.lng())
					    nePoint = [gpsPoint.lng, gpsPoint.lat]
					    break
        }

        return nePoint
      }

      return bounds
    }

    /*
		* 设置合适的地图视野
		*/
    gisMap.setFitView = function (options) {
      if (!options) {
        throw new Error('Map inputs are required.')
      }
      if (!Array.isArray(options.positions) && options.positions.length < 1) {
        throw new Error("Input 'positions' are required and should be Array.")
      } else {
        options.positions.forEach(function (point) {
          if (!Array.isArray(point) || point.length < 2) {
            throw new Error('Each point of Positions is required and should be Array.')
          }
        })
      }

      // console.log("setFitView:  ",options.positions);
      switch (gisMap.mapType) {
        case MapType.BAIDU_MAP:
          // GPS坐标转换为百度坐标
          var bdPoints = []
          options.positions.forEach(function (pos) {
            var gcj02 = GPSCoverterUtils.GPSToChina(pos[1], pos[0])
            var bd = GPSCoverterUtils.chinaToBaidu(gcj02.lat, gcj02.lng)
            bdPoints.push(new BMap.Point(bd.lng, bd.lat))
          })
          this['originalMap'].setViewport(bdPoints)
          break

        case MapType.GAODE_MAP:
          var gdMarkers = []
          options.positions.forEach(function (pos) {
            var gcj02 = GPSCoverterUtils.GPSToChina(pos[1], pos[0])
            var marker = new AMap.Marker({
              position: new AMap.LngLat(gcj02.lng, gcj02.lat)
            })
            gdMarkers.push(marker)
          })
          this['originalMap'].setFitView(gdMarkers)

          break

        case MapType.GOOGLE_MAP:
        default:
          // 当前边界
				    var curentBounds = {}
          // google点数组
          var ggLalngs = []
          // GPS坐标转换为Google坐标
          options.positions.forEach(function (pos) {
            var gcj02 = GPSCoverterUtils.GPSToChina(pos[1], pos[0])
            ggLalngs.push(new google.maps.LatLng(gcj02.lat, gcj02.lng))
          })
          // 处理第一个点，用其生成最小边界
          curentBounds = new google.maps.LatLngBounds(ggLalngs[0], ggLalngs[0])
          // 把余下点加入边界
          for (var i = 1; i < ggLalngs.length; i++) {
            curentBounds.extend(ggLalngs[i])
          }
          this['originalMap'].fitBounds(curentBounds, 10)
          break
      }
    }

    /*
		* 获取合适的地图视野
		*/
    gisMap.getFitView = function (options) {
      var viewport = {}
      if (!options) {
        throw new Error('Map inputs are required.')
      }
      if (!Array.isArray(options.positions) && options.positions.length < 1) {
        throw new Error("Input 'positions' are required and should be Array.")
      } else {
        options.positions.forEach(function (point) {
          if (!Array.isArray(point) || point.length < 2) {
            throw new Error('Each point of Positions is required and should be Array.')
          }
        })
      }

      // console.log("setFitView:  ",options.positions);
      switch (gisMap.mapType) {
        case MapType.BAIDU_MAP:
          // GPS坐标转换为百度坐标
          var bdPoints = []
          options.positions.forEach(function (pos) {
            var gcj02 = GPSCoverterUtils.GPSToChina(pos[1], pos[0])
            var bd = GPSCoverterUtils.chinaToBaidu(gcj02.lat, gcj02.lng)
            bdPoints.push(new BMap.Point(bd.lng, bd.lat))
          })
          var bdviewPort = this['originalMap'].getViewport(bdPoints)
          // 百度坐标转换为gps坐标
          var gcj02_1 = GPSCoverterUtils.baiduToChina(bdviewPort.center.lat, bdviewPort.center.lng)
          var center = GPSCoverterUtils.chinaToGPSExact(gcj02_1.lat, gcj02_1.lng)
          viewport.zoom = bdviewPort.zoom
          viewport.center = [center.lng, center.lat]
          break

        case MapType.GAODE_MAP:

          break

        case MapType.GOOGLE_MAP:
        default:

          break
      }
      return viewport
    }

    /*
		* 同时设置地图中心和缩放
		*/
    gisMap.centerAndZoom = function (center, zoom) {
      if (!Array.isArray(center) || center.length < 2) {
        throw new Error('Center is required and should be Array.')
      }

      if (typeof zoom !== 'number') {
        throw new Error('Zoom is required and should be number.')
      }

      switch (gisMap.mapType) {
        case MapType.BAIDU_MAP:
          // GPS坐标转换为百度坐标
          var gcj02 = GPSCoverterUtils.GPSToChina(center[1], center[0])
          var bd = GPSCoverterUtils.chinaToBaidu(gcj02.lat, gcj02.lng)
          this['originalMap'].centerAndZoom(new BMap.Point(bd.lng, bd.lat), zoom)
          break

        case MapType.GAODE_MAP:
          var gcj02 = GPSCoverterUtils.GPSToChina(center[1], center[0])
          this['originalMap'].setZoomAndCenter(zoom, new AMap.LngLat(gcj02.lng, gcj02.lat))
          break

        case MapType.GOOGLE_MAP:
        default:
          this.setCenter(center)
          this.setZoom(zoom)
          break
      }
    }

    /*
		* 触发实例上的事件
		*/
    gisMap.trigger = function (instance, eventName) {
      var overlayType = ''
      Object.keys(instance).forEach(function (key, idx) {
        if (key.startsWith('original')) {
          overlayType = key
        }
      })

      switch (gisMap.mapType) {
        case MapType.BAIDU_MAP:
          instance[overlayType].dispatchEvent(convertEvent2BMapType(eventName))
          break

        case MapType.GAODE_MAP:
          AMap.event.trigger(instance[overlayType], convertEvent2AMapType(eventName))
          break

        case MapType.GOOGLE_MAP:
        default:
          google.maps.event.trigger(instance[overlayType], convertEvent2GoogleMapType(eventName))
          break
      }
    }

    return gisMap
  }

  win.gis = gis
})(window)
