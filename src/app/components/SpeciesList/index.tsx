import React from 'react';
import Species from '@/model/Species'
import SpecieItem from './SpecieItem';

interface SpeciesListProps {
  species: Species[];
}

const SpeciesList: React.FC<SpeciesListProps> = ({ species }) => {
  return (
    <div>
      <h2 className="text-center text-3xl mb-6">Lista delle Specie</h2>
      <div className="grid grid-col-1 md:grid-cols-4 gap-5">
      {species.map((specie, index) => (
         <SpecieItem key={index} specie={specie} />
        ))}
      </div>
    </div>
  );
};

export default SpeciesList;