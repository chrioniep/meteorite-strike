import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps"
import { useEffect, useState } from "react";
import { Tooltip } from "react-tooltip";
import { useApiContext } from "../../../contexts/APIcontext.jsx";

const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json"

export const GeoChart = () => {
  const [markers, setMarkers] = useState([])
  const [tooltipContent, setTooltipContent] = useState("")
  const { filteredSearchInput, loading } = useApiContext()

  const getMarkers = () => {
    let arr = []
    filteredSearchInput.forEach(item => {
      arr.push({
        name: item.name,
        recclass: item.recclass,
        mass: item.mass,
        year: new Date(item.year).getFullYear(),
        coordinates: [item.reclong, item.reclat]
      })
    })
    setMarkers(arr)
  }

  useEffect(() => {
    if (filteredSearchInput.length > 0) {
      getMarkers()
    }
  }, [filteredSearchInput])

  const showTooltip = (name, recclass, mass, year) => {
    setTooltipContent(`
      Name: <b>${name}</b> <br/>
      Reclass: <b>${recclass}</b> <br/>
      Mass: <b>${mass}</b> <br/>
      Year: <b>${year}</b>
    `)
  }

  return (
    <>
      {!loading && (
        <div>
          <ComposableMap>
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography key={geo.rsmKey} geography={geo} />
                ))
              }
            </Geographies>
            {markers.map(({ name, recclass, mass, year, coordinates }) => (
              coordinates[0] !== undefined && (
                <Marker
                  key={name}
                  coordinates={coordinates}
                  className="my-anchor-element"
                  data-tooltip-html={tooltipContent}
                  onMouseEnter={() => {
                    showTooltip(name, recclass, mass, year)
                  }}
                  onMouseLeave={() => {
                    setTooltipContent("");
                  }}
                >
                  <circle r={5} fill="#F00" stroke="#fff" strokeWidth={2} />
                </Marker>
              )
            ))}
          </ComposableMap>
          <Tooltip anchorSelect=".my-anchor-element" place="top" />
        </div>
      )}
    </>

  )
}