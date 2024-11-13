import globalFormStyle from '../../styles/global.form'
import { useForm } from '../../context/FormProvider'
import { useState, useEffect, useMemo } from 'react'
import {
    TextInput,
    SelectInput,
    FileInput,
    Button,
    TextArea,
    Icon,
} from '../../styles/components'
import { SubHeader } from '../../components/pages/SubHeader'
import { useAuth } from '../../context/AuthProvider'
import { SERVERLINK, TOAST_TYPE } from '../../constants'
import { useAnimation } from '../../context/AnimationProvider'
import { useNavigate, useNavigation } from 'react-router-dom'
import {
    CIN_REGEX,
    CIN_REGEX_MESSAGE,
    EMAIL_REGEX,
    EMAIL_REGEX_MESSAGE,
    LAST_NAME_REGEX,
    LAST_NAME_REGEX_MESSAGE,
    NAME_REGEX,
    NAME_REGEX_MESSAGE,
    NIF_STAT_REGEX,
    NIF_STAT_REGEX_MESSAGE,
    PHONE_REGEX,
    PHONE_REGEX_MESSAGE,
} from "../../constants";



const ProfileEdit = ({ onClick }) => {
    const { handleInputChange, checkFieldError, handleError } = useForm()
    const { setShowBackIcon, setMessagePopup } = useAnimation();
    const { personalInformation, token, getInformation } = useAuth()
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        profileimage: null,
        firstname: personalInformation?.firstname,
        lastname: !personalInformation?.lastname ? '' : personalInformation?.lastname,
        usercin: personalInformation?.usercin,
        companynumber: personalInformation?.companynumber,
        phone: personalInformation?.phone,
        address: personalInformation?.address,
        email: personalInformation?.email,
        bio: personalInformation?.bio,
    })
    const { setHideMobileNavigation, hideMobileNavigation } = useAnimation();

    const [profile, setP] = useState(null)

    const [fieldsError, setFieldsError] = useState(false);


    const [errorData, setErrorData] = useState({
        profileimage: true,
        firstname: true,
        lastname: true,
        companynumber: true,
        usercin: true,
        phone: true,
        address: true,
        email: true,
        bio: true
    });


    const [file, setFile] = useState({
        name: '',
        path: '',
    })

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const data = new FormData()

            for (const key in formData) {
                data.append(key, formData[key])
            }

            const response = await fetch(SERVERLINK + '/api/profile/updateprofile', {
                method: 'POST',
                headers: {
                    token: token,
                },
                body: data,
            })

            const res = await response.json()

            getInformation(token)
            setFormData({ ...formData, ["profileimage"]: null });

            // if (!res.error) {
            //     setMessagePopup("Informations modifiés avec success !", TOAST_TYPE.success);
            // }

            if (response.status === 200) {
                setMessagePopup("Information modifiée avec succès!", TOAST_TYPE.success)
            } else if (response.status === 500) {
                setMessagePopup("Veuillez verifier vos informations", TOAST_TYPE.error)
            }else if(response.status === 400){
                setMessagePopup("Utilisateur déjà existant", TOAST_TYPE.error)
            }
        } catch (error) {
            console.error(error)
            setMessagePopup(error, TOAST_TYPE.error)
        }
    }

    /*    useMemo(() =>{
            setHideMobileNavigation(true)
        }, [hideMobileNavigation]);*/

    useEffect(() => {
        checkFieldError(errorData)
    }, [errorData])

    useEffect(() => {
        getInformation(token);
        setP(personalInformation?.profile);
        setShowBackIcon(true);
    }, [])

    useEffect(() => {
        const {
            profileimage,
            lastname,
            firstname,
            companynumber,
            usercin,
            phone,
            address,
            email,
            bio
        } = errorData;

        if (personalInformation?.accountId === 1) {
            setFieldsError(
                firstname || companynumber || email || phone || address
            )
        } else {
            setFieldsError(
                firstname || lastname || usercin || email || phone || address
            )
        }
    }, [formData, errorData]);

    return (
        <section className="space-y-6 pb-[54px] bg-secondary-l rounded-2xl   dark:bg-secondary-d">
            <SubHeader icon="bi bi-info-circle" name="Modifier les informations" />
            <form className={`flex flex-col gap-10 p-4 `} onSubmit={handleSubmit}>
                <div className="rounded-lg flex flex-col gap-4">
                    <div
                        className="w-full  h-60 bg-black-10 rounded-xl flex flex-col justify-center items-center overflow-hidden">
                        <img
                            className="w-full h-full  object-contain rounded-xl"
                            src={file.path ? file.path : SERVERLINK + '/' + profile}
                            alt="Choisissez une image"
                        />
                    </div>
                    <FileInput
                        className="w-full"
                        name="profileimage"
                        setFile={setFile}
                        onChange={(e) => handleInputChange(setFormData, e)}
                        onError={handleError(setErrorData)}
                        block
                        value={formData.profileimage}
                    />

                    <TextInput
                        title="Nom"
                        name="firstname"
                        size="md"
                        className="w-full"
                        onError={handleError(setErrorData)}
                        onChange={(e) => handleInputChange(setFormData, e)}
                        block
                        value={formData.firstname}
                        pattern={NAME_REGEX}
                        errorMsg={NAME_REGEX_MESSAGE}
                    />
                    {personalInformation?.accountId !== 1 && (
                        <TextInput
                            title="Prénom"
                            name="lastname"
                            size="md"
                            className="w-full"
                            onError={handleError(setErrorData)}
                            onChange={(e) => handleInputChange(setFormData, e)}
                            block
                            value={formData.lastname}
                            errorMsg={LAST_NAME_REGEX_MESSAGE}
                            pattern={LAST_NAME_REGEX}
                        />
                    )}
                    {personalInformation?.accountId === 1 ? (
                        <TextInput
                            title="NIF"
                            name="companynumber"
                            size="md"
                            className="w-full"
                            onError={handleError(setErrorData)}
                            onChange={(e) => handleInputChange(setFormData, e)}
                            block
                            value={formData.companynumber}
                            pattern={NIF_STAT_REGEX}
                            errorMsg={NIF_STAT_REGEX_MESSAGE}
                        />
                    ) : (
                        <TextInput
                            title="CIN"
                            name="usercin"
                            size="md"
                            className="w-full"
                            onError={handleError(setErrorData)}
                            onChange={(e) => handleInputChange(setFormData, e)}
                            block
                            value={formData.usercin}
                            errorMsg={CIN_REGEX_MESSAGE}
                            pattern={CIN_REGEX}
                        />
                    )}

                    <TextInput
                        title="Contact"
                        name="phone"
                        size="md"
                        className="w-full"
                        onError={handleError(setErrorData)}
                        onChange={(e) => handleInputChange(setFormData, e)}
                        block
                        value={formData.phone}
                        errorMsg={PHONE_REGEX_MESSAGE}
                        pattern={PHONE_REGEX}
                    />
                    <TextInput
                        title="Email"
                        name="email"
                        size="md"
                        className="w-full"
                        onError={handleError(setErrorData)}
                        onChange={(e) => handleInputChange(setFormData, e)}
                        block
                        value={formData.email}
                        pattern={EMAIL_REGEX}
                        errorMsg={EMAIL_REGEX_MESSAGE}
                    />
                    <TextInput
                        title="Adresse"
                        name="address"
                        size="md"
                        className="w-full"
                        onError={handleError(setErrorData)}
                        onChange={(e) => handleInputChange(setFormData, e)}
                        block
                        value={formData.address}
                        errorMsg="Entrer une adresse valide"
                        pattern={/^.{6,}$/}
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

                </div>
                <div className="flex  justify-between w-full gap-2">
                    <Button type="submit" disabled={fieldsError} block>
                        Enregistrer
                    </Button>
                    <Button
                        type="button"
                        variant="ghost"
                        block
                        onClick={() =>
                            navigate(`/profile/${personalInformation?.id}`)
                        }>
                        Annuler
                    </Button>
                </div>
            </form>
        </section>
    )
}
export default ProfileEdit
