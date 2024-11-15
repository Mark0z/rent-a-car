import './advantages-list.scss';
import { FaRegCheckSquare } from 'react-icons/fa';

export const AdvantagesList = () => {
  const advantages = [
    'Wygoda i dostępność',
    'Różnorodność pojazdów',
    'Brak długoterminowych zobowiązań',
    'Ubezpieczenie i serwis w cenie'
  ];

  return (
    <div className="advantages-list">
      {advantages.map((advantage, index) => (
        <div className="advantages-list--item" key={index}>
          <FaRegCheckSquare /> {advantage}
        </div>
      ))}
    </div>
  );
};
