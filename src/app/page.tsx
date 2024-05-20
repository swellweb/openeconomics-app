"use client"
import { useEffect, useState } from 'react';

import SpeciesList from './components/SpeciesList';
import Species from '@/model/Species';
import Loader from './components/Loader';

const Home = () => {
  const [species, setSpecies] = useState<Species[]>([]);
  const [mammals, setMammals] = useState<Species[]>([]);
  const [loading, setLoading] = useState<boolean>(true)
  const [region, setRegion] = useState<string>('')
  useEffect(() => {
    const fetchData = async () => {
      const regionsRes = await fetch('/api/regions');
      const regions = await regionsRes.json();
      const randomRegion = regions[Math.floor(Math.random() * regions.length)];
      
      setRegion(randomRegion.identifier)

      const speciesRes = await fetch(`/api/species?region=${randomRegion.identifier}`);
      let speciesData = await speciesRes.json()
       speciesData = speciesData.slice(0,100);
       const speciesArray = speciesData.map((specie: any) => new Species(specie.scientific_name, specie.category, specie.class_name, ''));

      const criticallyEndangered = speciesArray.filter( (specie:any) => specie.category === 'CR');

      for (const specie of criticallyEndangered) {
        const measuresRes = await fetch(`http://localhost:3000/api/conservation?speciename=${specie.name}`);
        const measuresData = await measuresRes.json();
        specie.measures = measuresData.result?.map((measure: any) => measure.title).join(', ');
      }

      setSpecies(criticallyEndangered);

      const mammalsData = speciesArray.filter( (specie:any) => specie.classes === 'MAMMALIA');
      setMammals(mammalsData);
      setLoading(false)
    };

    fetchData();
    
  }, []);

  return (
    <div>
      <h1 className="text-4xl px-8 py-4">OpenEconomics - Lista Rossa IUCN</h1>
       {loading ? <Loader/> : 
       <>
       <h2 className="text-xl px-8">Region: {region}</h2>
       <div className="my-4 p-9">
      <SpeciesList species={species} />
      </div>
      <div className="my-4 p-9">
      <h2 className="text-3xl text-center p-5">Mammiferi</h2>
      <SpeciesList species={mammals} />
      </div>
      </>
      }
    </div>
  );
};

export default Home;
