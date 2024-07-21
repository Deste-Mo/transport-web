import {Link, Navigate, useNavigate} from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();
  return (
    <section className="mt-20">
      <p className="text-center text-black-100 dark:text-black-100 text-title-2">
        {" "}
        401{" "}
      </p>
      <p className="text-black-60 dark:text-white-60 text-center text-subtitle-1">
        Unauthorized
      </p>
      <p
        onClick={() => navigate("/")}
        className="cursor-pointer text-lead text-primary text-center"
      >
        Return Back
      </p>
    </section>
  );
};

export default Unauthorized;
