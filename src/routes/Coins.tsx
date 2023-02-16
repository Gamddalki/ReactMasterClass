import { Link } from "react-router-dom";
import styled from "styled-components";
import { useQuery } from "react-query";
import { fetchCoins } from "../api";
import { Helmet } from "react-helmet";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isDarkAtom } from "../atoms";

const Container = styled.div`
  padding: 0 20px;
  max-width: 480px;
  margin: 0 auto;
`;
const Header = styled.header`
  height: 12vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  img {
    width: 25px;
    height: 25px;
    margin-right: 15px;
  }
`;
const Loader = styled.span`
  text-align: center;
  padding-top: 50px;
  display: block;
`;
const CoinsList = styled.ul``;
const Coin = styled.li`
  background-color: ${(props) => props.theme.coinbtnColor};
  color: ${(props) => props.theme.textColor};
  border-radius: 15px;
  margin-bottom: 10px;
  box-shadow: 0px 0px 20px 0px ${(props) => props.theme.coinbtnshadowColor};
  a {
    padding: 20px;
    display: flex;
    align-items: center;
  }
  &:hover {
    background-color: ${(props) => props.theme.coinbtnhoverColor};
    transition: background-color 0.2s ease-in-out;
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Img = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 15px;
`;

const Title = styled.h1`
  font-size: 30px;
  font-weight: 900;
  color: ${(props) => props.theme.accentColor};
`;

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  const isDark = useRecoilValue(isDarkAtom);
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setDarkAtom((prev) => !prev);
  const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);
  return (
    <Container>
      <Helmet>
        <title>코인이얼마인코</title>
      </Helmet>
      <Header>
        <Title>코인이얼마인코</Title>
        {isDark ? (
          <img
            src="https://cdn-icons-png.flaticon.com/512/702/702471.png"
            onClick={toggleDarkAtom}
          />
        ) : (
          <img
            src="https://cdn-icons-png.flaticon.com/512/606/606807.png"
            onClick={toggleDarkAtom}
          />
        )}
      </Header>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinsList>
          {data?.slice(0, 100).map((coin) => (
            <Coin key={coin.id}>
              <Link
                to={{ pathname: `/${coin.id}`, state: { name: coin.name } }}
              >
                <Img
                  src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                />
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  );
}
export default Coins;
