import React, {useEffect, useState} from 'react'
import {useForm} from '../../context/FormProvider'
import {
    TextInput,
    SelectInput,
    FileInput,
    Button,
    TextArea,
    Icon,
} from '../../styles/components'
import {SERVERLINK} from '../../constants'
import {useAuth} from '../../context/AuthProvider'
import {SubHeader} from "../../components/pages/SubHeader.jsx";
import {motion} from "framer-motion";
import {appVariants} from '../../animations/variants.js'
import {useApp} from '../../context/AppProvider.jsx'
import {useOffer} from '../../context/OfferProvider.jsx'
import {globalInputVariants} from "../../styles/globals.input.js";


const NewOffer = () => {
    const {handleInputChange, checkFieldError, handleError} = useForm()

    const {getCurrentUserOffers, updateOffer, setUpdateOffer} = useOffer();

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

    const {token, personalInformation} = useAuth();


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

        const {imgUrl, title, description, depart, destination, capacity, scheduledDate} = formData;


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
                body: JSON.stringify({content})
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
                body: JSON.stringify({content})
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
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    useEffect(() => {
        checkFieldError(errorData)
    }, [errorData])

    return (
        <motion.section
            className="space-y-6"
            variants={appVariants} initial="hidden" whileInView="visible" viewport={{once: true}}
        >
            <SubHeader sticky name="Nouvel Offre" icon="bi bi-plus-circle-fill"/>
            <form className='flex flex-col gap-10 p-2  ' onSubmit={e => handleCreateOffer(e)}>
                {/* formulaire parties */}
                <div className="flex flex-col gap-6">
                    <div className=" flex flex-col gap-4">

                        <div
                            className="w-full  h-60 bg-black-10 rounded-xl flex flex-col justify-center items-center overflow-hidden">
                            <img className={'w-full h-full object-cover rounded-xl '} src={file?.path || ''}
                                 alt="Choisez une image"/>
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
                        <TextArea
                            titleIcon="bi bi-pencil"
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
                </div>

                <div className="flex flex-col gap-6">
                    <div className="space-y-2">
                        <div className="text-black-100 dark:text-white-100 text-subtitle-2 flex items-center gap-2">
                            <i className="bi bi-card-checklist"></i>
                            <span>Résumé </span>
                        </div>
                        <p className="text-black-80 text-small-1 dark:text-white-60">Ajoutez un résumé pour augmenter en visibilité</p>
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
                        onchange={(e) => handleInputChange(setFormData, e)}
                        block
                        value={titreData[0]}
                    />
                    <div className='flex gap-4'>
                        <TextInput
                            titleIcon="bi bi-geo-alt"
                            className="w-[45]"
                            name="depart"
                            title="Lieu de départ"
                            placeholder='Entrez le lieu de départ'
                            onError={handleError(setErrorData)}
                            onChange={(e) => handleInputChange(setFormData, e)}
                            value={formData.depart}
                        />
                        <TextInput
                            titleIcon="bi bi-geo-alt"
                            
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
                            titleIcon="bi bi-truck-flatbed"
                            type="number"
                            className=""
                            name="capacity"
                            pattern={/^[0-9]+$/}
                            // pattern={/^\d+(\.\d+)?\s?(kg|tonne|tonnes|Kg)$/}
                            title="Quantité/capacité"
                            onError={handleError(setErrorData)}
                            onChange={(e) => handleInputChange(setFormData, e)}
                            value={formData.capacity}
                        />
                        <div className={`flex flex-col gap-2 justify-start ${globalInputVariants.width}`}>
                            <div className="flex items-center gap-2">
                                 <i className={`bi bi-calendar text-primary-100`}></i>
                                <p className="text-base font-thin text-black-100 dark:text-white-100">Date prévue</p>
                            </div>
                            <input
                                type="date"
                                name="scheduledDate"
                                id="scheduledDate"
                                onChange={handleDateInput}
                                onError={handleError(setErrorData)}
                                value={formData.scheduledDate}
                                className={`h-min  ${globalInputVariants.variant["fill"]} ${globalInputVariants.size["md"]} w-full rounded-xl`}
                            />
                        </div>
                    </div>
                </div>
                <div className='flex  gap-4 w-full'>
                    {
                        localStorage.getItem("offer")
                            ?
                            <Button type='button' onClick={handleUpdateOffer} block children='Modifier'/>
                            :
                            <Button type='submit' block children='Publier'/>
                    }
                    <Button type='button' onClick={reset} block variant="ghost" children='Annuler'/>
                </div>
            </form>
        </motion.section>

    )
}
export default NewOffer
