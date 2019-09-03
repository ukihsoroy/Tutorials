(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('echarts'))
    : typeof define === 'function' && define.amd ? define(['exports', 'echarts'], factory)
      : (global = global || self, factory(global.gismap = {}, global.echarts))
}(this, function (exports, echarts) {
  'use strict'

  /* GISMapCoordSys */
  function GISMapCoordSys (gismap, api) {
    this._gismap = gismap
    this.dimensions = ['lng', 'lat']
    this._mapOffset = [0, 0]
    this._api = api
    this._projection = {}
  }

  GISMapCoordSys.prototype.dimensions = ['lng', 'lat']

  GISMapCoordSys.prototype.setZoom = function (zoom) {
    this._zoom = zoom
  }

  GISMapCoordSys.prototype.setCenter = function (center) {
    this._center = this._gismap.getProjection().lnglatToPixel(center)
  }

  GISMapCoordSys.prototype.setMapOffset = function (mapOffset) {
    this._mapOffset = mapOffset
  }

  GISMapCoordSys.prototype.getGISMap = function () {
    return this._gismap
  }

  GISMapCoordSys.prototype.dataToPoint = function (data) {
    var px = this._gismap.lngLatToContainer(data)
    var mapOffset = this._mapOffset
    return [px.x - mapOffset[0], px.y - mapOffset[1]]
  }

  GISMapCoordSys.prototype.pointToData = function (point) {
    var mapOffset = this._mapOffset
    var pt = this._gismap.containerToLngLat({
      x: pt[0] + mapOffset[0],
      y: pt[1] + mapOffset[1]
    })
    return [pt.lng, pt.lat]
  }

  GISMapCoordSys.prototype.getViewRect = function () {
    var api = this._api
    return new echarts.graphic.BoundingRect(0, 0, api.getWidth(), api.getHeight())
  }

  GISMapCoordSys.prototype.getRoamTransform = function () {
    return echarts.matrix.create()
  }

  GISMapCoordSys.prototype.prepareCustoms = function (data) {
    var rect = this.getViewRect()
    return {
      coordSys: {
        type: 'gismap',
        x: rect.x,
        y: rect.y,
        width: rect.width,
        height: rect.height
      },
      api: {
        coord: echarts.util.bind(this.dataToPoint, this),
        size: echarts.util.bind(dataToCoordSize, this)
      }
    }
  }

  function dataToCoordSize (dataSize, dataItem) {
    dataItem = dataItem || [0, 0]
    return echarts.util.map([0, 1], function (dimIdx) {
      var val = dataItem[dimIdx]
      var halfSize = dataSize[dimIdx] / 2
      var p1 = []
      var p2 = []
      p1[dimIdx] = val - halfSize
      p2[dimIdx] = val + halfSize
      p1[1 - dimIdx] = p2[1 - dimIdx] = dataItem[1 - dimIdx]
      return Math.abs(this.dataToPoint(p1)[dimIdx] - this.dataToPoint(p2)[dimIdx])
    }, this)
  }

  GISMapCoordSys.dimensions = GISMapCoordSys.prototype.dimensions

  var Overlay
  function createOverlayCtor (mapType) {
    function Overlay (root, map) {
      this._root = root
      this._map = map
      if (mapType == 'GOOGLE_MAP') {
        this.setMap(map['originalMap'])
      } else if (mapType == 'BAIDU_MAP') {
        map['originalMap'].addOverlay(this)
      }
    }

    if (mapType == 'GOOGLE_MAP') {
      Overlay.prototype = new google.maps.OverlayView()

      Overlay.prototype.onAdd = function () {
        var panes = this.getPanes()
        // panes.overlayLayer.appendChild(this._root);
        panes.floatShadow.appendChild(this._root)
        return this._root
      }

      Overlay.prototype.draw = function () {}

      Overlay.prototype.onRemove = function () {
        this._root.parentNode.removeChild(this._root)
        this._root = null
      }
    } else if (mapType == 'BAIDU_MAP') {
      Overlay.prototype = new BMap.Overlay()

      Overlay.prototype.initialize = function (map) {
        map.getPanes().labelPane.appendChild(this._root)
        return this._root
      }

      Overlay.prototype.draw = function () {}
    }

    return Overlay
  }

  GISMapCoordSys.create = function (ecModel, api) {
    var gismapCoordSys
    var root = api.getDom()

    ecModel.eachComponent('gismap', function (gismapModel) {
      var painter = api.getZr().painter
      var viewportRoot = painter.getViewportRoot()
 		if (typeof google === 'undefined' && typeof AMap === 'undefined' && typeof BMap === 'undefined') {
        throw new Error('gis map api is not loaded')
      }
      Overlay = createOverlayCtor(pageMaps[gismapModel.option.mapCellId].mapType)// Overlay || createOverlayCtor();
      if (gismapCoordSys) {
        throw new Error('Only one gismap component can exist')
      }
      if (!gismapModel.__gismap) {
        var gismapRoot = root.querySelector('.ec-extension-gismap')
        if (gismapRoot) {
          // Reset viewport left and top, which will be changed
          // in moving handler in GISMapView
          if (pageMaps[gismapModel.option.mapCellId].mapType == 'GOOGLE_MAP') {
            var swPoint = pageMaps[gismapModel.option.mapCellId].getBounds().getSouthWest()
            var nePoint = pageMaps[gismapModel.option.mapCellId].getBounds().getNorthEast()
            var topRight = pageMaps[gismapModel.option.mapCellId].getProjection().lnglatToPixel(nePoint)
            if (Math.abs(nePoint[0] - swPoint[0]) > 180) {
					  topRight.x = 256 + topRight.x
            }
            var bottomLeft = pageMaps[gismapModel.option.mapCellId].getProjection().lnglatToPixel(swPoint)
            var scale = Math.pow(2, pageMaps[gismapModel.option.mapCellId].getZoom())
            viewportRoot.style.left = (bottomLeft.x - topRight.x) * scale / 2 + 'px'
            viewportRoot.style.top = (topRight.y - bottomLeft.y) * scale / 2 + 'px'
          } else {
            viewportRoot.style.left = '0px'
            viewportRoot.style.top = '0px'
          }
        }
        var gismap = gismapModel.__gismap = pageMaps[gismapModel.option.mapCellId]

        if (pageMaps[gismapModel.option.mapCellId].mapType == 'GAODE_MAP') {
          var customLayer = new AMap.CustomLayer(viewportRoot, {
            zIndex: 120 // todo
            // alwaysRender: false
          })
          customLayer.render = function () {}
          customLayer.setMap(gismap['originalMap'])
        } else {
          var overlay = new Overlay(viewportRoot, gismap)
        }

        // Override
        painter.getViewportRootOffset = function () {
          return { offsetLeft: 0, offsetTop: 0 }
        }
      }

      var gismap = gismapModel.__gismap

      // Set gismap options
      // centerAndZoom before layout and render
      var center = gismapModel.get('center')
      var zoom = gismapModel.get('zoom')
      var mapZoom = gismap.getZoom()

      if (pageMaps[gismapModel.option.mapCellId].mapType == 'BAIDU_MAP') {
        if (center && zoom) {
          // gismap.setCenter(center);
          // gismap.setZoom(zoom);
          gismap.centerAndZoom(center, zoom)
        }
      } else {
        if (center && zoom && zoom != mapZoom) {
          // gismap.setCenter(center);
          // gismap.setZoom(zoom);
          gismap.centerAndZoom(center, zoom)
        }
      }

      // Google 第一次初始化特殊处理，保证不循环初始化造成页面卡顿
      if (pageMaps[gismapModel.option.mapCellId].mapType == 'GOOGLE_MAP' && !gismapModel.isReload) {
        gismapModel.isReload = true
        gismap.setCenter(center)
        gismap.setZoom(zoom)
      }

      gismapCoordSys = new GISMapCoordSys(gismap, api)
      gismapCoordSys.setMapOffset(gismapModel.__mapOffset || [0, 0])
      gismapCoordSys.setZoom(zoom)
      gismapCoordSys.setCenter(center)

      gismapModel.coordinateSystem = gismapCoordSys
    })

    ecModel.eachSeries(function (seriesModel) {
      if (seriesModel.get('coordinateSystem') === 'gismap') {
        seriesModel.coordinateSystem = gismapCoordSys
      }
    })
  }

  function v2Equal (a, b) {
    return a && b && a[0] === b[0] && a[1] === b[1]
  }

  echarts.extendComponentModel({
    type: 'gismap',

    getGISMap: function getGISMap () {
      // __gismap is injected when creating GISMapCoordSys
      return this.__gismap
    },

    setCenterAndZoom: function setCenterAndZoom (center, zoom) {
      this.option.center = center
      this.option.zoom = zoom
    },

    centerOrZoomChanged: function centerOrZoomChanged (center, zoom) {
      var option = this.option
      return !(v2Equal(center, option.center) && zoom === option.zoom)
    },

    defaultOption: {

      center: [114.054593, 22.654510],

      zoom: 5,

      mapStyle: '',

      roam: false
    }
  })

  echarts.extendComponentView({
    type: 'gismap',

    render: function render (gisMapModel, ecModel, api) {
      var rendering = true

      var gismap = gisMapModel.getGISMap()
      var viewportRoot = api.getZr().painter.getViewportRoot()
      var coordSys = gisMapModel.coordinateSystem
      var moveHandler = function moveHandler (type, target) {
        if (rendering) {
          return
        }

        var mapOffset
        if (viewportRoot.parentNode) {
          var offsetEl = viewportRoot.parentNode.parentNode.parentNode
          mapOffset = [-parseInt(offsetEl.style.left, 10) || 0, -parseInt(offsetEl.style.top, 10) || 0]
        } else {
          mapOffset = [-parseInt('0px', 10) || 0, -parseInt('0px', 10) || 0]
        }

        if (pageMaps[gisMapModel.option.mapCellId].mapType == 'GOOGLE_MAP') {
          var swPoint = pageMaps[gisMapModel.option.mapCellId].getBounds().getSouthWest()
			    var nePoint = pageMaps[gisMapModel.option.mapCellId].getBounds().getNorthEast()
			    var topRight = pageMaps[gisMapModel.option.mapCellId].getProjection().lnglatToPixel(nePoint)
			    if (Math.abs(nePoint[0] - swPoint[0]) > 180) {
				    topRight.x = 256 + topRight.x
			    }
			    var bottomLeft = pageMaps[gisMapModel.option.mapCellId].getProjection().lnglatToPixel(swPoint)
			    var scale = Math.pow(2, pageMaps[gisMapModel.option.mapCellId].getZoom())
			    viewportRoot.style.left = (mapOffset[0] + (bottomLeft.x - topRight.x) * scale / 2) + 'px'
			    viewportRoot.style.top = (mapOffset[1] + (topRight.y - bottomLeft.y) * scale / 2) + 'px'
        } else {
          viewportRoot.style.left = mapOffset[0] + 'px'
          viewportRoot.style.top = mapOffset[1] + 'px'
        }

        coordSys.setMapOffset(mapOffset)
        gisMapModel.__mapOffset = mapOffset

        api.dispatchAction({
          type: 'gismapRoam'
        })
      }

      function zoomEndHandler () {
        if (rendering) {
          return
        }
        api.dispatchAction({
          type: 'gismapRoam'
        })
      }

      if (pageMaps[gisMapModel.option.mapCellId].mapType == 'GOOGLE_MAP') {
        // google.maps.event.removeListener(this._oldListner1);
        // google.maps.event.removeListener(this._oldListner2);
        // google.maps.event.removeListener(this._oldListner3);
        // google.maps.event.removeListener(this._oldListner4);
        google.maps.event.removeListener(this._oldListner5)

        // this.listner1 = gismap['originalMap'].addListener('drag', moveHandler);
        // this.listner2 = gismap['originalMap'].addListener('zoom_changed', zoomEndHandler);
        // this.listner3 = gismap['originalMap'].addListener('dragstart', moveHandler);
        // this.listner4 = gismap['originalMap'].addListener('dragend', moveHandler);
        this.listner5 = gismap['originalMap'].addListener('bounds_changed', moveHandler)

        // this._oldListner1 = this.listner1;
        // this._oldListner2 = this.listner2;
        // this._oldListner3 = this.listner3;
        // this._oldListner4 = this.listner4;
        this._oldListner5 = this.listner5
      } else if (pageMaps[gisMapModel.option.mapCellId].mapType == 'BAIDU_MAP') {
        gismap['originalMap'].removeEventListener('moving', this._oldMoveHandler)
        gismap['originalMap'].removeEventListener('zoomend', this._oldZoomEndHandler)
        gismap['originalMap'].addEventListener('moving', moveHandler)
        gismap['originalMap'].addEventListener('zoomend', zoomEndHandler)

        this._oldMoveHandler = moveHandler
        this._oldZoomEndHandler = zoomEndHandler
      } else if (pageMaps[gisMapModel.option.mapCellId].mapType == 'GAODE_MAP') {
        gismap['originalMap'].off('moveend', this._oldMoveHandler)
        gismap['originalMap'].off('zoomend', this._oldZoomEndHandler)

        if (gismap['originalMap'].getViewMode_() == '3D') {
          gismap['originalMap'].off('dragging', this._oldZoomEndHandler)
        }

        gismap['originalMap'].on('moveend', moveHandler)
        gismap['originalMap'].on('zoomend', zoomEndHandler)

        if (gismap['originalMap'].getViewMode_() == '3D') {
          gismap['originalMap'].on('dragging', zoomEndHandler)
        }

        this._oldMoveHandler = moveHandler
        this._oldZoomEndHandler = zoomEndHandler
      }

      var roam = gisMapModel.get('roam')
      if (roam && roam !== 'scale') {
        gismap.setMapStatus({ dragEnable: true })
      } else {
        gismap.setMapStatus({ dragEnable: false })
      }
      if (roam && roam !== 'move') {
        gismap.setMapStatus({
          touchZoom: true,
          scrollWheel: true,
          doubleClickZoom: true
        })
      } else {
        gismap.setMapStatus({
          touchZoom: false,
          scrollWheel: false,
          doubleClickZoom: false
        })
      }

      var originalStyle = gisMapModel.__mapStyle
      var newMapStyle = gisMapModel.get('mapStyle') || '' // mapStyle is a string

      if (newMapStyle && originalStyle != newMapStyle) {
        gismap.setTheme({ mapStyle: newMapStyle })
        gisMapModel.__mapStyle = newMapStyle
      }

      rendering = false
    }
  })

  /**
 * GISMap component extension
 */

  echarts.registerCoordinateSystem('gismap', GISMapCoordSys)

  echarts.registerAction({
    type: 'gismapRoam',
    event: 'gismapRoam',
    update: 'updateLayout'
  }, function (payload, ecModel) {
    ecModel.eachComponent('gismap', function (gisMapModel) {
      var gismap = gisMapModel.getGISMap()
      var center = gismap.getCenter()
      gisMapModel.setCenterAndZoom(center, gismap.getZoom())
    })
  })

  var version = '1.0.0'

  exports.version = version

  Object.defineProperty(exports, '__esModule', { value: true })
}))
