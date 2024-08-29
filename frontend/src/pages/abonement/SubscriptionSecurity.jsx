import { appVariants } from '../../animations/variants';
import { Header } from '../../components/pages/Header';
import { SERVERLINK } from '../../constants';
import { motion } from "framer-motion";
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider';
import { useState } from 'react';

const SubscriptionSecurity = () => {
  const { token, loading, personalInformation } = useAuth();
  const location = useParams();

  const { id, montant } = useParams();

  const user = personalInformation;

  return (
    loading ? (
      <div className="flex h-screen w-full justify-center items-center bg-gray-100">
        <p className="text-gray-900 text-xl font-semibold">Chargement en cours...</p>
      </div>
    ) : !token ? (
      <Navigate to="/login" />
    ) : (
      <section className="relative scrollbar-none bg-gray-100 min-h-screen flex flex-col items-center">
        <Header profileImage={SERVERLINK + "/" + user.profile || "X.png"} />
        <div className="container mx-auto px-4 py-8 flex flex-col items-center mt-16"> {/* Added mt-16 */}
          <motion.section
            className="flex flex-col items-center gap-8"
            variants={appVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="text-center bg-white p-6 rounded-lg shadow-lg mt-6 max-w-4xl w-full bg-white-100">
              <h1 className="text-4xl font-bold text-gray-900">
                <span className="text-primary-100">Résumé</span> de votre paiement
              </h1>
            </div>

            <div className="flex flex-col items-center w-full max-w-4xl gap-6 ">

              {/* Section Récapitulatif */}
              <motion.div
                whileHover={{ scale: 1.02, boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)" }}
                className="w-full bg-white rounded-lg shadow-lg p-6 border border-gray-200 bg-white-100"
              >
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Récapitulatif</h2>
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-100 border-b border-gray-300">
                      <th className="py-3 px-4 text-gray-700 font-medium text-sm">Libellé</th>
                      <th className="py-3 px-4 text-gray-700 font-medium text-sm">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="py-3 px-4 text-gray-900">Abonnement</td>
                      <td className="py-3 px-4 text-gray-700">
                          {id}
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="py-3 px-4 text-gray-900">Nom et prénom</td>
                      <td className="py-3 px-4 text-gray-700">{user.fullName}</td>
                    </tr>
                    <tr className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="py-3 px-4 text-gray-900">Montant à débiter</td>
                      <td className="py-3 px-4 text-gray-700">
                        {montant} Ar
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="py-3 px-4 text-gray-900">Numéro</td>
                      <td className="py-3 px-4 text-gray-700">{user.phone}</td>
                    </tr>
                  </tbody>
                </table>
              </motion.div>


              {/* Section Finalisation Paiement */}
              <motion.div
                whileHover={{ scale: 1.03, boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.15)" }}
                className="w-full bg-white rounded-lg shadow-md p-6 border border-gray-200 bg-white-100"
              >
                <h2 className="text-xl font-semibold mb-4">Finalisation Paiement {location.type}</h2>
                <div className="text-gray-700 mb-4">
                  <p className="mb-4">1 - Veuillez cliquer et exécuter le code
                    {location.type === "Mvola" ? (
                      <a href="tel:%23 111*1*2*0385629423*50000*2*2*2 %23" className="text-primary-100 hover:underline font-bold">*111*1*2*0385629423*50000*2*2*#</a>
                    ) : (
                      <a href="tel:%23 *436*2# %23" className="text-primary-100 hover:underline font-bold">*436*2#</a>
                    )}
                    sur votre mobile {location.type === "Mvola" ? (
                      <span className="text-yellow-400">sans le modifier</span>
                    ) : (
                      <span>et valider le paiement suivant les instructions suivantes : numéro <span className="text-primary-100">033 85 244 25</span>, montant : <span className="text-primary-100">50 000</span> Ariary, référence : peu importe.</span>
                    )}
                  </p>
                  <p className="mb-4">2 - Une fois votre transfert effectué dans le délai imparti, le traitement sera effectué dans les prochaines heures.</p>
                  <p>3 - <span className="text-green-400">Cf CGU Art 3.21</span>, n'exécutez le paiement (1) à partir du numéro 038 05 253 83 que si ce numéro est validé par notre système.</p>
                </div>
                <a href='/abonnement' className="flex justify-end text-primary-100 hover:underline">← Retour</a>
              </motion.div>

            </div>
          </motion.section>
        </div>
      </section>
    )
  );
};

export default SubscriptionSecurity;
