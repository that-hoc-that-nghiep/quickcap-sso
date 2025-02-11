import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom"
import LoginPage from "./pages/login/page"
import HomePage from "./pages/page"

const router = createBrowserRouter([
    {
        path: "/",
        errorElement: <Outlet />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: "/login",
                element: <LoginPage />,
            },
        ],
    },
])

function App() {
    return <RouterProvider router={router} />
}

export default App
