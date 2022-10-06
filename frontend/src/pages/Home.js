import axios from "axios";
import { useState, useEffect } from "react";

const Home = () => {
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/argonaute", {
        name: name,
      });
      setName("");
      console.log(response.data);
    } catch (error) {
      if (error.response.status === 401) {
        setErrorMessage("Veuillez saisir le nom d'un Argonaute");
      } else if (error.response.status === 402) {
        setErrorMessage("Cet Argonaute existe déjà !");
      }
    }
  };

  useEffect(() => {
    const fetchArgonaute = async () => {
      const response = await axios.get(
        `http://localhost:3000/allTheArgonautes`
      );
      setData(response.data);
      console.log(response.data);
      setIsLoading(false);
    };
    fetchArgonaute();
  }, [data]);

  return (
    <main className="container">
      <h2>Ajouter un(e) Argonaute</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Nom de l'Argonaute</label>
        <input
          type="text"
          placeholder="Charalampos"
          name="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setErrorMessage("");
          }}
        />
        <button type="submit">Envoyer</button>
        <p style={{ fontSize: 12, color: "#FF4655", marginTop: 10 }}>
          {errorMessage}
        </p>
      </form>
      <h2>Membres de l'équipage</h2>
      {isLoading === true ? (
        <p>Argonautes en cours de chargement</p>
      ) : (
        <ul className="row-names">
          {data.map((argonaute, index) => {
            return <li key={index}>{argonaute.name}</li>;
          })}
        </ul>
      )}
    </main>
  );
};

export default Home;
