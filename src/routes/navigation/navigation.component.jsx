import { Outlet , Link } from "react-router-dom";
import { Fragment } from "react";
import { ReactComponent as Logo } from "../../assets/crown.svg";
import './navigation.styles.scss';
const Navigation = ()=>{
    return(
        <Fragment>
            <div className="navigation">
                <Link className="logo-container" to="/">
                    <Logo className='logo'/>
                </Link>
                
                <div className="nav-links-container">
                    <Link className="nav-link" to="/shop">
                        shop
                    </Link>
                    <Link className="nav-link" to="/signIn">
                        Sign in
                    </Link>
                </div>
            </div>
            <Outlet/>
        </Fragment>
    )
}
export default Navigation;