
import {Outlet} from "react-router-dom";
import Profile from "../pages/profile/Profile.jsx";
import {appVariants} from "../animations/variants.js";
import {motion} from "framer-motion";

const ProfileLayout = () => {
    return (
        <motion.section className='flex items-start  w-full justify-between nav-page-container h-[86vh]' variants={appVariants} initial="hidden" whileInView="visible" viewport={{once : true}}>
            <div
                className='w-full basis-[46%] overflow-x-hidden scrollbar-none rounded-xl'>
                <Profile/>
            </div>
            <div
                className='w-full overflow-x-hidden h-full basis-[50%] scrollbar-none'>
                <Outlet/>
            </div>
        </motion.section>
    )
}

export default ProfileLayout;

/*
const DynamicContent = () => {
    const {personalInformation} = useAuth();
    const user = personalInformation;

    const {friends, handleFriends, countFollow, handleCountFollow} = useApp();

    const [update, setUpdate] = useState(false)

    const onClick = () => {
        setUpdate(true)
    }

    const annuler = () => {
        setUpdate(false)
    }

    useEffect(() => {
        handleFriends();
        handleCountFollow();
    }, [friends, handleFriends]);
    return (
        <>
            {update ? <ProfileEdit onClick={annuler}/> : <Offer/>}
        </>
    )
} */
