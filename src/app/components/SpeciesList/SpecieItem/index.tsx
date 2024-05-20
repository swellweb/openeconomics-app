import Species from "@/model/Species";
interface SpecieProp{
    specie: Species
}
const SpecieItem = ({specie}:SpecieProp) =>{
return (
        <div className="box-item border border-gray-500 border-solid p-3">
          <h3 className="text-2xl">{specie.name}</h3>
          <div className="mt-2 text-base leading-6">
          <p >Categoria: <strong>{specie.category}</strong></p>
          <p>Classe: {specie.classes}</p>
          <p>Misure di Conservazione: {specie.measures}</p>
          </div>
          
        </div>
      )
}

export default SpecieItem