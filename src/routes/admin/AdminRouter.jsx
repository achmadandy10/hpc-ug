import CategoryList from "../../views/admin/category_list/CategoryList";
import Dashboard from "../../views/admin/dashboard/Dashboard";
import PostAdd from "../../views/admin/post_add/PostAdd";
import PostEdit from "../../views/admin/post_edit/PostEdit";
import PostList from "../../views/admin/post_list/PostList";
import PostPreview from "../../views/admin/post_preview/PostPreview";
import ProposalList from "../../views/admin/proposal_list/ProposalList";

export const AdminRouter = [
    { path: "/admin", exact: true, name: "Admin" },
    { path: "/admin/dasbor", exact: true, name: "Admin Dashboard", component: Dashboard },
    { path: "/admin/buat-konten", exact: true, name: "Admin Post Add", component: PostAdd },
    { path: "/admin/konten", exact: true, name: "Admin Post List", component: PostList },
    { path: "/admin/konten/ubah", exact: true, name: "Admin Post Edit", component: PostEdit },
    { path: "/admin/konten/pratinjau", exact: true, name: "Admin Post Preview", component: PostPreview },
    { path: "/admin/kategori", exact: true, name: "Admin Category List", component: CategoryList },
    { path: "/admin/usulan", exact: true, name: "Admin Proposal List", component: ProposalList },
]