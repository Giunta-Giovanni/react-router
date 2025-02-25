import { useParams } from "react-router-dom"
export default function SinglePostPage() {
    // destrutturazione Use params per ricavarmi l'id pagina collegato all'id dell'articolo
    const { id } = useParams();
    return (
        <div>
            questa è la pagina di dettaglio del post:{id}
        </div>
    )

}