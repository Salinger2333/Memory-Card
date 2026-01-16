export default function Card({ name, iconUrl}){
  return (
    <div className="card" id={name}>
      <img src={iconUrl} alt={name} />
    </div>
  )
}