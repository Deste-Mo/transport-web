import React, {useEffect, useMemo, useState} from "react";
import { useForm } from "../../context/FormProvider";
import {
  TextInput,
  SelectInput,
  FileInput,
  Button,
  TextArea,
  Icon,
} from "../../styles/components";
import { SERVERLINK, TOAST_TYPE } from "../../constants";
import { useAuth } from "../../context/AuthProvider";
import { SubHeader } from "../../components/pages/SubHeader.jsx";
import { motion } from "framer-motion";
import { appVariants } from "../../animations/variants.js";
import { useApp } from "../../context/AppProvider.jsx";
import { useOffer } from "../../context/OfferProvider.jsx";
import { globalInputVariants } from "../../styles/globals.input.js";
import { useAnimation } from "../../context/AnimationProvider.jsx";
import OfferForm from "./OfferForm.jsx";

const NewOffer = () => {
    return (
        <OfferForm/>
    )
};
export default NewOffer;
