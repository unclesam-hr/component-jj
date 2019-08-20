import React from 'react';

const BreadCrumbs = (props) => (
  <div className="breadcrumb">
    <ul className="breadcrumb-list" className="breadcrumb-list">
      <li>
        <a href="">
          <span id="home">Home</span>
        </a>
      </li>
      <li>
        <a href="">
          <span id="Furniture">Furniture</span>
        </a>
      </li>
      <li>
        <a href="">
          <span id="LivingRoomChairs">{props.product.type}</span>
        </a>
      </li>
      <li className="breadcrumb-list-current-item">{props.product.productName}</li>
    </ul>
  </div>
);

export default BreadCrumbs;