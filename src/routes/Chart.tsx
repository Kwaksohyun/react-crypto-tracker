import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import styled from "styled-components";
import { lightTheme } from "../theme";
import { useRecoilValue } from 'recoil';
import { isDarkAtom } from '../atoms';

const Loader = styled.span`
    text-align: center;
    display: block;
`;

interface IHistorical {
    time_open: number;
    time_close: number;
    open: string;
    high: string;
    low: string;
    close: string; 
    volume: string;
    market_cap: number;
}

interface ChartProps {
    coinId: string;
}

function Chart() {
    const { coinId } = useOutletContext<ChartProps>();
    const isDark = useRecoilValue(isDarkAtom);
    // React Query
    const { isLoading, data } = useQuery<IHistorical[]>(
        ["ohlcv", coinId],() => fetchCoinHistory(coinId), { refetchInterval: 10000 }
    );

    let validData = data ?? [];
    if("error" in validData) {
        validData = [];
    }
    return (
        <div>
            {isLoading ? <Loader>Loading Chart...</Loader> : (
                <div>
                    <ApexChart type="line" 
                                series={[
                                    { name: "Price", data: validData?.map(price => parseFloat(price.close)) ?? [] }
                                ]}
                                options={{
                                    noData: {
                                        text: "차트 데이터가 없습니다.",
                                        align: 'center',
                                        verticalAlign: 'middle',
                                        offsetX: 0,
                                        offsetY: 0,
                                        style: {
                                            color: lightTheme.textColor,
                                            fontSize: "16px"
                                        }
                                    },
                                    theme: {mode: isDark ? "dark" : "light"},
                                    chart: {
                                        height: 300, toolbar: {show:false},
                                        background:"transparent"
                                    },
                                    grid: {show:false},
                                    stroke: {curve: "smooth"},
                                    yaxis: {show: false},
                                    xaxis: { 
                                        // axisBorder: { show: false},
                                        axisTicks: {show: false},
                                        labels: {show:false},
                                        type: "datetime",
                                        categories: validData?.map(price => new Date(price.time_close*1000).toUTCString())
                                    },
                                    fill: { 
                                        type:"gradient", 
                                        gradient: {gradientToColors:["#0be881"], stops: [0, 100]}
                                    },
                                    colors: ["#0fbcf9"],
                                    tooltip: {
                                        y: {
                                            formatter: (value) => `$${value.toFixed(2)}`
                                        }
                                    }
                                }} />
                    <ApexChart type="candlestick"
                                series={[ 
                                    {   name: "Price",
                                        data: validData?.map((price) => ({
                                            x: new Date(price.time_close*1000),
                                            y: [Number(price.open), Number(price.high), Number(price.low), Number(price.close)] 
                                        })) ?? []
                                    }
                                ]}
                                options={{
                                    noData: {text: "차트 데이터가 없습니다."},
                                    theme: {mode: isDark ? "dark" : "light"},
                                    chart: {type: 'candlestick', height: 350, toolbar: {show:false}},
                                    xaxis: {
                                        type: 'datetime',
                                        categories: validData?.map(price => new Date(price.time_close*1000).toUTCString())
                                    },
                                }} />
                </div> )}
        </div>
    )
}

export default Chart;