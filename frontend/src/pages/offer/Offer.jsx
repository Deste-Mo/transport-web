import React, {useEffect, useState} from 'react'
import { useForm } from '../../context/FormProvider'
import {
  TextInput,
  SelectInput,
  FileInput,
  Button,
  TextArea,
  Icon,
} from '../../styles/components'

const Offer = () => {
  const { handleInputChange, checkFieldError, handleError } = useForm()
  const [formData, setFormData] = useState({
    userId:'02',
    imgUrl: '',
    title: '',
    description: '',
    depart: '',
    destination: '',
    capacity: '',
    scheduledDate: '',
  })

  const [file, setFile] = useState({
    name: '',
    path: '',
  })

  const titreData = [
    { option: 'Transport de marchandise' },
    { option: 'Marchandise à transporter' },
  ]

  const [errorData, setErrorData] = useState({
    imgUrl: false,
    title: false,
    description: true,
    depart: true,
    destination: true,
    capacity: true,
    scheduledDate: false,
  })

  useEffect(() => {
    checkFieldError(errorData)
  }, [errorData])

  return (
    <>
      <div className=" flex flex-row justify-center w-full">
        <section
          id="offrePublication"
          className="flex flex-col p-6  items-center rounded-2xl"
        >     

        
        <form className='flex flex-col gap-5'>
          <div className='shadow rounded-md p-2 flex gap-6 items-center bg-white-100'>
            <div>
                <Icon size='md' icon='bi bi-plus' className='text-subtitle-1'/>
            </div>
            <p className=' text-lead'>Nouvelle Publication</p>
          </div>

          {/* formulaire parties */}
         <div className='bg-white-100 p-4 rounded-lg'>
         <div className=" flex flex-col gap-4">

<div className="w-full  h-60 bg-black-10 rounded-xl flex flex-col justify-center items-center overflow-hidden">
  <img className='w-full h-full object-cover rounded-xl' src={file.path} alt="Choisez une image" />
</div>
<FileInput className='w-full'
  name='imgUrl'
  setFile={setFile}
  onChange={(e)=>handleInputChange(setFormData,e)}
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
  options={titreData}
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

<div className='flex gap-2'>
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
<div className='flex gap-2'>
<TextInput
  className=""
  name="capacity"
  pattern ={/^\d+(\.\d+)?\s?(kg|tonne|tonnes)$/}
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
<div className='flex flex-col gap-4 w-full mt-[1em]'>
<Button className='w-full' 
children='Publier'/>
<Button className='w-full' 
variant='outline'
children='Annuler' 

/>
</div>
         </div>

          </form>
        

          
        </section>
      </div>
    </>
  )
}
export default Offer
