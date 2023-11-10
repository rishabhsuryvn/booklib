import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useFirebase } from '../context/Firebase';
import {useNavigate} from 'react-router-dom';

const BookCard = (props) => {
  const firebase = useFirebase();
  const [url, setUrl]= useState(null);
  const navigate = useNavigate();

  useEffect(()=>{
  firebase.getImageUrl(props.imageUrl).then((url)=> setUrl(url));
  },[])

  return (
    <Card style={{ width: '18rem', margin: '15px' }}>
    <Card.Img variant="top" src={url} />
    <Card.Body>
      <Card.Title>{props.name}</Card.Title>
      <Card.Text>
        This book has a title {props.name} and 
        this book is sold by {props.displayName} and 
        this book cost is Rs.{props.price}
      </Card.Text>
      <Button onClick={(e)=> navigate(`/book/view/${props.id}`)} variant="primary">View</Button>
    </Card.Body>
  </Card>
  )
}

export default BookCard
