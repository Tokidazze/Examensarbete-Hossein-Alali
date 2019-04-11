import React from 'react';

const Footer = () => {
  return (
    <footer className='footer'>
      This is a student project. The goal is to make a webshop for online
      purchases
      <br />
      Copyright &copy; {new Date().getFullYear()} ChatShop
    </footer>
  );
};

export default Footer;
