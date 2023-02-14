import { useParams } from "react-router";

interface CoinParams {
  coinId: string;
}

function Coin() {
  const { coinId } = useParams<CoinParams>();
  return <h1>{coinId}</h1>;
}
export default Coin;
