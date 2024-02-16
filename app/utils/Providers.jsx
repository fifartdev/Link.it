import { AuthProvider } from "./AuthContext"

export const Providers = ({children}) => {
return (

    <AuthProvider>
        {children}
    </AuthProvider>
)

}