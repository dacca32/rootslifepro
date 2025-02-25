import { Link, useNavigate } from "@tanstack/react-router";
import AuthService from "../../services/users/auth-service";

const NavbarComponent = () => {

    const navigate = useNavigate();

    return (
        <div>
            <h1>nav</h1>
            <ul>
                <li>
                    <Link to="/users">Users</Link>
                </li>
                <li>
                    <Link to="/settings">Settings</Link>
                </li>
                <li>
                    <button onClick={async () => {
                        await AuthService.logoutUser();
                        navigate({ to: '/login' });
                    }}>Logout</button>
                </li>
            </ul>
        </div>

    )
}

export default NavbarComponent;