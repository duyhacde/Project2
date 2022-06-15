import React, {userState, useContext} from 'react'
import {GlobalState} from '../../GlobalState'
import Logo from './icon/logo.JPG'
import Menu from './icon/menu.svg'
import Close from './icon/close.svg'
import Cart from './icon/cart.svg'
import {Link} from 'react-router-dom'
import axios from 'axios'

function Header() {
    const state = useContext(GlobalState)
    const [isLogged, setIsLogged] = state.userAPI.isLogged
    const [isAdmin, setIsAdmin] = state.userAPI.isAdmin

    const logoutUser = async () => { //4:29:00
        await axios.get('/user/logout')
        localStorage.clear()
        setIsAdmin(false)
        setIsLogged(false)
    }

    const adminRouter = () => {
        return (
            <>
                <li><Link to="/create_product">Create Product</Link></li>
                <li><Link to="/category">Categories</Link></li>
            </>
        )
    }

    const loggedRouter = () => {
        return (
            <>
                <li><Link to="/order">Order</Link></li>
                <li><Link to="/" onClick={logoutUser}>Logout</Link></li>
            </>
        )
    }

    console.log(isLogged);

    return (
        <header>
            <div className="menu">
                <img src={Menu} alt="" width="30"/>
            </div>

            <div className="logo">
                <Link to="/">
                    {isAdmin ? <h1>Admin</h1> : <img src={Logo} alt="" width="140px"/>}
                </Link>
            </div>

            <ul>
                <li><Link to="/">{isAdmin ? 'Products' : 'Shop'}</Link></li>
                
                {isAdmin && adminRouter()}

                {
                    isLogged ? loggedRouter() : <li><Link to="/login">Login Register</Link></li>
                }

                <li>
                    <img src={Close} alt="" width="30" className="menu"/>
                </li>
            </ul>
            
            {
                isAdmin ? '' 
                :<div className="cart-icon">
                    <span>1</span>
                    <Link to="/cart">
                        <img src={Cart} alt="" width="30"/>
                    </Link>
                </div> 
            }
        </header>
    )
}

export default Header