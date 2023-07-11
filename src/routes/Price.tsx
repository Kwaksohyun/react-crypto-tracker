import { useOutletContext } from "react-router-dom";
import { PriceData } from "./Coin";
import styled from "styled-components";

const PriceChangesContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: minmax(5.3rem, auto);
    gap: 1rem;
`;

const PriceChangesItem = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: ${(props)=> props.theme.cardBgColor};
    padding: 1.1rem 1.3rem;
    border-radius: 0.5rem;
    box-shadow: 0 0.2rem 0.5rem rgba(0, 0, 0, 0.1);
    span:first-child {
        font-size: 0.9rem;
        font-weight: 600;
        color: #989898;
        text-transform: uppercase;
    }
`;

const PriceChangesPercent = styled.span<{textPercent:number}>`
    color: ${(props) => props.textPercent > 0 ? props.theme.upwardColor : props.textPercent===0 ? props.theme.textColor : props.theme.downwardColor};
    font-size: 1.5rem;
    font-weight: 400;
`;

interface PriceProps {
    tickersData: PriceData;
    textPercent: number;
}

function Price() {
    const { tickersData } = useOutletContext<PriceProps>();
    const quotes = tickersData.quotes.USD;
    return (
        <div>
            <PriceChangesContainer>
                <PriceChangesItem>
                    <span>1 Hour</span>
                    <PriceChangesPercent textPercent={quotes.percent_change_1h}>
                        {quotes.percent_change_1h}%
                    </PriceChangesPercent>
                </PriceChangesItem>
                <PriceChangesItem>
                    <span>12 Hour</span>
                    <PriceChangesPercent textPercent={quotes.percent_change_12h}>
                        {quotes.percent_change_12h}%
                    </PriceChangesPercent>
                </PriceChangesItem>
                <PriceChangesItem>
                    <span>24 Hour</span>
                    <PriceChangesPercent textPercent={quotes.percent_change_24h}>
                        {quotes.percent_change_24h}%
                    </PriceChangesPercent>
                </PriceChangesItem>
                <PriceChangesItem>
                    <span>7 Days</span>
                    <PriceChangesPercent textPercent={quotes.percent_change_7d}>
                        {quotes.percent_change_7d}%
                    </PriceChangesPercent>
                </PriceChangesItem>
                <PriceChangesItem>
                    <span>30 Days</span>
                    <PriceChangesPercent textPercent={quotes.percent_change_30d}>
                        {quotes.percent_change_30d}%
                    </PriceChangesPercent>
                </PriceChangesItem>
                <PriceChangesItem>
                    <span>1 Year</span>
                    <PriceChangesPercent textPercent={quotes.percent_change_1y}>
                        {quotes.percent_change_1y}%
                    </PriceChangesPercent>
                </PriceChangesItem>
            </PriceChangesContainer>
        </div>
    )
}

export default Price;