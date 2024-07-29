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
import {SubHeader} from "../../components/pages/SubHeader.jsx";

const NewOffer = () => {
  const { handleInputChange, checkFieldError, handleError } = useForm()
  const [formData, setFormData] = useState({
    imgUrl: '',
    title: '',
    description: '',
    depart: '',
    destination: '',
    capacity: '',
    scheduledDate: '',
  });

  const { token } = useAuth();

  const [file, setFile] = useState({
    name: '',
    path: '',
  })

  const titreData = ['Transport de marchandise','Marchandise à transporter']

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

      data.append('imgUrl',imgUrl);
      data.append('title',title);
      data.append('description', description);
      data.append('depart',depart);
      data.append('destination',destination);
      data.append('capacity',capacity);
      data.append('scheduledDate',scheduledDate);

      const response = await fetch(SERVERLINK + "/api/offres/newpublication", {
        method: 'POST',
        headers: {
          'token': token
        },
        body: data
      })

      console.log(await response.json());

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    checkFieldError(errorData)
  }, [errorData])

  return (
        <section
          className="flex flex-col rounded-2xl gap-4 overflow-x-hidden overflow-y-scroll h-full scrollbar-none"
        >
          <SubHeader name="Nouvel Offre" icon="bi bi-plus-circle-fill"/>
          <form className='flex flex-col gap-6 p-2 ' onSubmit={e => handleCreateOffer(e)}>
            {/* formulaire parties */}
              <div className=" flex flex-col gap-4">

                <div className="w-full  h-60 bg-black-10 rounded-xl flex flex-col justify-center items-center overflow-hidden">
                  <img className='w-full h-full object-cover rounded-xl' src={file.path} alt="Choisez une image" />
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
                    option:titre
                  }))}
                  icon="bi bi-caret-down-fill"
                  onError={handleError(setErrorData)}
                  onchange={(e) => handleInputChange(setFormData, e)}
                  block
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
                  pattern={/^\d+(\.\d+)?\s?(kg|tonne|tonnes)$/}
                  title="capacité/Quantité"
                  onError={handleError(setErrorData)}
                  onChange={(e) => handleInputChange(setFormData, e)}
                  value={formData.capacity}
                />
                <TextInput
                  type='date'
                  title='Date prévue de départ'
                />
              </div>
              <div className='flex flex-col gap-4 w-full'>
                <Button block  children='Publier' />
                <Button block variant="secondary" children='Annuler' />
              </div>
          </form>
        </section>
  )
}
export default NewOffer
