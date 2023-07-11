import { BrowserRouter, Routes, Route } from "react-router-dom";
import Coin from "./routes/Coin"; 
import Coins from "./routes/Coins"; 
import Price from "./routes/Price";
import Chart from "./routes/Chart";

function Router() {
    return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes>
            <Route path="/" element={<Coins />} />
            <Route path="/:coinId" element={<Coin />}>
                <Route path="price" element={<Price />} />
                <Route path="chart" element={<Chart />} />
            </Route>
        </Routes>
    </BrowserRouter>
    );
}

export default Router;

// import { createBrowserRouter } from "react-router-dom";
// import Root from "./App";

// const router = createBrowserRouter([
//     {
//         path: "/",
//         element: <Root />,
//         children: [
//             {
//                 path: "",
//             },
//         ],
//     }
// ]);

// export default router;

