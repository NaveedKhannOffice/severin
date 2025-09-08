import React from 'react'
import "./style.css"
import { Card } from 'react-bootstrap'
import { images } from '../../../Assets'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faStar } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";

const ShopCard = ({ data, showCategory = false }) => {
  const {
    id,
    title,
    price,
    rating,
    reviews,
    image,
    wishList = false, 
    category,
  } = data; 

  return (
    <Card className="shop-card">
      <Card.Img variant="top" src={image} alt={title} />
      <Card.Body className="position-relative p-0 mt-3 pb-3 px-2">
        <div className="d-flex">
          <div className="flex-grow-1">
            <Card.Title className='mb-1'><Link to={`${id}`}>{title}</Link></Card.Title>
            {showCategory && (
              <div className="category-name mb-0">{category}</div>
            )}
          </div>
          <div className="flex-shrink-0">
            <div className="price">{price}</div>
          </div>
        </div>
        <div className="flex-shrink-0 align-self-center mt-03 text-end">
          <button className='add-to-cart-btn'>Add to cart</button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ShopCard