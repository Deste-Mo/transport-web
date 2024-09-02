
import Button from "../../components/ui/Button.jsx";


const Labo = () => {

  const handleClick = () => {};

  return (
<Button 
    block // Élargit la largeur du bouton en fonction de son parent.
    disabled // Si true, le bouton sera désactivé.
    icon="bi bi-person" // Affiche une icône (par exemple ici une icône représentant une personne).
    loading // Si true, une animation de chargement sera affichée sur le bouton.
    onClick={handleClick} // Déclenche des événements lors du clic sur le bouton.
    variant="primary" // Applique un style spécifique au bouton (par exemple "primary" pour un bouton principal).
    rounded="xl" // Définit le rayon des coins du bouton pour lui donner un aspect arrondi.
    size="md" // Définit la taille du bouton (par exemple "md" pour taille moyenne).
></Button>
    )
};

export default Labo;
