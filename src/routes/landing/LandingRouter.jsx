import AboutHPC from "../../views/landing/about/hpc/AboutHPC";
import SectionLanding from "../../views/landing/section/SectionLanding";

export const LandingRouter = [
    { path: "/", exact: true, name: "Landing", component: SectionLanding },
    { path: "/tentang/hpc", exact: true, name: "Landing About HPC", component: AboutHPC },
]