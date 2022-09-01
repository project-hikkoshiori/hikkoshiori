import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import {
  Box,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from "@chakra-ui/react";
const faker = require("faker");

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const PropertyRentHist = () => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  };
  const labels = [
    "~9999",
    "~19999",
    "~29999",
    "~39999",
    "~49999",
    "~59999",
    "~69999",
  ];
  const data = {
    labels,
    datasets: [
      {
        label: "件数",
        data: labels.map(() => faker.datatype.number({ min: 0, max: 100 })), // 適当なテストデータ作ってる
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  return (
    <Box>
      <Bar options={options} data={data} />
      <Slider
        defaultValue={10000}
        min={0}
        max={70000}
        step={10000}
        colorScheme="brand"
        onChangeEnd={(val) => console.log(val)}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
    </Box>
  );
};
