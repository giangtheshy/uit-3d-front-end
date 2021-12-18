import React, { useEffect, useRef } from "react";
import { loadModules } from "esri-loader";
import { useSelector } from "react-redux";

const RenderMap = () => {
  const data = useSelector((state) => state.data);
  const mapEl = useRef(null);

  useEffect(() => {
    let view;
    loadModules(
      [
        "esri/Map",
        "esri/views/SceneView",
        "esri/layers/GeoJSONLayer",
        "esri/layers/SceneLayer",
        "esri/layers/GraphicsLayer",
        "esri/Graphic",
        "esri/request",
      ],
      {
        css: true,
      },
    ).then(([Map, SceneView, GeoJSONLayer, SceneLayer, GraphicsLayer, Graphic, esriRequest]) => {
      const listOfLayer = [];

      if (data.length > 0) {
        data.forEach((element) => {
          const geojson = {
            type: "FeatureCollection",
            generator: "overpass-ide",
            copyright: "The data provide by UIT  ",
            timestamp: "2020-08-27T10:45:03Z",
            features: [],
          };
          element.coordinates.forEach((coordinate) => {
            const feature = {
              type: "Feature",
              properties: {
                name: element.block,
              },
              geometry: {
                type:
                  coordinate.type === "MULTILINESTRING"
                    ? element.block === "BLOCK_E"
                      ? "Polygon"
                      : "MultiLineString"
                    : "MultiPolygon",
                coordinates: [],
              },
              id: coordinate.id,
            };
            const partItems = [];
            coordinate.parts.forEach((part) => {
              const pointItems = [];
              part.points.forEach((point) => {
                pointItems.push([point.x, point.y, point.z]);
              });
              if (coordinate.type === "MULTILINESTRING") {
                partItems.push(pointItems);
              } else {
                partItems.push([pointItems]);
              }
            });
            feature.geometry.coordinates = partItems;
            geojson.features.push(feature);
          });
          const blob = new Blob([JSON.stringify(geojson)], {
            type: "application/json",
          });
          const url = URL.createObjectURL(blob);
          let layer;
          if (element.size > 0) {
            layer = new GeoJSONLayer({
              url,
              editingEnabled: true,
              renderer: {
                type: "simple",
                symbol: {
                  type: "polygon-3d",
                  symbolLayers: [
                    {
                      type: "extrude",
                      size: element.size,
                      material: {
                        color: element.color,
                      },
                    },
                  ],
                },
              },
            });
          } else {
            layer = new GeoJSONLayer({
              url,
              editingEnabled: true,
              renderer: {
                type: "simple",
                symbol: {
                  type: "polygon-3d",
                  symbolLayers: [
                    {
                      type: "extrude",
                      material: {
                        color: element.color,
                      },
                    },
                  ],
                },
              },
            });
          }

          listOfLayer.push(layer);
        });
      }

      const map = new Map({
        basemap: "topo-vector",
        ground: "world-elevation",
        layers: listOfLayer, //end layers
      });
      const view = new SceneView({
        container: mapEl.current,
        map: map,
        camera: {
          position: [106.80244882361886, 10.864354686834895, 500],
          heading: 0,
          tilt: 60,
        },
      });

      view.popup.defaultPopupTemplateEnabled = true;
    });
    return () => {
      if (!!view) {
        view.destroy();
        view = null;
      }
    };
  }, [data]);
  return <div style={{ height: "100vh" }} ref={mapEl}></div>;
};

export default RenderMap;
