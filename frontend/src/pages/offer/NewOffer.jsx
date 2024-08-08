import React, { useEffect, useState } from 'react'
import { useForm } from '../../context/FormProvider'
import {
  TextInput,
  SelectInput,
  FileInput,
  Button,
  TextArea,
  Icon,
} from '../../styles/components'
import { SERVERLINK } from '../../constants'
import { useAuth } from '../../context/AuthProvider'
import { SubHeader } from "../../components/pages/SubHeader.jsx";
import { motion } from "framer-motion";
import { appVariants } from '../../animations/variants.js'
import { useApp } from '../../context/AppPorvider.jsx'
import { useOffer } from '../../context/OfferProvider.jsx'


const NewOffer = () => {
    const { handleInputChange, checkFieldError, handleError } = useForm()

  const { getCurrentUserOffers, updateOffer, setUpdateOffer } = useOffer();

    const [formData, setFormData] = useState({
        imgUrl: '',
        title: '',
        description: '',
        depart: '',
        destination: '',
        capacity: '',
    scheduledDate: ''
  });

  useEffect(() => {
    updateOffer && setFormData({
      imgUrl: updateOffer.imgurl,
      title: updateOffer.title,
      description: updateOffer.description,
      depart: updateOffer.depart,
      destination: updateOffer.dest,
      capacity: updateOffer.capacity,
      scheduledDate: '',
    })
  }, [updateOffer]);

  const { token, personalInformation } = useAuth();


    const [file, setFile] = useState({
        name: '',
        path: '',
  });

  useEffect(() => {
    const getOfferToUpdate = async () => {
      localStorage.getItem("offer") && setUpdateOffer(await JSON.parse(localStorage.getItem("offer")))
    }
    getOfferToUpdate();
  }, []);

  const reset = () => {
    localStorage.removeItem("offer");
    setFormData({
      imgUrl: '',
      title: '',
      description: '',
      depart: '',
      destination: '',
      capacity: '',
      scheduledDate: ''
    });
    setFile({
      name: '',
      path: '',
    })
  }

  const titreData = ['Transport de marchandise', 'Marchandise à transporter']

    const [errorData, setErrorData] = useState({
        imgUrl: false,
        title: false,
        description: true,
        depart: true,
        destination: true,
        capacity: true,
        scheduledDate: false,
    })

    const handleCreateOffer = async (e) => {

        const { imgUrl, title, description, depart, destination, capacity, scheduledDate } = formData;


        e.preventDefault();

        try {

            const data = new FormData();

      for (const key in formData) {
        data.append(key, formData[key])
      }

            const response = await fetch(SERVERLINK + "/api/offres/newpublication", {
                method: 'POST',
                headers: {
                    'token': token
                },
                body: data
      });

      const content = ` ${personalInformation.fullName} vient de publier une Offre`;

      const sendNotifs = await fetch(SERVERLINK + "/api/notifs/sendnotifs", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'token': token
        },
        body: JSON.stringify({ content })
      });

            setFormData({
                imgUrl: '',
                title: '',
                description: '',
                depart: '',
                destination: '',
                capacity: '',
                scheduledDate: ''
            });

            setFile({
                name: '',
                path: '',
            });

      getCurrentUserOffers();

    } catch (error) {
      console.error(error)
    }
  }


  const handleUpdateOffer = async (e) => {
    e.preventDefault();

    try {

      const data = new FormData();

      for (const key in formData) {
        data.append(key, formData[key])
      }

      const response = await fetch(SERVERLINK + "/api/offres/updateofferforuser/" + updateOffer.offerid, {
        method: 'POST',
        headers: {
          'token': token
        },
        body: data
      });

      const res = await response.json();

      const content = ` ${personalInformation.fullName} a modifié sa publication d'offre`;


      const sendNotifs = await fetch(SERVERLINK + "/api/notifs/sendnotifs", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'token': token
        },
        body: JSON.stringify({ content })
      });

      setUpdateOffer(await res.offer);
      localStorage.setItem("offer", JSON.stringify(await res.offer));

      setFile({
        name: '',
        path: '',
      });


      getCurrentUserOffers();

        } catch (error) {
            console.error(error)
        }
    }

    const handleDateInput = (e) => {
        setFormData({...formData, [e.target.name] : e.target.value});
    }

    useEffect(() => {
        checkFieldError(errorData)
    }, [errorData])

  return (
        <motion.section
          className="flex flex-col rounded-2xl gap-4 overflow-x-hidden overflow-y-scroll h-full scrollbar-none"
           variants={appVariants} initial="hidden" whileInView="visible" viewport={{once : true}}
        >
          <SubHeader sticky name="Nouvel Offre" icon="bi bi-plus-circle-fill"/>
          <form className='flex flex-col gap-6 p-2 ' onSubmit={e => handleCreateOffer(e)}>
            {/* formulaire parties */}
              <div className=" flex flex-col gap-4">

                <div className="w-full  h-60 bg-black-10 rounded-xl flex flex-col justify-center items-center overflow-hidden">
                  <img className='w-full h-full object-cover rounded-xl' src={file.path ? file.path : SERVERLINK + "/defaultCar.jpg"} alt="Choisez une image" />
                </div>
                <FileInput className='w-full'
                  name='imgUrl'
                  setFile={setFile}
                  onChange={(e) => handleInputChange(setFormData, e)}
                  onError={handleError(setErrorData)}
                  block
                />
              </div>

              {/* Informations sections */}
              <div className="flex flex-col gap-4">
                <SelectInput
                  className="w-full"
                  name="title"
                  title="Objet"
                  variant="fill"
                  size="lg"
                  options={titreData.map((titre) => ({
                    option:titre,
                  }))}
                  icon="bi bi-caret-down-fill"
                  onError={handleError(setErrorData)}
                  onchange={(e) => handleInputChange(setFormData, e)}
                  block
            value={titreData[0]}
                />
                <TextArea
                  className="w-full"
                  name="description"
                  title="Description"
                  resize={true}
                  placeholder="Décrivez votre offre de transport"

                  onError={handleError(setErrorData)}
                  onChange={(e) => handleInputChange(setFormData, e)}
                  value={formData.description}
                  block
                />
              </div>

              <div className='flex gap-4'>
                <TextInput
                  className="w-[45]"
                  name="depart"
                  title="Lieu de départ"
                  placeholder='Entrez le lieu de départ'
                  onError={handleError(setErrorData)}
                  onChange={(e) => handleInputChange(setFormData, e)}
                  value={formData.depart}
                />
                <TextInput
                  className=""
                  name="destination"
                  title="Destination"
                  onError={handleError(setErrorData)}
                  onChange={(e) => handleInputChange(setFormData, e)}
                  value={formData.destination}
                />

              </div>
              <div className='flex gap-4'>
                <TextInput
                  className=""
                  name="capacity"
                  pattern={/^\d+(\.\d+)?\s?(kg|tonne|tonnes|Kg)$/}
                  title="capacité/Quantité"
                  onError={handleError(setErrorData)}
                  onChange={(e) => handleInputChange(setFormData, e)}
                  value={formData.capacity}
                />
          <input
            type="date"
            name="scheduledDate"
            id="scheduledDate"
            onChange={handleDateInput}
            value={formData.scheduledDate} className='h-[1px] w-[50%] py-[30px] pl-4 outline-none bg-black-10 text-black-60 dark:text-white-60 my-5 rounded-xl'
          />
              </div>
              <div className='flex flex-col gap-4 w-full'>
        {
            localStorage.getItem("offer")
              ?
              <Button type='button' onClick={handleUpdateOffer} block children='Modifier' />
              :
              <Button type='submit' block children='Publier' />
          }
          <Button type='button' onClick={reset} block variant="secondary" children='Annuler' />
              </div>
          </form>
        </motion.section>

  )
}
export default NewOffer
