import './advantages-list.scss';
import { FaRegCheckSquare } from 'react-icons/fa';
import { advantagesList } from 'data/advantagesData';

export const AdvantagesList = () => {
  return (
    <ul className="advantages__list">
      {advantagesList.map((advantage, index) => (
        <li className="advantages__list__item" key={index}>
          <FaRegCheckSquare /> {advantage}
        </li>
      ))}
    </ul>
  );
};
