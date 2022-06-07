import React, { useContext, createContext, useState } from 'react'
import {
    Link,
    Route,
    Routes,
    Navigate,
    Outlet,
    useLocation,
    useNavigate,
} from 'react-router-dom'
import './app.css'

const Account = () => {
    return <p> (Protected) Account page</p>
}
const Home = () => {
    return <p> (Protected) Home Page</p>
}
const PageLinks = () => {
    return (
        <div>
            <Link to='/'> Sign In Page</Link>
            <Link to='/home'> Home Page</Link>
            <Link to='/account'> Account Page</Link>
        </div>
    )
}
const SignIn = () => {
    return <p>Sign In Page</p>
}
const Views = () => {
    return (
        <Routes>
            <Route path='/' element={<SignIn />} />
            <Route element={<ProtectedRoutes />}>
                <Route path='/home' element={<Home />} />
                <Route path='/account' element={<Account />} />
            </Route>
        </Routes>
    )
}
const useAuth = () => {
    const { user } = useContext(UserContext)
    return user && user.loggedIn
}

const ProtectedRoutes = () => {
    const location = useLocation()
    const isAuth = useAuth()
    return isAuth ? (
        <Outlet />
    ) : (
        <Navigate to='/' replace state={{ from: location }} />
    )
}

const LogInButtons = () => {
    const { user, setUser } = useContext(UserContext)
    const navigate = useNavigate()
    const location = useLocation()
    return (
        <div>
            <p>{`Logged In: ${user.loggedIn}`}</p>
            <button
                onClick={() => {
                    if (user.loggedIn) return
                    setUser({ loggedIn: true })

                    if (location.state?.from) {
                        navigate(location.state.from)
                    }
                }}
            >
                Log In
            </button>
            <button
                onClick={() => {
                    if (!user.loggedIn) return
                    setUser({ loggedIn: false })
                }}
            >
                Log Out
            </button>
        </div>
    )
}
export const UserContext = createContext()

function App() {
    const [user, setUser] = useState({ loggedIn: false })
    return (
        <UserContext.Provider value={{ user, setUser }}>
            <LogInButtons />
            <PageLinks />
            <Views />
        </UserContext.Provider>
    )
}

export default App
