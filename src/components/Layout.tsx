import { Navbar } from "./Navbar"

export const Layout: React.FC<{children: React.ReactNode}> = ({children}) => {
    return(
        <>
            {children}
            <Navbar/>
        </>
    )
}