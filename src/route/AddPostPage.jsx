// importiamo la libreria axios per effettuare le chiamate Api
import axios from "axios";

// importiamo useState
import { useState } from "react";

// endpoint
const endpoint = 'http://localhost:3000/posts'

const initialFormData = {
    //aggiungiamo tutte le proprietà che vogliamo mappare e assegniamo loro un valore iniziale.
    title: "",
    content: "",
    image: "",
    tags: [],
    pubblicato: false,
}

export default function AddPostPage() {

    // creiamo una variabile di stato che sarà riempita dell'oggetto sopra indicato
    const [formData, setFormData] = useState(initialFormData);

    // Creiamo una funzione unica per gestire l'evento onChange dei nostri campi.
    function handleFormData(event) {
        // gestiamo il valore se è preso da checkbox (true|false) oppure da text (stringhe)
        const value = event.target.type === "checkbox" ?

            // condizione del valore di uscita
            event.target.checked : event.target.name === 'tags' ? event.target.value.split(",") : event.target.value;

        // all'avvio della funzione richiama currentForm Data
        setFormData((currentformData) => ({
            // prendi tutto l'array 
            ...currentformData,
            // aggiungi porpietà:valore
            [event.target.name]: value
        }));
    }

    // Creiamo una funzione unica per gestire l'invio del form.
    const handleSubmitForm = (e) => {
        e.preventDefault()

        // FRONT END CONNESSO A BACK END
        // Chiamata api in post con invio dati del nuovo articolo
        // fai una richiesta in post con endpoint e i dati che ti invio corrispondono a form data
        axios.post(endpoint, formData)
            .then(res => {

                // SOLO SE FORM E OUTPUT SONO NELLA STESSA PAGINA
                // uso la risposta api per prendere gli articoli e gli aggiungo i nuovi dati del form 
                // setArticols((currentArticols) => [...currentArticols, res.data])
            })

            .catch((error) => {
                console.error("Errore durante il recupero dei dati:", error);
            });

        setFormData(initialFormData)
    }

    return (


        <div className="container">
            <h2>Inserisci un Nuovo articolo</h2>
            {/* PARTE OUTPUT FORM */}
            <form className="form-articoli"
                onSubmit={handleSubmitForm}>
                {/* input titolo */}
                <input
                    type="text"
                    // questo sara event.target.name
                    name="title"
                    // questo sarà event.target.value
                    // lo riempiamo con il valore corretto della proprietà mappata
                    value={formData.title}
                    onChange={handleFormData}
                    placeholder="Inserisci il titolo"
                />


                {/* input categoria */}
                <input
                    type="text"
                    // questo sara event.target.name
                    name="tags"
                    // questo sarà event.target.value
                    // lo riempiamo con il valore corretto della proprietà mappata
                    value={formData.tags}
                    onChange={handleFormData}
                    placeholder="Inserisci i tags"
                />


                {/* input contenuto */}
                <textarea
                    type="textarea"
                    // questo sara event.target.name
                    name="content"
                    // questo sarà event.target.value
                    // lo riempiamo con il valore corretto della proprietà mappata
                    value={formData.content}
                    onChange={handleFormData}
                    placeholder="Inserisci il contenuto"
                />

                {/* input autore */}
                <input
                    type="textarea"
                    // questo sara event.target.name
                    name="image"
                    // questo sarà event.target.value
                    // lo riempiamo con il valore corretto della proprietà mappata
                    value={formData.image}
                    onChange={handleFormData}
                    placeholder="Inserisci l'url dell'immagine"
                />
                <div className="d-flex justify-content-center">
                    <input
                        name="pubblicato"
                        checked={formData.pubblicato}
                        onChange={handleFormData}
                        className="mx-2 my-0"
                        type="checkbox"
                    />
                    <label htmlFor="pubblicato">Pubblicato</label>
                </div>
                <div className="box-btn">
                    <button type="submit" className="btn btn-secondary btn-lg">
                        Aggiungi Articolo
                    </button>
                </div>

            </form>
        </div>
    )
}