import globalFormStyle from '../../styles/global.form'
import { useForm } from '../../context/FormProvider'
import { useState, useEffect } from 'react'
import {
  TextInput,
  SelectInput,
  FileInput,
  Button,
  TextArea,
  Icon,
} from '../../styles/components'
import { SubHeader } from '../../components/pages/SubHeader'

const ProfileEdit = ({onClick}) => {
  const { handleInputChange, checkFieldError, handleError } = useForm()

  const [formData, setFormData] = useState({
    imgUrl: '',
    lastname: '',
    firstname: '',
    usercin: '',
    phone: '',
    address: '',
    email: '',
    bio: '',
  })
  const [errorData, setErrorData] = useState({
    imgUrl: false,
    lastname: false,
    firstname: false,
    usercin: false,
    phone: false,
    address: false,
    email: false,
    bio: false,
  })

  const [file, setFile] = useState({
    name: '',
    path: '',
  })

  useEffect(() => {
    checkFieldError(errorData)
  }, [errorData])

  return (
    <>
      <section id="profilmodification">
        <div className=" shadow-lg rounded-2xl">
          <form className={globalFormStyle.display}>
            <SubHeader icon='bi bi-info-circle' name='Modifier les informations'/>
            <div className='bg-white-100 p-4 rounded-lg flex flex-col gap-4'>
            <div className="w-full  h-60 bg-black-10 rounded-xl flex flex-col justify-center items-center overflow-hidden">
              <img
                className="w-full h-full object-cover rounded-xl"
                src={file.path}
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
            />

            <TextInput
              title="Nom"
              name="lastname"
              size="md"
              className="w-full"
              onError={handleError(setErrorData)}
              onChange={(e) => handleInputChange(setFormData, e)}
              block
            />
            <TextInput
              title="Prenom"
              name="firstname"
              size="md"
              className="w-full"
              onError={handleError(setErrorData)}
              onChange={(e) => handleInputChange(setFormData, e)}
              block
            />
            <TextInput
              title="Contact"
              name="phone"
              size="md"
              className="w-full"
              onError={handleError(setErrorData)}
              onChange={(e) => handleInputChange(setFormData, e)}
              block
            />
            <TextInput
              title="Email"
              name="email"
              size="md"
              className="w-full"
              onError={handleError(setErrorData)}
              onChange={(e) => handleInputChange(setFormData, e)}
              block
            />
            <TextInput
              title="Adresse"
              name="address"
              size="md"
              className="w-full"
              onError={handleError(setErrorData)}
              onChange={(e) => handleInputChange(setFormData, e)}
              block
            />
            <TextArea
              className="w-full"
              name="bio"
              title="Bio"
              placeholder="Ecrivez une petite déscription de vous"
              resize={true}
              onError={handleError(setErrorData)}
              onChange={(e) => handleInputChange(setFormData, e)}
              value={formData.bio}
              block
            />

            <div className='flex justify-between w-full'>                
                <Button variant='outline' size='sm' onClick={onClick}>Annuler</Button>
                <Button size='sm'>Enregistrer</Button>

            </div>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}
export default ProfileEdit
