import globalFormStyle from '../../styles/global.form'
import { useForm } from '../../context/FormProvider'
import { useState, useEffect } from 'react'
import {
  TextInput,  
  Button, 
} from '../../styles/components'

const Security= () =>{
    const { handleInputChange, checkFieldError, handleError } = useForm()

    const [formData, setFormData] = useState({
        actualPwd:'',
        newPwd:'',
        confirmPwd:'',
    })
    const [errorData, setErrorData] = useState({
        actualPwd:false,
        newPwd:false,
        confirmPwd:false,
    })
  
    
  
    useEffect(() => {
      checkFieldError(errorData)
    }, [errorData])
  
    return (
      <>
        <section id="security">
          <div className="w-[650px] shadow-lg rounded-2xl">
            <form className={globalFormStyle.display}>
              <div className="flex gap-2 shadow-lg p-1 rounded-sm">
                <i className="bi bi-info-circle"></i>
                <p>Securité</p>
              </div>
  
          
  
              <TextInput
                title="Mot de passe actuel"
                name="actualPwd"
                size="md"
                className="w-full"
                onError={handleError(setErrorData)}
                onChange={(e) => handleInputChange(setFormData, e)}
                block
              />
              <TextInput
                title="Nouveau mot de passe"
                name="newPwd"
                size="md"
                className="w-full"
                onError={handleError(setErrorData)}
                onChange={(e) => handleInputChange(setFormData, e)}
                block
              />
              <TextInput
                title="Confirmation"
                name="confirmPwd"
                size="md"
                className="w-full"
                onError={handleError(setErrorData)}
                onChange={(e) => handleInputChange(setFormData, e)}
                block
              />
              
  
              <div className='flex justify-between w-full'>                
                  <Button children='Annuler' variant='outline' size='sm'/>
                  <Button children='Enregister' size='sm'/>
  
              </div>
            </form>
          </div>
        </section>

        </>
    )
}

export default Security