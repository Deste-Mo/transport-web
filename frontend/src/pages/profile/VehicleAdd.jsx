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
  CheckBox,
} from '../../styles/components'

const VehicleAdd = () => {
  const { handleInputChange, checkFieldError, handleError } = useForm()

  const [formData, setFormData] = useState({
    imgUrl: '',
    make: '',
    type: '',
    capacity: '',
    registrationNumber: '',
    dispo: '',
  })
  const [errorData, setErrorData] = useState({
    imgUrl: false,
    make: false,
    type: false,
    capacity: false,
    registrationNumber: false,
    dispo: false,
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
      <section id="VehicleAdd">
        <div className="w-[650px] shadow-lg rounded-2xl">
          <form className={globalFormStyle.display}>
            <div className="flex gap-2 shadow-lg p-1 rounded-sm">
              <i className="bi bi-info-circle"></i>
              <p>Enregister une véhicule de Transport</p>
            </div>

            <div className="flex flex-wrap">
              <div className="w-[50%] p-3 flex flex-col gap-2">
                <div className="w-full  h-52 bg-black-10 rounded-xl flex flex-col justify-center items-center overflow-hidden">
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
                  title="Matricule"
                  name="registrationNumber"
                  size="md"
                  className="w-full"
                  onError={handleError(setErrorData)}
                  onChange={(e) => handleInputChange(setFormData, e)}
                  block
                />
              </div>

              <div className="w-[50%] p-3 flex flex-col gap-3">
                <TextInput
                  title="Marque"
                  name="make"
                  size="md"
                  className="w-full"
                  onError={handleError(setErrorData)}
                  onChange={(e) => handleInputChange(setFormData, e)}
                  block
                />
                <TextInput
                  title="Type"
                  name="type"
                  size="md"
                  className="w-full"
                  onError={handleError(setErrorData)}
                  onChange={(e) => handleInputChange(setFormData, e)}
                  block
                />
                <TextInput
                  title="Capacité"
                  name="capacity"
                  size="md"
                  className="w-full"
                  onError={handleError(setErrorData)}
                  onChange={(e) => handleInputChange(setFormData, e)}
                  block
                />
                

                <CheckBox             
                    name={'dispo'}
                    label={'Disponible'}
                    id={'dispo'}
                    onError={handleError(setErrorData)}
                    onChange={(event) => handleInputChange(setFormData,event)}
                />
              </div>
            </div>

            <div className="flex justify-between w-full">
              <Button children="Annuler" variant="outline" size="sm" />
              <Button children="Enregister" size="sm" />
            </div>
          </form>
        </div>
      </section>
    </>
  )
}
export default VehicleAdd
