import Dashboard from "../../views/user/dashboard/Dashboard";
import Profile from "../../views/user/profile/Profile";
import ProposalAdd from "../../views/user/proposal_add/ProposalAdd";
import ProposalEdit from "../../views/user/proposal_edit/ProposalEdit";
import ProposalPreview from "../../views/user/proposal_preview/ProposalPreview";

export const UserRouter = [
    { path: "/user", exact: true, name: "User" },
    { path: "/user/dasbor", exact: true, name: "User Dashboard", component: Dashboard },
    { path: "/user/pengajuan-usulan", exact: true, name: "User Proposal Add", component: ProposalAdd },
    { path: "/user/usulan/ubah/:id", exact: true, name: "User Proposal Edit", component: ProposalEdit },
    { path: "/user/usulan/pratinjau/:id", exact: true, name: "User Proposal Preview", component: ProposalPreview },
    { path: "/user/profil", exact: true, name: "User Profile", component: Profile },
]