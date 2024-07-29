import { useNavigate } from "react-router-dom";
import { useApp } from "../../../context/AppPorvider";
import { useEffect } from "react";
import Button from "../../ui/Button";

const ProfileCard = ({
  name,
  account,
  profile = false,
  email,
  image,
  phone,
  date,
  onClick,
  forCurrentUser = false,
}) => {
  const navigate = useNavigate();

  const { countFollow, handleCountFollow } = useApp();

  useEffect(() => {
    handleCountFollow();
  }, [countFollow, handleCountFollow]);

  return (
    <div className="flex flex-col gap-6 rounded-xl shadow-sm border border-black-0 p-4 bg-white-100 w-full">
      <div className="flex justify-between items-start">
        <i className="disabled:bi-0-circle"></i>
        <div className="flex flex-col items-center justify-center gap-4">
          <img
            src={image}
            alt=""
            className={`${
              profile ? "size-[128px]" : "size-[84px]"
            } bg-black-20 rounded-full`}
          />
          <div className="flex flex-col gap-1 items-center justify-center text-lead">
            <span>{name}</span>
            <span className="text-black-60 text-small-1 font-light">
              {account}
            </span>
          </div>
        </div>
        <i className="bi bi-three-dots-vertical"></i>
      </div>
      <div
        className={`flex w-full text-base text-black-100 
           items-center justify-between
        `}
      >
        <div className="flex items-center gap-2">
          <i className="bi bi-envelope-at"></i>
          <span>{email}</span>
        </div>

        <div className="flex items-center  gap-2">
          <i className="bi bi-phone-flip"></i>
          <span>{phone}</span>
        </div>

        <div className="flex items-center  gap-2">
          <i className="bi bi-calendar"></i>
          <span>{date}</span>
        </div>
      </div>

      {forCurrentUser ? (
        <Button
          block
          size="md"
          icon="bi bi-pencil"
          onClick={() => navigate(`profile/edit/`)}
        >
          Modifier les informations
        </Button>
      ) : (
        <Button
          block
          size="md"
          icon="bi bi-plus-lg"
          onClick={() => {}}
        >
          Ajouter
        </Button>
      )}
    </div>
  );
};
export default ProfileCard;
