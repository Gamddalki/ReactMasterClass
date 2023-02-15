import { useQuery } from "react-query";
import { fetchPriceHistory } from "../api";
import ApexChart from "react-apexcharts";

interface ChartProps {
  coinId: string;
}
interface IPriceHistory {
  time_open: string;
  time_close: string;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: string;
}

function Chart({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<IPriceHistory[]>(
    ["priceHistory", coinId],
    () => fetchPriceHistory(coinId)
  );
  return (
    <div>
      {isLoading ? (
        "Loading..."
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
              data:
                data?.map((price) => ({
                  x: new Date(
                    parseFloat(price.time_close) * 1000
                  ).toISOString(),
                  y: [
                    parseFloat(price.open),
                    parseFloat(price.high),
                    parseFloat(price.low),
                    parseFloat(price.close),
                  ],
                })) ?? [],
            },
          ]}
          options={{
            plotOptions: {
              candlestick: {
                colors: {
                  upward: "#eb4d4b",
                  downward: "#686de0",
                },
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
