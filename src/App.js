import { Form, Container, Button, Row, Col } from 'react-bootstrap';
import CreatableSelect from 'react-select/creatable';
import React, { useState } from 'react';
import { v4 } from 'uuid'
import { fileStore, metaDataStore } from './config/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';

function App() {

  const [inOptions, setInOptions] = useState([]);
  const [exOptions, setExOptions] = useState([]);
  const [eventName, setEventName] = useState('');
  const [eventPlace, setEventPlace] = useState('');
  const [description, setDescriptions] = useState('');
  const [eventDate, setEventDate] = useState(new Date());

  const [disabled, setDisabled] = useState(true)
  const [message, setMessage] = useState(false)

  const [imgUrl, setImgUrl] = useState('');

  const [isLogged, setIsLogged] = useState(false)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleFileUpload = (e) => {

    const imgs = ref(fileStore, `Imgs/${v4()}`)
    uploadBytes(imgs, e.target.files[0]).then(data => {
      getDownloadURL(data.ref).then(val => {

        setImgUrl(val)
        setDisabled(false)
      })
    }).catch(err => {
      alert(err)
    })
  }

  const onSubmitEvent = async () => {
    const valRef = collection(metaDataStore, 'metaData')
    try {
      await addDoc(valRef, {
        eventName,
        place: eventPlace,
        description,
        include: JSON.stringify(inOptions),
        exclude: JSON.stringify(exOptions),
        eventDate: eventDate,
        img: imgUrl
      })
      setEventName('')
      setDescriptions('')
      setExOptions([])
      setInOptions([])
      setImgUrl('')
      setEventDate('')
      setEventPlace('')
      alert("Submission Succesfull")
    } catch (error) {
      alert(error)
    }

  }
  return (
    <Container className='mt-4'>
      {!isLogged ? <Form>
        {message && <p style={{color:'red'}}>Invalid Email or password</p>}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" value = {email} onChange={(e) => setEmail(e.target.value)} />

        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" value = {password} onChange={(e) => setPassword(e.target.value)}/>
        </Form.Group>
        <Button variant="primary" onClick={() => {
          if (email == 'sangmeshktokare@gmail.com' && password == 'rishabht123') {
            setIsLogged(true);
          }else {
            setMessage(true)
          }
        }}>
          Submit
        </Button>
      </Form> :

        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Name of the Event</Form.Label>
            <Form.Control type="text" placeholder="Event Name" value={eventName} onChange={(e) => setEventName(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Event Place</Form.Label>
            <Form.Control type="text" placeholder="Event Place" value={eventPlace} onChange={(e) => setEventPlace(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Event Description</Form.Label>
            <Form.Control as="textarea" rows={6} value={description} onChange={(e) => setDescriptions(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Date of the Event</Form.Label>
            <Form.Control type="date" placeholder="Event Date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Inclusions</Form.Label>
            <CreatableSelect isMulti onChange={(e) => setInOptions(e)} value={inOptions} options={inOptions} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Exclusions</Form.Label>
            <CreatableSelect isMulti onChange={(e) => setExOptions(e)} value={exOptions} options={exOptions} />
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Event Image</Form.Label>
            <Form.Control type="file" onChange={handleFileUpload} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Button disabled={disabled} onClick={onSubmitEvent}>Submit</Button>
          </Form.Group>
        </Form>
      }
    </Container>
  );
}

export default App;