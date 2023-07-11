import { useQuery } from "react-query";
import { Helmet } from "react-helmet";
import { Link, Outlet, useLocation, useMatch, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { fetchCoinInfo, fetchCoinTickers } from "../api";

const Container = styled.div`
    padding: 0 1.6rem;
    max-width: 30rem;
    margin: 0 auto;
`;

const Header = styled.header`
    height: 15vh;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 600;
    position: relative;
    a {
        position: absolute;
        left: 0.7rem;
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

const DetailContainer = styled.main`
    display: flex;
    flex-direction: column;
    gap: 1.1rem;
    margin-bottom: 3rem;
`;

const Overview = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: ${props => props.theme.cardBgColor};
    box-shadow: 0 0.2rem 0.5rem rgba(0, 0, 0, 0.1);
    padding: 0.9rem 2.5rem;
    border-radius: 0.7rem;
`;

const OverviewItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    span:first-child {
        font-size: 0.7rem;
        font-weight: 600;
        margin-bottom: 0.5rem;
        color: #989898;
    }
`;

const Description = styled.p`
    line-height: 1.4;
    background-color: ${(props)=> props.theme.greyColor};
    padding: 1rem;
    border-radius: 0.7rem;
`;

const Tabs = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.6rem;
    margin: 0.4rem 0;
`;

const Tab = styled.span<{ isActive: boolean }>`
    text-align: center;
    text-transform: uppercase;
    font-weight: ${(props) => props.isActive ? "600" : "400"};
    color: ${(props) =>
        props.isActive ? props.theme.accentColor : props.theme.textColor};
    background-color: ${(props) => props.isActive ? "rgba(82, 82, 237, 0.25)" : ""};
    padding: 1rem;
    border-radius: 1.5rem;
    transition: 0.1s;
    a {
        display: block;
    }
`;

interface LocationState {
    state: {
        name: string;
    }
}

interface ITag {
    coin_counter: number;
    ico_counter: number;
    id: string;
    name: string;
}

interface InfoData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
    contract: string;
    platform: string;
    contracts: object;
    logo: string;
    parent: object;
    tags: ITag[];
    team: object;
    description: string;
    message: string;
    open_source: boolean;
    started_at: string;
    development_status: string;
    hardware_wallet: boolean;
    proof_type: string;
    org_structure: string;
    hash_algorithm: string;
    links: object;
    links_extended: object;
    whitepaper: object;
    first_data_at: string;
    last_data_at: string;
}

export interface PriceData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    beta_value: number;
    first_data_at: string;
    last_updated: string;
    quotes: {
        USD: {
            ath_date: string;
            ath_price: number;
            market_cap: number // 총 시가(시가 총액)
            market_cap_change_24h: number; // 시총 가격 변동률
            percent_change_1h: number;
            percent_change_1y: number;
            percent_change_6h: number;
            percent_change_7d: number;
            percent_change_12h: number;
            percent_change_15m: number;
            percent_change_24h: number;
            percent_change_30d: number;
            percent_change_30m: number;
            percent_from_price_ath: number;
            price: number; // 현재 시세
            volume_24h: number; // 지난 24시간 거래량
            volume_24h_change_24h: number; // 지난 24시간 거래 변동률
        }
    };
}

function Coin() {
    const { coinId } = useParams();
    const { state } = useLocation() as LocationState;
    const priceMatch = useMatch("/:coinId/price");
    const chartMatch = useMatch("/:coinId/chart");

    // React Query
    const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(
        ["info", coinId], () => fetchCoinInfo(coinId!));
    const { isLoading: tickersLoading, data: tickersData } = useQuery<PriceData>(
        ["tickers", coinId],
        () => fetchCoinTickers(coinId!),
        { refetchInterval: 5000 });
    const loading = infoLoading || tickersLoading;
    return (
        <Container>
            <Helmet>
                <title>{state?.name ? state.name : loading ? "Loading..." : infoData?.name}</title>
            </Helmet>
            <Header>
                <Link to={`/`}>
                    <FontAwesomeIcon icon={faArrowLeft} size="2xl" />
                </Link>
                <Title>{state?.name ? state.name : loading ? "Loading..." : infoData?.name}</Title>
            </Header>
            {loading ? <Loader>Loading...</Loader> : (
                <>
                    <DetailContainer>
                        <Overview>
                            <OverviewItem>
                                <span>순위</span>
                                <span>{infoData?.rank}</span>
                            </OverviewItem>
                            <OverviewItem>
                                <span>기호</span>
                                <span>{infoData?.symbol}</span>
                            </OverviewItem>
                            <OverviewItem>
                                <span>가격(USD)</span>
                                <span>${tickersData?.quotes.USD.price.toFixed(3)}</span>
                            </OverviewItem>
                        </Overview>
                        <Description>{infoData?.description}</Description>
                        <Overview>
                            <OverviewItem>
                                <span>총 발행량</span>
                                <span>{Number(tickersData?.total_supply).toLocaleString()}</span>
                            </OverviewItem>
                            <OverviewItem>
                                <span>최대 발행량</span>
                                <span>{Number(tickersData?.max_supply).toLocaleString()}</span>
                            </OverviewItem>
                        </Overview>
                        <Overview>
                            <OverviewItem>
                                <span>유통량</span>
                                <span>{Number(tickersData?.circulating_supply).toLocaleString()}</span>
                            </OverviewItem>
                            <OverviewItem>
                                <span>시가 총액</span>
                                <span>${Number(tickersData?.quotes.USD.market_cap).toLocaleString()}</span>
                            </OverviewItem>
                        </Overview>

                        <Tabs>
                            <Tab isActive={priceMatch !== null}>
                                <Link to={`/${coinId}/price`}>Price</Link>
                            </Tab>
                            <Tab isActive={chartMatch !== null}>
                                <Link to={`/${coinId}/chart`}>Chart</Link>
                            </Tab>
                        </Tabs>

                        <Outlet context={{coinId, tickersData}} />
                    </DetailContainer>
                </>
            )}
        </Container>
    );
}

export default Coin;