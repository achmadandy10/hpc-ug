import Dashboard from "../../views/admin/dashboard/Dashboard";
import PostAdd from "../../views/admin/post_add/PostAdd";
import PostList from "../../views/admin/post_list/PostList";

export const AdminRouter = [
    { path: "/admin", exact: true, name: "Admin" },
    { path: "/admin/dasbor", exact: true, name: "Admin Dashboard", component: Dashboard },
    { path: "/admin/buat-konten", exact: true, name: "Admin Post Add", component: PostAdd },
    { path: "/admin/daftar-konten", exact: true, name: "Admin Post List", component: PostList },
]