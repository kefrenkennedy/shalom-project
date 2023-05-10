import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  colors: {
    gray: {
      "900": "#181B23",
      "800": "#1F2029",
      "700": "#353646",
      "600": "#4B4D63",
      "500": "#616480",
      "400": "#797D9A",
      "300": "#9699B0",
      "200": "#B3B5C6",
      "100": "#D1D2DC",
      "50": "#EEEEF2",
    },
    green: {
      "200": "#008c6e",
      "500": "#009f00",
      "700": "#00596a",
    },
    orange: {
      "500": "#ff2a00",
    },
    yellow: {
      "300": "#ffb329",
      "400": "rgba(250, 158, 37, 1)",
      "500": "#ff9b23",
    },
  },
  fonts: {
    heading: "Roboto",
    body: "Roboto",
  },
  styles: {
    global: {
      body: {
        bg: "gray.50",
        color: "gray.900",
      },
    },
  },
});
