import Button from '../components/ui/Button';
import {useAuth} from "../context/AuthProvider.jsx";


const Home = ({}) => {
    
    const {infosPersonnel, setAuth} = useAuth();
    const user = infosPersonnel;
    
    const clearLocal = () => {
        localStorage.removeItem('token');
        setAuth(false);
    }

    return (
        <section>
            <h1>Home</h1>
            <div>
                <p>
                    name: {user?.fullName} <br/>
                    account type: {user?.accounttype} <br/>
                </p>
            </div>
            <Button className='p-1 w-[140px] h-[40px] rounded-[0px] mt-3 bg-danger-80'
                    onClick={clearLocal}>Logout</Button>
        </section>
    )
}

export default Home;