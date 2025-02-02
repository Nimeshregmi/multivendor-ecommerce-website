"use client"

import jsVectorMap from "jsvectormap"
import type React from "react"
import { useEffect } from "react"
import "./js/us-aea-en"

const MapOne: React.FC = () => {
  useEffect(() => {
    const mapElement = document.getElementById("mapOne")

    if (!mapElement) {
      console.error("Map element not found")
      return
    }

    const vectorMapOne = new jsVectorMap({
      selector: "#mapOne",
      map: "us_aea_en",
      zoomButtons: true,

      regionStyle: {
        initial: {
          fill: "#808080",
        },
        hover: {
          fillOpacity: 1,
          fill: "#3056D3",
        },
      },
      regionLabelStyle: {
        initial: {
          fontFamily: "Satoshi",
          fontWeight: "semibold",
          fill: "#00FF00",
        },
        hover: {
          cursor: "pointer",
        },
      },

      labels: {
        regions: {
          render(code: string) {
            return code.split("-")[1]
          },
        },
      },
    })

    return () => {
      if (vectorMapOne) {
        vectorMapOne.destroy()
      } else {
        console.error("Vector map instance not found during cleanup")
      }
    }
  }, [])

  return (
    <div className="col-span-12 rounded-lg bg-white p-7 shadow-md dark:bg-gray-800 dark:shadow-xl xl:col-span-7">
      <h4 className="mb-7 text-2xl font-bold text-gray-900 dark:text-white">Region labels</h4>
      <div className="h-[422px]">
        <div id="mapOne" className="w-full h-full"></div>
      </div>
    </div>
  )
}

export default MapOne

