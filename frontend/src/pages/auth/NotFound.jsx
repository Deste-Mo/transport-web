import {Link, Navigate, useNavigate} from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <section className="mt-20">
      <p className="text-center text-black-100 dark:text-black-100 text-title-2">
        {" "}
        404{" "}
      </p>
      <p className="text-black-60 dark:text-white-60 text-center text-subtitle-1">
        Page non trouvée
      </p>
      <p
        onClick={() => navigate("/")}
        className="cursor-pointer text-lead text-primary text-center"
      >
        Retourner à l'accueil
      </p>
    </section>
  );
};

export default NotFound;
