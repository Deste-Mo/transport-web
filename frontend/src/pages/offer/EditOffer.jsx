import React, { useEffect, useState } from "react";
import { useForm } from "../../context/FormProvider";
import {
  TextInput,
  SelectInput,
  FileInput,
  Button,
  TextArea,
  Icon,
} from "../../styles/components";
import { SERVERLINK, TOAST_TYPE } from "../../constants";
import { useAuth } from "../../context/AuthProvider";
import { SubHeader } from "../../components/pages/SubHeader.jsx";
import { motion } from "framer-motion";
import { appVariants } from "../../animations/variants.js";
import { useApp } from "../../context/AppProvider.jsx";
import { useOffer } from "../../context/OfferProvider.jsx";
import { globalInputVariants } from "../../styles/globals.input.js";
import { useAnimation } from "../../context/AnimationProvider.jsx";
import { useNavigate, useParams } from "react-router-dom";

const EditOffer = () => {
  const { handleInputChange, checkFieldError, handleError } = useForm();
  const { setShowBackIcon, setMessagePopup } = useAnimation();
  const { getCurrentUserOffers, updateOffer, setUpdateOffer } = useOffer();
  const titreData = ["Transport de marchandise", "Marchandise à transporter"];
  const mesureData = ["kg", "tonnes"];
  const todaydate = new Date().toISOString().split("T")[0];
  const { id } = useParams();
  const navigate = useNavigate();

  // Function to get today's date in MM/DD/YYYY format
  const getTodayDate = () => {
    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const year = today.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const formatDateForInput = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [isEditOffer, setIsEditOffer] = useState(false);

  const [formData, setFormData] = useState({
    imgUrl: "",
    title: "Transport de marchandise",
    description: "",
    depart: "",
    destination: "",
    capacity: "",
    scheduledDate: todaydate,
  });

  useEffect(() => {
    // updateOffer.scheduleddate && console.log(updateOffer.scheduleddate)
    updateOffer &&
      setFormData({
        imgUrl: updateOffer.imgurl || "",
        title:
          !updateOffer.title ||
          updateOffer.title === "undefined" ||
          updateOffer.title === undefined
            ? "Transport de marchandise"
            : updateOffer.title,
        description: updateOffer.description,
        depart: updateOffer.depart,
        destination: updateOffer.dest,
        capacity: updateOffer.capacity,
        scheduledDate: updateOffer.scheduleddate
          ? formatDateForInput(updateOffer.scheduleddate)
          : getTodayDate(),
      });
  }, [updateOffer]);

  const { token, personalInformation } = useAuth();

  const [file, setFile] = useState({
    name: "",
    path: "",
  });

  useEffect(() => {
    const getOfferById = async () => {
      localStorage.getItem("offer") &&
        setUpdateOffer(await JSON.parse(localStorage.getItem("offer")));
    };
    getOfferById();
  }, []);

  const reset = () => {
    localStorage.removeItem("offer");
    setFormData({
      imgUrl: "",
      title: "Transport de marchandise",
      description: "",
      depart: "",
      destination: "",
      capacity: "",
      scheduledDate: todaydate,
    });
    setFile({
      name: "",
      path: "",
    });
  };

  const [errorData, setErrorData] = useState({
    imgUrl: false,
    title: false,
    description: true,
    depart: true,
    destination: true,
    capacity: true,
    scheduledDate: true,
  });

  const handleUpdateOffer = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      for (const key in formData) {
        if (key !== "imgUrl" || file.path) {
          data.append(key, formData[key]);
        }
      }

      if (file.path) {
        data.append("imgUrl", file.path);
      }

      const response = await fetch(
        SERVERLINK + "/api/offres/updateofferforuser/" + updateOffer.offerid,
        {
          method: "POST",
          headers: {
            token: token,
          },
          body: data,
        }
      );

      if (response.status === 200) {
        const res = await response.json();

        const content = ` ${personalInformation.fullName} a modifié sa publication d'offre`;
        const offerId = updateOffer.offerid;

        const sendNotifs = await fetch(SERVERLINK + "/api/notifs/sendnotifs", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
          body: JSON.stringify({ content, offerId }),
        });

        setUpdateOffer(await res.offer);
        localStorage.setItem("offer", JSON.stringify(await res.offer));

        setFile({
          name: "",
          path: "",
        });

        getCurrentUserOffers();
        setMessagePopup("L'offre modifié avec success !", TOAST_TYPE.success);
        navigate(`/profile/${id}`);
      }
    } catch (error) {
      console.error(error);
      setMessagePopup(`Erreur : ${error}`, TOAST_TYPE.error);
    }
  };

  const handleDateInput = (e) => {
    const selectedDate = new Date(e.target.value);
    const today = new Date(getTodayDate());
    if (selectedDate < today) {
      // If the selected date is before today, set an error message or handle it accordingly
      setMessagePopup("La date prévue erronée", TOAST_TYPE.error);
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  useEffect(() => {
    setShowBackIcon(true);
  }, []);

  useEffect(() => {
    checkFieldError(errorData);
  }, [errorData]);

  return (
    <motion.section
      className="space-y-6"
      variants={appVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <SubHeader sticky name="Modifier un Offre" icon="bi bi-pencil" />
      <form
        className="flex flex-col gap-10 p-4  bg-white-100 rounded-2xl dark:bg-transparent"
        onSubmit={(e) => handleUpdateOffer(e)}
      >
        {/* formulaire parties */}
        <div className="flex flex-col gap-6">
          <div className=" flex flex-col gap-4">
            <div className="w-full  h-60 bg-black-10 rounded-xl flex flex-col justify-center items-center overflow-hidden">
              <img
                className="w-full h-full object-contain rounded-xl"
                src={
                  file.path
                    ? file.path
                    : formData.imgUrl
                    ? SERVERLINK + "/" + formData.imgUrl
                    : SERVERLINK + "/defaultPub.png"
                }
                alt="Choisez une image"
              />
            </div>
            <FileInput
              className="w-full"
              name="imgUrl"
              setFile={setFile}
              onChange={(e) => handleInputChange(setFormData, e)}
              onError={handleError(setErrorData)}
              block
              inputDisabled={isEditOffer}
            />
          </div>

          {/* Informations sections */}
          <div className="flex flex-col gap-4">
            <TextArea
              titleIcon="bi bi-pencil"
              className="w-full"
              name="description"
              title="Description"
              resize={true}
              placeholder="Décrivez ici votre offre de transport"
              onError={handleError(setErrorData)}
              onChange={(e) => handleInputChange(setFormData, e)}
              value={formData.description}
              block
            />
          </div>
        </div>

        <div className="flex flex-col gap-6 max-md:gap-10">
          <div className="space-y-2">
            <div className="text-black-100 dark:text-white-100 text-subtitle-2 flex items-center gap-2">
              <i className="bi bi-card-checklist"></i>
              <span>Résumé </span>
            </div>
            <p className="text-black-80 text-small-1 dark:text-white-60">
              Ajoutez un résumé pour augmenter la visibilité
            </p>
          </div>
          <SelectInput
            titleIcon="bi bi-box-seam"
            className="w-full"
            name="title"
            title="Objet"
            variant="fill"
            size="lg"
            options={titreData.map((titre) => ({
              option: titre,
            }))}
            icon="bi bi-caret-down-fill"
            onError={handleError(setErrorData)}
            onChange={(e) => handleInputChange(setFormData, e)}
            block
            value={formData.title}
          />
          <div className="flex gap-4 max-md:flex-col">
            <TextInput
              titleIcon="bi bi-geo-alt"
              className="w-[45]"
              name="depart"
              title="Lieu de départ"
              placeholder="Entrez le lieu de départ"
              onError={handleError(setErrorData)}
              onChange={(e) => handleInputChange(setFormData, e)}
              value={formData.depart}
            />
            <TextInput
              titleIcon="bi bi-geo-alt"
              className=""
              name="destination"
              title="Destination"
              onError={handleError(setErrorData)}
              onChange={(e) => handleInputChange(setFormData, e)}
              value={formData.destination}
            />
          </div>
          <div className="flex gap-4  flex-wrap">
            <div
              className={`flex flex-col gap-2 justify-start ${globalInputVariants.width}`}
            >
              <div className="flex items-center gap-2">
                <i className={`bi bi-calendar text-primary-100`}></i>
                <p className="text-base font-thin text-black-100 dark:text-white-100">
                  Date prévue
                </p>
              </div>
              <input
                type="date"
                name="scheduledDate"
                id="scheduledDate"
                required
                onChange={handleDateInput}
                onError={handleError(setErrorData)}
                value={formData.scheduledDate}
                className={`h-min  ${globalInputVariants.variant["fill"]} ${globalInputVariants.size["md"]} w-full rounded-xl`}
              />
            </div>
            <div className="flex gap-1">
              <TextInput
                titleIcon="bi bi-truck-flatbed"
                type="text"
                className=" "
                name="capacity"
                // pattern={/^[0-9]+$/}
                pattern={
                  /^\d+(\.\d+)?\s?(kg|tonne|tonnes|Kg|KG|TONNE|TONNES|Tonne|Tonnes)$/
                }
                title="Quantité/capacité"
                onError={handleError(setErrorData)}
                onChange={(e) => handleInputChange(setFormData, e)}
                value={formData.capacity}
                variant="fill"
                placeholder="ex : 2 tonnes"
                block
              />
            </div>
          </div>
        </div>
        <div className="flex  gap-4 w-full">
          <Button
            type="button"
            onClick={handleUpdateOffer}
            block
            children="Modifier"
          />
          <Button
            type="button"
            onClick={reset}
            block
            variant="ghost"
            children="Annuler"
          />
        </div>
      </form>
    </motion.section>
  );
};
export default EditOffer;
