import '../styles/Card.scss';

export default function Card({ id, name, sprite, onClick }) {
  return (
    <button className="pokemon-card" data-id={id} data-name={name} onClick={onClick}>
      <img className="pokemon-card__sprite" src={sprite} alt="" />
      <h2 className="pokemon-card__name">{name}</h2>
    </button>
  );
}
