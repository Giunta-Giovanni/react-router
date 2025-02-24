// importiamo la libreria axios per effettuare le chiamate Api
import axios from "axios";

// importiamo useState e lo useEffect
import { useState, useEffect } from "react";


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

export default function PostsPage() {


    // creiamo una variabile di stato che conterrà il nostro array di oggetti
    const [articols, setArticols] = useState([])
    console.table(articols)

    // Funzione di richiesta Api
    function fetchArticols() {
        // richiesta di chiamata a localhost 3000
        axios.get(endpoint)
            // prendi i dati di risposta e inseriscili a res.data
            .then((res) => setArticols(res.data),

            )

            .catch((error) => {
                console.error("Errore durante il recupero dei dati:", error);
            });

    }


    // chiamata api effettuata all'avvio del server
    useEffect(() => { fetchArticols() }, []);



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

                // uso la risposta api per prendere gli articoli e gli aggiungo i nuovi dati del form 
                setArticols((currentArticols) => [...currentArticols, res.data])
            })

            .catch((error) => {
                console.error("Errore durante il recupero dei dati:", error);
            });

        setFormData(initialFormData)
    }


    // funzione di rimozione dei post
    function removeArticols(id) {

        // filter sull'array
        const updateArticols = articols.filter(articol => {
            return articol.id !== id
        })

        // chiamata ad api sulla rotta di delete con parametro dinamico id
        axios.delete(`${endpoint}/${id}`)

            .then(res =>
                // aggiorna gli articoli 
                console.log(res),
                // lo gestiamo anche nel front end
                setArticols(updateArticols)
            )

            .catch((error) => {
                console.error("Errore durante il recupero dei dati:", error);
            });




    }

    return (
        <section className="section-articoli">
            {/* contenitore esterno */}
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


                {/* PARTE OUTPUT ARTICOLI*/}
                {/* condizione di output */}
                {articols.length === 0 ?

                    // CONDIZIONE VERA
                    <h2 className="m-3">Non ci sono Articoli</h2>
                    // Altrimenti
                    :
                    // CONDIZIONE FALSA
                    <div className="box-articoli">

                        {/* singolo articolo*/}
                        {/* effettuiamo map su articols che è il nostro array dinamico */}
                        {articols.map(articolo => (
                            <div key={articolo.id} className="toast d-block">

                                {/* contenitore header */}
                                <div className="toast-header">
                                    {/* titolo */}
                                    <strong className="me-auto">{articolo.title}</strong>

                                    {/* condizione per badge pubblicato*/}
                                    {articolo.pubblicato ?
                                        // se è vero badge verde
                                        <span className="badge text-bg-success mx-2 p-2">
                                            Pubblicato
                                        </span>
                                        // altrimento
                                        :
                                        // se è falso badge rosso
                                        <span className="badge text-bg-danger mx-2 p-2">
                                            Non pubblicato
                                        </span>}

                                    {/* button delete */}
                                    <button
                                        type="button"
                                        className="btn-close"
                                        data-bs-dismiss="toast"
                                        aria-label="Close"
                                        // onclick con funzione inserita in una callback function per prevenire attivazione automatica
                                        onClick={() => removeArticols(articolo.id)}
                                    >

                                    </button>
                                </div>

                                {/* contenitore corpo */}
                                <div className="toast-body">

                                    {/* contenuto */}
                                    <p>{articolo.content}</p>
                                    {/* immagine */}
                                    <div className="box-articolo-image">
                                        <img src={articolo.image} alt={articolo.title} />
                                    </div>


                                    {/* categoria */}
                                    <ul className="category-list">
                                        {articolo.tags?.map((tag, index) => (
                                            <li key={index}>
                                                <a href="#">{tag}</a>
                                            </li>
                                        ))}
                                    </ul>

                                </div>
                            </div>
                        ))}
                    </div>
                }


            </div>
        </section >
    )

}

