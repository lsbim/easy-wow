import MplusDefPage from "../pages/mplus/MplusDefPage";

const { Suspense, lazy } = require("react");
const { createBrowserRouter } = require("react-router-dom");

const Index = lazy(() => import("../pages/IndexPage"));
const MplusIndex = lazy(() => import("../pages/mplus/MplusIndexPage"));
const MplusDef = lazy(() => import("../pages/mplus/MplusDefPage"));

// suspense => 컴포넌트 로딩 전까지(비동기) 보여줄 화면(fallback).
const router = createBrowserRouter([
    {
        path: "",
        element: <Suspense><MplusIndex /></Suspense>
    },
    {
        path: "mplus/:dungeonId/:spec",
        element: <Suspense><MplusDefPage /></Suspense>
    }
])

export default router;