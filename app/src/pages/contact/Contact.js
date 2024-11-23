import './contact.scss';
import { ContentBox } from 'components/content-box/ContentBox';
import { Content } from 'components/content/Content';

export const Contact = () => {
  return (
    <div className="contact">
      <div className="contact--map">
        <iframe
          className="contact--iframe"
          src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=ul.%20R%C3%B3wna%2013%20%2080-067%20Gda%C5%84sk+(Siedziba)&amp;t=&amp;z=16&amp;ie=UTF8&amp;iwloc=B&amp;output=embed">
          <a href="https://www.gps.ie/">gps systems</a>
        </iframe>
      </div>
      <Content>
        <ContentBox title="Kontakt" className="contact--content-box"></ContentBox>
      </Content>
    </div>
  );
};
