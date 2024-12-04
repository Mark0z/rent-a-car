import './rules.scss';
import { Content } from 'components/content/Content';
import { ContentBox } from 'components/content-box/ContentBox';

export const Rules = () => {
  return (
    <div className="rules">
      <Content className="rules__content">
        <ContentBox className="rules__content__box" title="Zasady najmu">
          <ul>
            <li>
              <h3 className="rules__h3">Dokumenty wymagane do najmu</h3>
              <p className="rules__p">
                Najemca musi okazać ważny dowód osobisty lub paszport oraz prawo jazdy odpowiedniej
                kategorii.
              </p>
            </li>
            <li>
              <h3 className="rules__h3">Minimalny wiek najemcy</h3>
              <p className="rules__p">
                Minimalny wiek najemcy to 21 lat. W przypadku osób poniżej 25 lat może zostać
                naliczona dodatkowa opłata.
              </p>
            </li>
            <li>
              <h3 className="rules__h3">Kaucja</h3>
              <p className="rules__p">
                Przy odbiorze pojazdu wymagana jest wpłata kaucji zwrotnej, której wysokość zależy
                od klasy samochodu.
              </p>
            </li>
            <li>
              <h3 className="rules__h3">Czas trwania najmu</h3>
              <p className="rules__p">
                Minimalny okres wynajmu wynosi 24 godziny. Zwrot po upływie ustalonego terminu
                skutkuje naliczeniem dodatkowych opłat.
              </p>
            </li>
            <li>
              <h3 className="rules__h3">Stan techniczny pojazdu</h3>
              <p className="rules__p">
                Samochód wydawany jest z pełnym bakiem i w dobrym stanie technicznym. Najemca
                zobowiązany jest zwrócić pojazd w takim samym stanie.
              </p>
            </li>
            <li>
              <h3 className="rules__h3">Zakres użytkowania</h3>
              <p className="rules__p">
                Samochód może być używany wyłącznie na terytorium wskazanym w umowie. Jazda pod
                wpływem alkoholu lub środków odurzających jest surowo zabroniona.
              </p>
            </li>
            <li>
              <h3 className="rules__h3">Ubezpieczenie</h3>
              <p className="rules__p">
                Pojazdy są ubezpieczone. W przypadku uszkodzenia, najemca zobowiązany jest do
                natychmiastowego kontaktu z wypożyczalnią.
              </p>
            </li>
            <li>
              <h3 className="rules__h3">Zwrot pojazdu</h3>
              <p className="rules__p">
                Zwrot samochodu poza godzinami pracy wypożyczalni wymaga wcześniejszego uzgodnienia
                i może wiązać się z dodatkowymi kosztami.
              </p>
            </li>
          </ul>
        </ContentBox>
      </Content>
    </div>
  );
};
