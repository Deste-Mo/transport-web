import { useNavigate } from "react-router-dom";
import ProfileImage from "../../../assets/images/OIP.jpg";
import OfferImage from "../../../assets/images/voiture.jpg";
import React, { useState } from "react";
import Button from "../../ui/Button.jsx";
import { Icon } from "../../../styles/components.js";
import OfferDetailBadge from "./OfferDetailBadge.jsx";

const OfferCard = ({ className, saved = false, forCurrentUser = false }) => {
  const [detailed, setDetailed] = useState(true);

  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-start justify-start w-full gap-2">
      <div className="flex items-center gap-x-6 gap-y-2 flex-wrap">
        <OfferDetailBadge text="Transport de marchandise" icon="bi bi-box" />
        <OfferDetailBadge
          text="Fianarantsoa vers Tananarive"
          icon="bi bi-map"
        />
        <OfferDetailBadge
          text=" Prévue le 04 août 2024"
          icon="bi bi-calendar2-event"
        />
        <OfferDetailBadge text="5 Tonnes" icon="bi bi-truck" />
      </div>
      <div
        className={`flex flex-col gap-3 w-full items-center ${className} bg-white-100  dark:bg-black-100 dark:text-white-100 dark:font-sm dark:bg-white-10 dark:border-none rounded-xl p-4 border border-black-0`}
      >
        <div className="w-full flex items-center justify-between rounded-2xl">
          <div className="flex items-center gap-2">
            <img
              className="size-[40px] object-cover rounded-full"
              src={ProfileImage}
            />
            <div className="flex flex-col items-start">
              <p className="text-small-1 font-md">
                RAHARISOA Haingonirina{" "}
              </p>
              <span className=" dark:font-sm text-small-2">Entreprise</span>
              <div className="flex items-center gap-2  dark:text-white-100 text-black-80 ">
                <i className="bi bi-clock"></i>
                <span className="text-small-2  ">
                  Il y a 30 minutes
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 items-center">
            <Icon size="sm" variant="ghost" icon="bi bi-three-dots-vertical" />
          </div>
        </div>
        <div className="w-full flex flex-col gap-4 items-start justify-cente  rounded-2xl  ">
          {detailed && (
            <p className="text-small-1 text-black-100 dark:text-white-100 dark:font-sm ">
              Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet Lorem ipsum
              dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit
              amet, Lorem ipsum dolor{" "}
              <span className="text-primary-80"> #sit amet </span>
              Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet
            </p>
          )}
          <button
            className="flex gap-1 items-center"
            onClick={() => setDetailed((prev) => !prev)}
          >
            {/*<i className={`bi bi-chevron-${detailed ? 'up' : 'down'}`}></i>*/}
            <p className="underline text-small-2 text-black-100 dark:text-white-80">
              {detailed ? "Moin" : "Plus"} de details
            </p>
          </button>
        </div>
        <img
          src={OfferImage}
          className="w-full h-[256px] object-cover rounded-xl"
        />
        {forCurrentUser ? (
          <Button
            size="sm"
            variant="danger"
            icon="bi bi-bookmark-dash"
            rounded="full"
          >
            Supprimer
          </Button>
        ) : (
          <div className="flex items-center w-full gap-6 jusify-start">
            {/*<Icon variant="secondary" icon="bi bi-chat" size="sm"/>*/}
            <Button
              onClick={() => navigate(`discussion`)}
              size="sm"
              variant="secondary"
              icon="bi bi-chat"
              rounded="full"
            >
              Contacter
            </Button>
            {saved ? (
              <Button
                size="sm"
                variant="danger"
                icon="bi bi-bookmark-dash"
                rounded="full"
              >
                Retirer
              </Button>
            ) : (
              <Button
                size="sm"
                variant="secondary"
                icon="bi bi-bookmark"
                rounded="full"
              >
                Sauvegarder
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default OfferCard;
