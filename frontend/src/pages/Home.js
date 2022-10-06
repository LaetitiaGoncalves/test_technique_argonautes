const Home = () => {
  return (
    <main className="container">
      <h2>Ajouter un(e) Argonaute</h2>
      <form>
        <label htmlFor="name">Nom de l'Argonaute</label>
        <input type="text" placeholder="Charalampos" name="name" />
        <button type="submit">Envoyer</button>
      </form>
      <h2>Membres de l'équipage</h2>
    </main>
  );
};

export default Home;
