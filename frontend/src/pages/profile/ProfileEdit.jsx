import globalFormStyle from '../../styles/global.form'
import {useForm} from '../../context/FormProvider'
import {useState, useEffect} from 'react'
import {
    TextInput,
    SelectInput,
    FileInput,
    Button,
    TextArea,
    Icon,
} from '../../styles/components'
import {SubHeader} from '../../components/pages/SubHeader'
import {useAuth} from '../../context/AuthProvider'
import {SERVERLINK} from '../../constants'
import { useAnimation } from '../../context/AnimationProvider'


const ProfileEdit = ({onClick}) => {
    const {handleInputChange, checkFieldError, handleError} = useForm()
    const {setShowBackIcon} = useAnimation();
    const {personalInformation, token, getInformation} = useAuth()

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

    const [profile, setP] = useState(null)

    const [errorData, setErrorData] = useState({
        profileimage: false,
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
            setFormData({...formData, ["profileimage"]: null});

            if (!res.error) {
                alert('Enregistrement réussie !')
            }
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        checkFieldError(errorData)
    }, [errorData])

    useEffect(() => {
        getInformation(token);
        setP(personalInformation?.profile);
        setShowBackIcon(true);
    }, [])
    return (
        <section className="space-y-6 pb-[54px]">
            <SubHeader icon="bi bi-info-circle" name="Modifier les informations"/>
            <form className={`flex flex-col gap-10 shadow`} onSubmit={handleSubmit}>
                <div className="rounded-lg flex flex-col gap-4">
                    <div
                        className="w-full  h-60 bg-black-10 rounded-xl flex flex-col justify-center items-center overflow-hidden">
                        <img
                            className="w-full h-full  object-contain rounded-xl"
                            src={file.path ? file.path : SERVERLINK + '/' + profile}
                            alt="Choisez une image"
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
                    />
                    {personalInformation?.accountId !== 1 && (
                        <TextInput
                            title="Prenom"
                            name="lastname"
                            size="md"
                            className="w-full"
                            onError={handleError(setErrorData)}
                            onChange={(e) => handleInputChange(setFormData, e)}
                            block
                            value={formData.lastname}
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
                    <Button type="submit" block>
                        Enregistrer
                    </Button>
                    <Button type="button" variant="ghost" block onClick={onClick}>
                        Annuler
                    </Button>
                </div>
            </form>
        </section>
    )
}
export default ProfileEdit
