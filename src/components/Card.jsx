import "./Card.css";
export default function Card({ name, image, onClick }) {
  return (
    <div className="card" data-name={name} onClick={onClick}>
      <img src={image} alt={name} />
      <div className="card-name">{name}</div>
    </div>
  );
}
