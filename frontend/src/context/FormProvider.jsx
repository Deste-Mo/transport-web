/* eslint-disable react/prop-types */
import { createContext, useContext, useRef, useState } from "react";

export const FormContext = createContext({});

const FormProvider = ({ children }) => {
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [isOptionLoading, setIsOptionLoading] = useState(false);
  const [fieldError, setFieldError] = useState({});
  const userRef = useRef(null);

  const checkFieldError = (errorData) => {
    let errors = [];
    for (const key in errorData) {
      errors.push(errorData[key]);
    }
    setFieldError(errors.some((error) => error));
  };

  const handleInputChange = (setFormData, e) => {
    const { name, value, type, checked, files } = e.target;
    
    setFormData((prevForm) => {
      return {
        ...prevForm,
        [name]:
          type === "file" ? files[0] : type === "checkbox" ? checked : value,
      };
    });
  };

  const extractId = (param, index = 0) => {
    return param.split(":")[index];
  };
  const handleSelectionChange = (setFormData) => (selected, name) => {
    setFormData((prevForm) => ({ ...prevForm, [name]: selected }));
  };
  
  const handleError = (setErrorData) => (error, e) => {
    const name = e.target.name;
    setErrorData((prevForm) => ({ ...prevForm, [name]: error }));
  };

  return (
    <FormContext.Provider
      value={{
        checkFieldError,
        isSubmiting,
        setIsSubmiting,
        fieldError,
        setFieldError,
        userRef,
        isOptionLoading,
        setIsOptionLoading,
        handleInputChange,
        handleSelectionChange,
        extractId,
        handleError,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export default FormProvider;

export const useForm = () => {
  return useContext(FormContext);
};
