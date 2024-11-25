import './contact.scss';
import { ContentBox } from 'components/content-box/ContentBox';
import { Content } from 'components/content/Content';
import { ContactMailForm } from 'components/contact-mail-form/ContactMailForm';

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
      <Content isContentAbove={true}>
        <ContentBox title="Kontakt" className="contact--content-box">
          <ContactMailForm />
        </ContentBox>
      </Content>
    </div>
  );
};
