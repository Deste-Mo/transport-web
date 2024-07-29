import { Outlet, useParams } from "react-router-dom";
import Profile from "../pages/profile/Profile.jsx";
import { appVariants } from "../animations/variants.js";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthProvider.jsx";

const ProfileLayout = () => {


  return (
    <motion.section
      className="flex items-start  w-full justify-between nav-page-container h-[86vh]"
      variants={appVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="w-full basis-[46%] overflow-x-hidden scrollbar-none rounded-xl">
        <Profile  />
      </div>
      <div className="w-full overflow-x-hidden h-full basis-[50%] scrollbar-none">
        <Outlet />
      </div>
    </motion.section>
  );
};

export default ProfileLayout;
