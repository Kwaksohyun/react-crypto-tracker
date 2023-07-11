import { Link } from "react-router-dom";
import styled from "styled-components";
import { useQuery } from "react-query";
import { fetchCoins } from "../api";
import { Helmet } from "react-helmet";

const Container = styled.div`
    padding: 0rem 1.6rem;
    max-width: 30rem;
    margin: 0 auto;
`;

const Header = styled.header`
    height: 15vh;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 600;
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
    background-color: ${props => props.theme.cardBgColor};
    color: ${props => props.theme.textColor};
    font-weight: 400;
    font-size: 1.1rem;
    border-radius: 1rem;
    margin-bottom: 1.2rem;
    box-shadow: 0 0.2rem 0.7rem rgba(0, 0, 0, 0.1);
    a {
        display: flex;
        align-items: center;
        padding: 1rem;
        transition: color 0.2s ease-in;
    }
    &:hover {
        a {
            color: ${props => props.theme.accentColor};
        }
    }
`;

const Title = styled.h1`
    font-size: 2.6rem;
    color: ${props => props.theme.accentColor};
`;

const Loader = styled.span`
    text-align: center;
    display: block;
`;

const Img = styled.img`
    width: 2.1rem;
    height: 2.1rem;
    margin-right: 0.8rem;
`;

interface ICoin {
    id: string,
    name: string,
    symbol: string,
    rank: number,
    is_new: boolean,
    is_active: boolean,
    type: string,
};

function Coins() {
    // React Query
    const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);
    return (
        <Container>
            <Helmet>
                <title>Crypto Tracker</title>
            </Helmet>
            <Header>
                <Title>Crypto Tracker</Title>
            </Header>
            {isLoading ? <Loader>Loading...</Loader> : (
                <CoinsList>
                    {data?.slice(0, 100).map((coin)=> (
                        <Coin key={coin.id}>
                            <Link to={`/${coin.id}/price`} state={{name: coin.name}}>
                                <Img src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`} />
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