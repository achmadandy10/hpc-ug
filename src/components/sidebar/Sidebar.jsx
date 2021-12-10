const UserInternal = () => {
    return (
        <>test</>
    )
}

const Sidebar = ({ type }) => {
    if (type === "user internal") {
        return <UserInternal/>
    }
}

export default Sidebar