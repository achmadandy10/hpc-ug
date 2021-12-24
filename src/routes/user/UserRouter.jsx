import Dashboard from "../../views/user/dashboard/Dashboard";
import Profile from "../../views/user/profile/Profile";
import ProposalSubmission from "../../views/user/proposal_submission/ProposalSubmission";

export const UserRouter = [
    { path: "/user", exact: true, name: "User" },
    { path: "/user/dasbor", exact: true, name: "User Dashboard", component: Dashboard },
    { path: "/user/pengajuan-usulan", exact: true, name: "User Proposal Submission", component: ProposalSubmission },
    { path: "/user/profil", exact: true, name: "User Profile", component: Profile },
]