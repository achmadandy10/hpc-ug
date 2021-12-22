import CategoryList from "../../views/admin/category_list/CategoryList";
import Dashboard from "../../views/admin/dashboard/Dashboard";
import PostAdd from "../../views/admin/post_add/PostAdd";
import PostList from "../../views/admin/post_list/PostList";
import ProposalList from "../../views/admin/proposal_list/ProposalList";

export const AdminContentRouter = [
    { path: "/admin", exact: true, name: "Admin" },
    { path: "/admin/dasbor", exact: true, name: "Admin Dashboard", component: Dashboard },
    { path: "/admin/buat-konten", exact: true, name: "Admin Post Add", component: PostAdd },
    { path: "/admin/daftar-konten", exact: true, name: "Admin Post List", component: PostList },
    { path: "/admin/daftar-kategori", exact: true, name: "Admin Category List", component: CategoryList },
    { path: "/admin/daftar-usulan", exact: true, name: "Admin Proposal List", component: ProposalList },
]

export const AdminProposalRouter = [
    { path: "/admin", exact: true, name: "Admin" },
    { path: "/admin/dasbor", exact: true, name: "Admin Dashboard", component: Dashboard },
    { path: "/admin/buat-konten", exact: true, name: "Admin Post Add", component: PostAdd },
    { path: "/admin/daftar-konten", exact: true, name: "Admin Post List", component: PostList },
    { path: "/admin/daftar-kategori", exact: true, name: "Admin Category List", component: CategoryList },
    { path: "/admin/daftar-usulan", exact: true, name: "Admin Proposal List", component: ProposalList },
]

export const AdminSuperRouter = [
    { path: "/admin", exact: true, name: "Admin" },
    { path: "/admin/dasbor", exact: true, name: "Admin Dashboard", component: Dashboard },
    { path: "/admin/buat-konten", exact: true, name: "Admin Post Add", component: PostAdd },
    { path: "/admin/daftar-konten", exact: true, name: "Admin Post List", component: PostList },
    { path: "/admin/daftar-kategori", exact: true, name: "Admin Category List", component: CategoryList },
    { path: "/admin/daftar-usulan", exact: true, name: "Admin Proposal List", component: ProposalList },
]