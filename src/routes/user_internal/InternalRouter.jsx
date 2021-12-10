import { lazy } from "react"

const Dashboard = lazy(() => import("../../views/users/user_internal/dashboard/Dashboard"))

const InternalRouter = [
    { path: "/internal", exact: true, name: "User Internal" },
    { path: "/internal/dashboard", exact: true, name: "User Internal Dashboard", component: Dashboard },
]