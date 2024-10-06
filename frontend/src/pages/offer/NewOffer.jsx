import React, {useEffect, useMemo, useState} from "react";
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

const NewOffer = () => {
  const { handleInputChange, checkFieldError, handleError } = useForm();
  const { setShowBackIcon, setMessagePopup } = useAnimation();

  const { getCurrentUserOffers, updateOffer, setUpdateOffer } = useOffer();
  const { token, personalInformation } = useAuth()
  

  const titreData = ['Transport de marchandise', 'Marchandise à transporter']
  const todaydate = new Date().toISOString().split('T')[0]

  // Function to get today's date in MM/DD/YYYY format
  const getTodayDate = () => {
    const today = new Date()
    const month = String(today.getMonth() + 1).padStart(2, '0')
    const day = String(today.getDate()).padStart(2, '0')
    const year = today.getFullYear()
    return `${year}-${month}-${day}`
  }

  const mesureUnit = ['kg', 'tonnes']

  const [isEditOffer, setIsEditOffer] = useState(false);

  const [file, setFile] = useState({
    name: '',
    path: '',
  })

  const formatDateForInput = (dateString) => {
    const date = new Date(dateString)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  const [mesureData, setMesureData] = useState({
    cap: '',
    unit: 'kg'
  })

  const [formData, setFormData] = useState({
    imgUrl: '',
    title: 'Transport de marchandise',
    description: '',
    depart: '',
    destination: '',
    capacity: '',
    scheduledDate: todaydate,
  })

  const reset = () => {
    localStorage.removeItem('offer')
    setFormData({
      imgUrl: '',
      title: 'Transport de marchandise',
      description: '',
      depart: '',
      destination: '',
      capacity: '',
      scheduledDate: todaydate,
    })
    setFile({
      name: '',
      path: '',
    })

    setIsEditOffer(false)
  }

  const [errorData, setErrorData] = useState({
    imgUrl: false,
    title: false,
    description: true,
    depart: true,
    destination: true,
    capacity: true,
    scheduledDate: true,
  })

  const handleCreateOffer = async (e) => {
    e.preventDefault()

    try {
      const data = new FormData()

      for (const key in formData) {
        data.append(key, formData[key])
      }

      const response = await fetch(SERVERLINK + '/api/offres/newpublication', {
        method: 'POST',
        headers: {
          token: token,
        },
        body: data,
      })
      if (response.status === 200) {
        const content = ` ${personalInformation.fullName} vient de publier une Offre`
        const { offer } = await response.json()

        const offerId = await offer.offerid

        const sendNotifs = await fetch(SERVERLINK + '/api/notifs/sendnotifs', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            token: token,
          },
          body: JSON.stringify({ content, offerId }),
        })
        getCurrentUserOffers()
        setMessagePopup("L'offre publié avec success !", TOAST_TYPE.success)

        setFormData({
          imgUrl: '',
          title: 'Transport de marchandise',
          description: '',
          depart: '',
          destination: '',
          capacity: '',
          scheduledDate: todaydate,
        })

        setFile({
          name: '',
          path: '',
        })
      }
    } catch (error) {
      console.error(error)
      setMessagePopup(`Erreur : ${error}`, TOAST_TYPE.error)
    }
  };

  const handleUpdateOffer = async (e) => {
    e.preventDefault();

    try {
      // setCapacity();

      const data = new FormData()

      for (const key in formData) {
        if (key !== 'imgUrl' || file.path) {
          data.append(key, formData[key])
        }
      }

      if (file.path) {
        data.append('imgUrl', file.path)
      }

      const response = await fetch(
          SERVERLINK + '/api/offres/updateofferforuser/' + updateOffer.offerid,
          {
            method: 'POST',
            headers: {
              token: token,
            },
            body: data,
          }
      );

      if (response.status === 200) {
        const res = await response.json()

        const content = ` ${personalInformation.fullName} a modifié sa publication d'offre`
        const offerId = updateOffer.offerid

        const sendNotifs = await fetch(SERVERLINK + '/api/notifs/sendnotifs', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            token: token,
          },
          body: JSON.stringify({ content, offerId }),
        })

        setUpdateOffer(await res.offer)
        localStorage.setItem('offer', JSON.stringify(await res.offer))

        setFile({
          name: '',
          path: '',
        })

        getCurrentUserOffers()
        setMessagePopup("L'offre modifié avec success !", TOAST_TYPE.success)
      }
    } catch (error) {
      console.error(error)
      setMessagePopup(`Erreur : ${error}`, TOAST_TYPE.error)
    }
  }

  const handleDateInput = (e) => {
    const selectedDate = new Date(e.target.value)
    const today = new Date(getTodayDate())
    if (selectedDate < today) {
      // If the selected date is before today, set an error message or handle it accordingly
      setMessagePopup('La date prévue erronée', TOAST_TYPE.error)
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value })
    }
  }

  useEffect(() => {
    setShowBackIcon(true);
    const getOfferById = async () => {
      localStorage.getItem('offer') ?
          setUpdateOffer(await JSON.parse(localStorage.getItem('offer')))
          :
          reset();
    }
    getOfferById()
  }, [])

  useEffect(() => {
    const fullCap = `${mesureData.cap} ${mesureData.unit}`;
    setFormData((prev) => ({
      ...prev,
      capacity: fullCap,
    }));
  }, [mesureData]);

  useEffect(() => {
    // updateOffer.scheduleddate && console.log(updateOffer.scheduleddate)
    if (updateOffer) {
      setFormData({
        imgUrl: updateOffer.imgurl || '',
        title:
          (!updateOffer.title ||
            updateOffer.title === 'undefined' ||
            updateOffer.title === undefined)
            ? 'Transport de marchandise'
            : updateOffer.title,
        description: updateOffer.description || '',
        depart: updateOffer.depart || '',
        destination: updateOffer.dest || '',
        capacity: updateOffer.capacity || '',
        scheduledDate: updateOffer.scheduleddate
          ? formatDateForInput(updateOffer.scheduleddate)
          : getTodayDate(),

      })

      setIsEditOffer(true);
    } else {
      reset();
    }
  }, [updateOffer])
  
  useEffect(() => {
    checkFieldError(errorData)
  }, [errorData])

  return (
    <motion.section
      className="space-y-6"
      variants={appVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <SubHeader sticky name="Nouvel Offre" icon="bi bi-plus-circle-fill" />
      <form
        className="flex flex-col gap-10 p-2 bg-white-100 dark:bg-transparent rounded-2xl p-4 "
        onSubmit={(e) => handleCreateOffer(e)}
      >
 
        <div className="flex flex-col gap-6">
          <div className=" flex flex-col gap-4">
            <div className="w-full  h-60 bg-black-10 rounded-xl flex flex-col justify-center items-center overflow-hidden">
              <img
                className="w-full h-full object-contain rounded-xl"
                src={file.path ? file.path : formData.imgUrl ? SERVERLINK + '/' + formData.imgUrl : SERVERLINK + '/defaultPub.png'}
                alt="Choisissez une image"
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
              placeholder="Entrer la destination"
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
                value={formData.scheduledDate}
                className={`h-min  ${globalInputVariants.variant["fill"]} ${globalInputVariants.size["md"]} w-full rounded-xl`}
              />
            </div>
            <div className="flex gap-1">
              <TextInput
                titleIcon="bi bi-truck-flatbed"
                type="number"
                className=" "
                name="cap"
                // pattern={/^[0-9]+$/}
                // pattern={/^\d+(\.\d+)?\s?(kg|tonne|tonnes|Kg|KG|TONNE|TONNES|Tonne|Tonnes)$/}
                title="Quantité/capacité"
                onError={handleError(setErrorData)}
                onChange={(e) => handleInputChange(setMesureData, e)}
                value={setMesureData.cap}
                variant='fill'
                placeholder='ex : 2 tonnes'
                block
              />
              <SelectInput
                // className=" end-2"
                title="unité"
                // titleIcon="bi bi-truck-flatbed"
                name="unit"
                variant="fill"
                options={mesureUnit.map((titre) => ({
                  option: titre,
                }))}

                onChange={(e) => handleInputChange(setMesureData, e)}
                block
                value={mesureData[0]}
              />
            </div>


          </div>
        </div>
        <div className="flex  gap-4 w-full">
          {localStorage.getItem('offer') ? (
            <Button
              type="button"
              onClick={handleUpdateOffer}
              block
              children="Modifier"
            />
          ) : (
          <Button type="submit" block children="Publier" />
          )}
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
export default NewOffer;
