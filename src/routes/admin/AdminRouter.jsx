import AboutAdd from "../../views/admin/about_add/AboutAdd";
import AboutEdit from "../../views/admin/about_edit/AboutEdit";
import AboutList from "../../views/admin/about_list/AboutList";
import AboutPreview from "../../views/admin/about_preview/AboutPreview";
import CategoryList from "../../views/admin/category_list/CategoryList";
import Dashboard from "../../views/admin/dashboard/Dashboard";
import FacilityEdit from "../../views/admin/facility_edit/FacilityEdit";
import FacilityList from "../../views/admin/facility_list/FacilityList";
import PostAdd from "../../views/admin/post_add/PostAdd";
import PostEdit from "../../views/admin/post_edit/PostEdit";
import PostList from "../../views/admin/post_list/PostList";
import PostPreview from "../../views/admin/post_preview/PostPreview";
import ProposalList from "../../views/admin/proposal_list/ProposalList";
import ProposalPreview from "../../views/admin/proposal_preview/ProposalPreview";
import ServiceAdd from "../../views/admin/service_add/ServiceAdd";
import ServiceEdit from "../../views/admin/service_edit/ServiceEdit";
import ServiceList from "../../views/admin/service_list/ServiceList";
import ServicePreview from "../../views/admin/service_preview/ServicePreview";

export const AdminRouter = [
    { path: "/admin", exact: true, name: "Admin" },
    { path: "/admin/dasbor", exact: true, name: "Admin Dashboard", component: Dashboard },
    { path: "/admin/buat-konten", exact: true, name: "Admin Post Add", component: PostAdd },
    { path: "/admin/konten", exact: true, name: "Admin Post List", component: PostList },
    { path: "/admin/konten/ubah", exact: true, name: "Admin Post Edit", component: PostEdit },
    { path: "/admin/konten/pratinjau", exact: true, name: "Admin Post Preview", component: PostPreview },
    { path: "/admin/kategori", exact: true, name: "Admin Category List", component: CategoryList },
    { path: "/admin/usulan", exact: true, name: "Admin Proposal List", component: ProposalList },
    { path: "/admin/usulan/pratinjau/:id", exact: true, name: "Admin Proposal Preview", component: ProposalPreview },
    { path: "/admin/buat-tentang", exact: true, name: "Admin About Add", component: AboutAdd },
    { path: "/admin/tentang", exact: true, name: "Admin About List", component: AboutList },
    { path: "/admin/tentang/ubah", exact: true, name: "Admin About Edit", component: AboutEdit },
    { path: "/admin/tentang/pratinjau", exact: true, name: "Admin About Preview", component: AboutPreview },
    { path: "/admin/buat-layanan", exact: true, name: "Admin Service Add", component: ServiceAdd },
    { path: "/admin/layanan", exact: true, name: "Admin Service List", component: ServiceList },
    { path: "/admin/layanan/ubah", exact: true, name: "Admin Service Edit", component: ServiceEdit },
    { path: "/admin/layanan/pratinjau", exact: true, name: "Admin Service Preview", component: ServicePreview },
    { path: "/admin/fasilitas", exact: true, name: "Admin Facility List", component: FacilityList },
    { path: "/admin/fasilitas/ubah/:id", exact: true, name: "Admin Facility Edit", component: FacilityEdit },
]