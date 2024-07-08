import TextInput from "../../../components/ui/TextInput";
import Button from "../../../components/ui/Button";

const RegisterEntr = () => {
    return (
        <section className="w-fullscreen">
            <div className="flex mt-5 ml-3">
                <span className="w-[5px] h-[100px] bg-maintr-100 mr-2"></span>
                <div>
                    <p className="text-subtitle-2 boxShadow text-gray-100">Creez votre compte</p><br />
                    <p className="text-subtitle-1">Media <span className="text-maintr-100">Trans</span></p>
                </div>
            </div>
            <form className="mt-[10px] flex justify-center items-center">
                <div className="h-[400px] flex">
                    <div className="flex justify-arround items-center">
                        <div className="mr-[200px] text-subtitle-2">
                            <a className="bi bi-arrow-left py-2 px-4 bg-primary-60 rounded-[50%]"></a>
                        </div>
                        <div>
                            <h2 className="text-subtitle-3">Identification</h2>
                            <div className="mb-5 mt-3">
                                <label htmlFor="companynumber" className="text-small-1 text-gray-100">Company Number</label>
                                <TextInput className="w-[275px]" type="text" placeholder="" name="companynumber" id="companynumber" />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="firstname" className="text-small-1 text-gray-100">Nom Entreprise</label>
                                <TextInput className="w-[275px]" type="text" placeholder="" name="firstname" id="firstname" />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="email" className="text-small-1 text-gray-100">Email</label>
                                <TextInput className="w-[275px]" type="text" placeholder="" name="email" id="email" />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="phone" className="text-small-1 text-gray-100">Telephone</label>
                                <TextInput className="w-[275px]" type="text" placeholder="" name="phone" id="phone" />
                            </div>
                        </div>
                        <div>
                            <div className="mb-5">
                                <label htmlFor="adress" className="text-small-1 text-gray-100">Address</label>
                                <TextInput className="w-[275px]" type="text" placeholder="" name="adress" id="adress" />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="bio" className="text-small-1 text-gray-100">Description</label><br />
                                <textarea className="w-[275px] bg-black-10 border-none outline-none p-2 rounded-[10px] text-gray-100" placeholder="" name="bio" id="bio" />
                            </div>
                            <Button className="w-[275px] mt-5">Suivant</Button>
                        </div>
                    </div>
                </div>
            </form>
        </section>
    )
}

export default RegisterEntr;