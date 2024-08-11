import {Navigate, useNavigate} from "react-router-dom";

const Forbidden = () => {
  const navigate = useNavigate();
  return (
    <section className="mt-20">
      <p className="text-center text-black-100 dark:text-white-100 text-title-2">
        {" "}
        403{" "}
      </p>
      <p className="text-black-60 dark:text-white-60 text-center text-subtitle-1">
        Forbidden
      </p>
      <p
        onClick={() => navigate("/")}
        className="cursor-pointer text-lead text-primary-100 text-center"
      >
        Return Back
      </p>
    </section>
  );
};

export default Forbidden;
