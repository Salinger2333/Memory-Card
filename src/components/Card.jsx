import './Card.css'
export default function Card({ name, iconUrl, onClick}){
  return (
    <div className="card" data-name={name} onClick={onClick}>
      <img src={iconUrl} alt={name} />
      <div className="card-name">{name}</div>
    </div>
  )
}