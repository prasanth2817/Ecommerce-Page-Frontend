import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const ProductModal = ({ show, handleClose, product }) => {
  return (
    <Modal className="modal-size" show={show} onHide={handleClose} centered backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>{product.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="flex flex-col mx-4 items-start lg:items-center lg:justify-center">
            <div className="flex flex-col lg:flex-row mx-4 justify-between">
          {/* Display the first image */}
          <img
            className="h-48 w-full object-contain mb-4"
            src={`https://res.cloudinary.com/dlovthlr8/image/upload/${product.images[0]}`}
            alt={product.name}
          />
          {/* Display the second image */}
          {product.images[1] && (
            <img
              className="h-48 w-full object-contain mb-4"
              src={`https://res.cloudinary.com/dlovthlr8/image/upload/${product.images[1]}`}
              alt={product.name}
            />
          )}
          </div>
          <p><strong>Brand:</strong> {product.brand}</p>
          <p><strong>Price:</strong> Rs. {product.price}</p>
          <p><strong>Description:</strong> {product.description}</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductModal;