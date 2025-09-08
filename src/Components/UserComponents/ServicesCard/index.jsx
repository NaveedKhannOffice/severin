import React from 'react'
import "./style.css"
import { Card } from 'react-bootstrap'
import { images } from '../../../Assets'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faStar } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";

const ServicesCard = ({ data, showCategory = false }) => {
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
    <Card className="service-card">
      <Card.Img variant="top" src={image} alt={title} />
      <Card.Body className="position-relative p-0 mt-3 pb-2 pb-xxl-3 px-2">
        {showCategory && (
          <div className="category-name mb-2">{category}</div>
        )}
        <div className="d-flex">
          <div className="flex-grow-1">
            <Card.Title><Link to={`${id}`}>{title}</Link></Card.Title>
          </div>
          <div className="flex-shrink-0">
            <div className="price">{price}</div>
          </div>
        </div>
        <div className="d-flex mt-1">
          <div className="flex-grow-1">
            <div className="review-rating">
              <span className="rating fw-light">
                <FontAwesomeIcon icon={faStar} className="me-2" />
                {rating}
              </span>
              <span className="review position-relative">{reviews}</span>
            </div>
          </div>
          { wishList && (
            <div className="flex-shrink-0 align-self-center">
              <button className='wishlist-btn border-0'><FontAwesomeIcon icon={faHeart} /></button>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default ServicesCard