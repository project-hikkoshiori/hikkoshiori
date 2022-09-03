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
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Tooltip as TooltipChakra,
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

type Props = {
  rentRangeState: number[];
  setRentRangeState: (arg: number[]) => void;
};

export const PropertyRentHist = ({
  rentRangeState,
  setRentRangeState,
}: Props) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  };

  const labels = [];
  const MIN = 0;
  const MAX = 70000;
  const RANGE = 1000;
  for (var i = MIN; i <= MAX - RANGE; i += 1000) {
    labels.push(i);
  }
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
      <TooltipChakra
        placement="right"
        label={String(rentRangeState[0] + "~" + String(rentRangeState[1]))}
      >
        <Box pl="5%" pr="2%">
          <RangeSlider
            colorScheme="brand"
            min={MIN}
            max={MAX}
            step={RANGE}
            defaultValue={[MIN, MAX]}
            onChangeEnd={(val) => setRentRangeState(val)}
          >
            <RangeSliderTrack>
              <RangeSliderFilledTrack />
            </RangeSliderTrack>
            <RangeSliderThumb index={0} />
            <RangeSliderThumb index={1} />
          </RangeSlider>
        </Box>
      </TooltipChakra>
    </Box>
  );
};
