import type { ApexOptions } from "apexcharts"
import type React from "react"
import ReactApexChart from "react-apexcharts"
import DefaultSelectOption from "./DefaultSectionOptions"

const ChartThree: React.FC = () => {
  const series = [65, 34, 12, 56]

  const options: ApexOptions = {
    chart: {
      fontFamily: "Inter, sans-serif",
      type: "donut",
    },
    colors: ["#5750F1", "#5475E5", "#8099EC", "#ADBCF2"],
    labels: ["Desktop", "Tablet", "Mobile", "Unknown"],
    legend: {
      show: false,
      position: "bottom",
    },
    plotOptions: {
      pie: {
        donut: {
          size: "80%",
          background: "transparent",
          labels: {

            show: true,
            total: {
              show: true,
              showAlways: true,
              label: "Visitors",
              fontSize: "16px",
              fontWeight: "400",
              color: "#5750F1",
            },
            value: {
              show: true,
              fontSize: "28px",
              fontWeight: "bold",
              color: "#00ff00",

            },
          },
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    responsive: [
      {
        breakpoint: 2600,
        options: {
          chart: {
            width: 415,
          },
        },
      },
      {
        breakpoint: 640,
        options: {
          chart: {
            width: 200,
          },
        },
      },
    ],
  }

  return (
    <div className="col-span-12 rounded-lg bg-white p-6 shadow-md dark:bg-gray-800 dark:shadow-xl xl:col-span-5">
      <div className="mb-8 flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h4 className="text-2xl font-bold text-gray-900 dark:text-white">Used Devices</h4>
        </div>
        <div>
          <DefaultSelectOption options={["Monthly", "Yearly"]} />
        </div>
      </div>

      <div className="mb-8">
        <div className="mx-auto flex justify-center text-black dark:text-white">
          <ReactApexChart options={options} series={series}  type="donut" />
        </div>
      </div>

      <div className="mx-auto w-full max-w-sm">
        <div className="flex flex-wrap items-center justify-center gap-4">
          <DeviceItem color="bg-blue-600" label="Desktop" percentage={65} />
          <DeviceItem color="bg-blue-400" label="Tablet" percentage={34} />
          <DeviceItem color="bg-blue-300" label="Mobile" percentage={12} />
          <DeviceItem color="bg-blue-200" label="Unknown" percentage={56} />
        </div>
      </div>
    </div>
  )
}

interface DeviceItemProps {
  color: string
  label: string
  percentage: number
}

const DeviceItem: React.FC<DeviceItemProps> = ({ color, label, percentage }) => (
  <div className="w-full sm:w-1/2 px-4">
    <div className="flex w-full items-center">
      <span className={`mr-2 block h-3 w-3 rounded-full ${color}`}></span>
      <p className="flex w-full justify-between text-sm font-medium text-black dark:text-gray-300">
        <span>{label}</span>
        <span>{percentage}%</span>
      </p>
    </div>
  </div>
)

export default ChartThree

