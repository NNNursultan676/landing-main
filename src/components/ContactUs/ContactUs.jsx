import './ContactUs.css'

const ContactUs = () => {
  return (
    <div className='contactUsContainer custom-container mtBlock-md' id="contactUs">
      <div className='contactUs'>
        <div>
          <h1 className='header-5'>Связаться с нами</h1>
          <div className='contactUs-info'>
            <div className='contact'>
              <p className='parapgraph-2'>Телефон </p>
              <b className='paragraph-3'><a href="tel:+7 701 427 80 70">+7 701 427 80 70</a></b>
            </div>
            <div className='contact'>
              <p className='parapgraph-2'>Почта </p>
              <b className='paragraph-3'><a href="tel:+7 701 427 80 70">info@sapatech.kz</a></b>
            </div>
            <div className='contact address'>
              <p className='parapgraph-2'>Адреc </p>
              <p className='paragraph-3'>Алматы, ул. Зейна Шашкина 24, <br />Бизнес центр «K Plaza»</p>
            </div>
          </div>
        </div>
        <div className='map'>
          <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2907.3761568922578!2d76.9312009773613!3d43.22257248017424!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38836f24c6b92751%3A0x8e0755bb3661cfad!2z0YPQu9C40YbQsCDQl9C10LnQvdCwINCo0LDRiNC60LjQvdCwIDI0LCDQkNC70LzQsNGC0YsgMDUwMDYw!5e0!3m2!1sru!2skz!4v1723115930036!5m2!1sru!2skz"
                className='googleMap'
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </div>
    </div>
  )
}

export default ContactUs