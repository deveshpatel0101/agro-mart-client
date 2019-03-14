import React from 'react';
import './Home.css';

const Home = () => (
  <div>
    <div>
      <img className="header-image" src="img/header-image.png" alt="" />
    </div>
    <div className="details">
      <div className="col span-1-of-4 box">
        <h3><i className="fal fa-clock"></i>&nbsp;&nbsp;Up to 365 days/year</h3>
        <p>Neverever you think about your holidays we are always here to guide you and we will make best trip for you anytime, anywhere.</p>
      </div>
      <div className="col span-2-of-4 box">
        <h3><i className="fal fa-lemon"></i>&nbsp;&nbsp;100% hygenic food</h3>
        <p>We always keep care about our customer's health so we will definitely give hygenic & best dishes to our customers. </p>
      </div>
      <div className="col span-3-of-4 box">
        <h3><i className="fal fa-handshake"></i>&nbsp;&nbsp;Best Deal</h3>
        <p>Get a best deal from pleasure trip which will always for famliy & friends.</p>
      </div>
      <div className="col span-4-of-4 box">
        <h3><i className="fal fa-credit-card"></i>&nbsp;&nbsp;Secure Payments</h3>
        <p>We are using a best security for payments purpose through which our user willn't get any problem.</p>
      </div>
    </div>

    <div className="footer">
      <i className="fab fa-facebook-f"></i>
      <i className="fab fa-instagram"></i>
      <i className="fab fa-youtube"></i>
      <i className="fab fa-twitter"></i>
    </div>
  </div>
);

export default Home;