import React, {useEffect, useState} from 'react'
import OIP from '../../assets/images/OIP.jpg'
import voiture from '../../assets/images/voiture.jpg'
import {Button} from '../../styles/components'
import { useNavigate } from 'react-router-dom'

const CardOffer = ({className, key}) => {

    const navigate = useNavigate()

    return (
        <div key={key} className={`flex flex-col gap-4 shadow-lg rounded-lg p-4 bg-white-100 ${className}`}>
            <div className="flex items-center gap-4 shadow p-1 rounded-sm justify-between">
                <div className=' flex gap-4'>
                    <div className="w-[50px] h-[50px] rounded-[50%]">
                        <img
                            className="w-full h-full object-cover rounded-[50%]"
                            src={OIP}
                            alt="profilimage"
                        />
                    </div>
                    <div className="flex flex-col">
                        <p className=" text-small-1"> RAHARISOA Haingonirina</p>
                        <p className=" text-small-2"> 0340854816</p>
                        <p className=" text-small-3 text-black-30 font-thin italic font-serif">
                            {' '}
                            publié il y a 4min
                        </p>
                    </div>
                </div>
                <div>
              <span className=" bg-primary-100 w-fit  text-small-2 p-1 float-left rounded-md">
                Entreprise
              </span>
                </div>
            </div>

            {/* content publication */}

            <div className="flex flex-col gap-2">
                {/* information */}
                <div className="flex flex-col gap-1">
                    <h3 className=" text-primary-100">Marchandise à transporter</h3>
                    <p className=" text-small-1">
                        {' '}
                        <i className="bi bi-map-fill"></i> De Fianarantsoa vers
                        Tananarive
                    </p>
                    <p className=" text-small-1">
                        <i className="bi bi-calendar2-event"></i> Prévue le 04 août 2024
                    </p>
                    <p className=" text-small-1">
                        <i className="bi bi-truck"></i> 5 tonnes
                    </p>
                    <p className=" text-small-2">
                        {' '}
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum a
                        corrupti saepe debitis explicabo provident nulla est ipsum
                        labore, eos iure voluptas dolor. Minus quo exercitationem ut at
                        recusandae nisi?
                    </p>
                </div>

                <div className=" w-full h-[200px] p-2 overflow-hidden">
                    <img
                        className="w-full h-full object-cover rounded-lg"
                        src={voiture}
                    />
                </div>

                <div>

                    <Button block children='Message' onClick={() => navigate("/message/:id")} className=' bg-primary-100 text-small-1'
                            icon='bi bi-chat-dots'/>

                </div>
            </div>
        </div>
    )
}

export default CardOffer
