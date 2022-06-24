import React, { useContext, useReducer, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Store } from '../Store';
import { toast } from 'react-toastify';
import { getError } from '../utils';
import axios from 'axios';
import { Row, Col } from "react-bootstrap";


const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_REQUEST':
      return { ...state, loadingUpdate: true };
    case 'UPDATE_SUCCESS':
      return { ...state, loadingUpdate: false };
    case 'UPDATE_FAIL':
      return { ...state, loadingUpdate: false };

    default:
      return state;
  }
};

export default function PrescriptionScreen() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const [name, setName] = useState(userInfo.name);
  const [email, setEmail] = useState(userInfo.email);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [{ loadingUpdate }, dispatch] = useReducer(reducer, {
    loadingUpdate: false,
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        '/api/users/prescription',
        {
          name,
          email,
          password,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({
        type: 'UPDATE_SUCCESS',
      });
      ctxDispatch({ type: 'USER_SIGNIN', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      toast.success('User updated successfully');
    } catch (err) {
      dispatch({
        type: 'FETCH_FAIL',
      });
      toast.error(getError(err));
    }
  };

  return (

    <div className="container small-container">
      <Helmet>
        <title>Prescription</title>
      </Helmet>
      <h1 className="my-5 pt-5 pb-5">What is your prescription?</h1>
      <form onSubmit={submitHandler} >
        <Row className="mb-3 pb-3 pt-4 text-muted bg-info text-dark bg-opacity-10">
          <Form.Group as={Col} className="mb-3" controlId="OD-R">
            <Form.Label className="mt-3 pt-3 fs-5">OD (Right eye)</Form.Label>
          </Form.Group>
          <Form.Group as={Col} controlId="Sphere">
            <Form.Label>Sphere(SPH)</Form.Label>
            <Form.Select defaultValue="0.00">
              <option>0.00</option>
              <option>-16.00</option>
              <option>-15.75</option>
              <option>-15.50</option>
              <option>-15.25</option>
              <option>-15.00</option>
              <option>-14.75</option>
              <option>-14.50</option>
              <option>-14.25</option>
              <option>-14.00</option>
              <option>-13.75</option>
              <option>-13.50</option>
              <option>-13.25</option>
              <option>-13.00</option>
              <option>-12.75</option>
              <option>-12.50</option>
              <option>-12.25</option>
              <option>-12.00</option>
              <option>-11.75</option>
              <option>-11.50</option>
              <option>-11.25</option>
              <option>-11.00</option>
              <option>-10.75</option>
              <option>-10.50</option>
              <option>-10.25</option>
              <option>-10.00</option>
              <option>-9.75</option>
              <option>-9.50</option>
              <option>-9.25</option>
              <option>-9.00</option>
              <option>-8.75</option>
              <option>-8.50</option>
              <option>-8.25</option>
              <option>-8.00</option>
              <option>-7.75</option>
              <option>-7.50</option>
              <option>-7.25</option>
              <option>-7.00</option>
              <option>-6.75</option>
              <option>-6.50</option>
              <option>-6.25</option>
              <option>-6.00</option>
              <option>-5.75</option>
              <option>-5.50</option>
              <option>-5.25</option>
              <option>-5.00</option>
              <option>-4.75</option>
              <option>-4.50</option>
              <option>-4.25</option>
              <option>-4.00</option>
              <option>-3.75</option>
              <option>-3.50</option>
              <option>-3.25</option>
              <option>-3.00</option>
              <option>-2.75</option>
              <option>-2.50</option>
              <option>-2.25</option>
              <option>-2.00</option>
              <option>-1.75</option>
              <option>-1.50</option>
              <option>-1.25</option>
              <option>-1.00</option>
              <option>-0.75</option>
              <option>-0.50</option>
              <option>-0.25</option>
              <option>+0.25</option>
              <option>+0.50</option>
              <option>+0.75</option>
              <option>+1.00</option>
              <option>+1.25</option>
              <option>+1.50</option>
              <option>+1.75</option>
              <option>+2.00</option>
              <option>+2.25</option>
              <option>+2.50</option>
              <option>+2.75</option>
              <option>+3.00</option>
              <option>+3.25</option>
              <option>+3.50</option>
              <option>+3.75</option>
              <option>+4.00</option>
              <option>+4.25</option>
              <option>+4.50</option>
              <option>+4.75</option>
              <option>+5.00</option>
              <option>+5.25</option>
              <option>+5.50</option>
              <option>+5.75</option>
              <option>+6.00</option>
              <option>+6.25</option>
              <option>+6.50</option>
              <option>+6.75</option>
              <option>+7.00</option>
              <option>+7.25</option>
              <option>+7.50</option>
              <option>+7.75</option>
              <option>+8.00</option>
              <option>+8.25</option>
              <option>+8.50</option>
              <option>+8.75</option>
              <option>+9.00</option>
              <option>+9.25</option>
              <option>+9.50</option>
              <option>+9.75</option>
              <option>+10.00</option>
              <option>+10.25</option>
              <option>+10.50</option>
              <option>+10.75</option>
              <option>+11.00</option>
              <option>+11.25</option>
              <option>+11.50</option>
              <option>+11.75</option>
              <option>+12.00</option>
            </Form.Select>
          </Form.Group>
          <Form.Group as={Col} controlId="Cylinder-R">
            <Form.Label>Cylinder(CYL)</Form.Label>
            <Form.Select defaultValue="0.00">
              <option>0.00</option>
              <option>-6.00</option>
              <option>-5.75</option>
              <option>-5.50</option>
              <option>-5.25</option>
              <option>-5.00</option>
              <option>-4.75</option>
              <option>-4.50</option>
              <option>-4.25</option>
              <option>-4.00</option>
              <option>-3.75</option>
              <option>-3.50</option>
              <option>-3.25</option>
              <option>-3.00</option>
              <option>-2.75</option>
              <option>-2.50</option>
              <option>-2.25</option>
              <option>-2.00</option>
              <option>-1.75</option>
              <option>-1.50</option>
              <option>-1.25</option>
              <option>-1.00</option>
              <option>-0.75</option>
              <option>-0.50</option>
              <option>-0.25</option>
              <option>0.00</option>
              <option>+0.25</option>
              <option>+0.50</option>
              <option>+0.75</option>
              <option>+1.00</option>
              <option>+1.25</option>
              <option>+1.50</option>
              <option>+1.75</option>
              <option>+2.00</option>
              <option>+2.25</option>
              <option>+2.50</option>
              <option>+2.75</option>
              <option>+3.00</option>
              <option>+3.25</option>
              <option>+3.50</option>
              <option>+3.75</option>
              <option>+4.00</option>
              <option>+4.25</option>
              <option>+4.50</option>
              <option>+4.75</option>
              <option>+5.00</option>
              <option>+5.25</option>
              <option>+5.50</option>
              <option>+5.75</option>
              <option>+6.00</option>
            </Form.Select>
          </Form.Group>
          <Form.Group as={Col} controlId="Axis-R">
            <Form.Label>Axis</Form.Label>
            <Form.Control />
          </Form.Group>
          <Form.Group as={Col} controlId="ADD-R">
            <Form.Label>ADD</Form.Label>
            <Form.Select defaultValue="n/a">
              <option>n/a</option>
              <option>+0.25</option>
              <option>+0.50</option>
              <option>+0.75</option>
              <option>+1.00</option>
              <option>+1.25</option>
              <option>+1.50</option>
              <option>+1.75</option>
              <option>+2.00</option>
              <option>+2.25</option>
              <option>+2.50</option>
              <option>+2.75</option>
              <option>+3.00</option>
              <option>+3.25</option>
              <option>+3.50</option>
              <option>+3.75</option>
              <option>+4.00</option>
              <option>+4.25</option>
              <option>+4.50</option>
              <option>+4.75</option>
              <option>+5.00</option>
              <option>+5.25</option>
              <option>+5.50</option>
              <option>+5.75</option>
              <option>+6.00</option>
              <option>+6.25</option>
              <option>+6.50</option>
              <option>+6.75</option>
              <option>+7.00</option>
              <option>+7.25</option>
              <option>+7.50</option>
              <option>+7.75</option>
              <option>+8.00</option>
            </Form.Select>
          </Form.Group>
        </Row>
        <Row className="mb-3 pb-2 pt-2 text-muted bg-info text-dark bg-opacity-10">
          <Form.Group as={Col} className="mb-3" controlId="OS">
            <Form.Label className="mt-3 pt-3 fs-5">OS (Left eye)</Form.Label>
          </Form.Group>
          <Form.Group as={Col} controlId="Sphere-L">
            <Form.Label>Sphere(SPH)</Form.Label>
            <Form.Select defaultValue="0.00">
              <option>0.00</option>
              <option>-16.00</option>
              <option>-15.75</option>
              <option>-15.50</option>
              <option>-15.25</option>
              <option>-15.00</option>
              <option>-14.75</option>
              <option>-14.50</option>
              <option>-14.25</option>
              <option>-14.00</option>
              <option>-13.75</option>
              <option>-13.50</option>
              <option>-13.25</option>
              <option>-13.00</option>
              <option>-12.75</option>
              <option>-12.50</option>
              <option>-12.25</option>
              <option>-12.00</option>
              <option>-11.75</option>
              <option>-11.50</option>
              <option>-11.25</option>
              <option>-11.00</option>
              <option>-10.75</option>
              <option>-10.50</option>
              <option>-10.25</option>
              <option>-10.00</option>
              <option>-9.75</option>
              <option>-9.50</option>
              <option>-9.25</option>
              <option>-9.00</option>
              <option>-8.75</option>
              <option>-8.50</option>
              <option>-8.25</option>
              <option>-8.00</option>
              <option>-7.75</option>
              <option>-7.50</option>
              <option>-7.25</option>
              <option>-7.00</option>
              <option>-6.75</option>
              <option>-6.50</option>
              <option>-6.25</option>
              <option>-6.00</option>
              <option>-5.75</option>
              <option>-5.50</option>
              <option>-5.25</option>
              <option>-5.00</option>
              <option>-4.75</option>
              <option>-4.50</option>
              <option>-4.25</option>
              <option>-4.00</option>
              <option>-3.75</option>
              <option>-3.50</option>
              <option>-3.25</option>
              <option>-3.00</option>
              <option>-2.75</option>
              <option>-2.50</option>
              <option>-2.25</option>
              <option>-2.00</option>
              <option>-1.75</option>
              <option>-1.50</option>
              <option>-1.25</option>
              <option>-1.00</option>
              <option>-0.75</option>
              <option>-0.50</option>
              <option>-0.25</option>
              <option>+0.25</option>
              <option>+0.50</option>
              <option>+0.75</option>
              <option>+1.00</option>
              <option>+1.25</option>
              <option>+1.50</option>
              <option>+1.75</option>
              <option>+2.00</option>
              <option>+2.25</option>
              <option>+2.50</option>
              <option>+2.75</option>
              <option>+3.00</option>
              <option>+3.25</option>
              <option>+3.50</option>
              <option>+3.75</option>
              <option>+4.00</option>
              <option>+4.25</option>
              <option>+4.50</option>
              <option>+4.75</option>
              <option>+5.00</option>
              <option>+5.25</option>
              <option>+5.50</option>
              <option>+5.75</option>
              <option>+6.00</option>
              <option>+6.25</option>
              <option>+6.50</option>
              <option>+6.75</option>
              <option>+7.00</option>
              <option>+7.25</option>
              <option>+7.50</option>
              <option>+7.75</option>
              <option>+8.00</option>
              <option>+8.25</option>
              <option>+8.50</option>
              <option>+8.75</option>
              <option>+9.00</option>
              <option>+9.25</option>
              <option>+9.50</option>
              <option>+9.75</option>
              <option>+10.00</option>
              <option>+10.25</option>
              <option>+10.50</option>
              <option>+10.75</option>
              <option>+11.00</option>
              <option>+11.25</option>
              <option>+11.50</option>
              <option>+11.75</option>
              <option>+12.00</option>
            </Form.Select>
          </Form.Group>
          <Form.Group as={Col} controlId="Cylinder-L">
            <Form.Label>Cylinder(CYL)</Form.Label>
            <Form.Select defaultValue="0.00">
              <option>0.00</option>
              <option>-6.00</option>
              <option>-5.75</option>
              <option>-5.50</option>
              <option>-5.25</option>
              <option>-5.00</option>
              <option>-4.75</option>
              <option>-4.50</option>
              <option>-4.25</option>
              <option>-4.00</option>
              <option>-3.75</option>
              <option>-3.50</option>
              <option>-3.25</option>
              <option>-3.00</option>
              <option>-2.75</option>
              <option>-2.50</option>
              <option>-2.25</option>
              <option>-2.00</option>
              <option>-1.75</option>
              <option>-1.50</option>
              <option>-1.25</option>
              <option>-1.00</option>
              <option>-0.75</option>
              <option>-0.50</option>
              <option>-0.25</option>
              <option>0.00</option>
              <option>+0.25</option>
              <option>+0.50</option>
              <option>+0.75</option>
              <option>+1.00</option>
              <option>+1.25</option>
              <option>+1.50</option>
              <option>+1.75</option>
              <option>+2.00</option>
              <option>+2.25</option>
              <option>+2.50</option>
              <option>+2.75</option>
              <option>+3.00</option>
              <option>+3.25</option>
              <option>+3.50</option>
              <option>+3.75</option>
              <option>+4.00</option>
              <option>+4.25</option>
              <option>+4.50</option>
              <option>+4.75</option>
              <option>+5.00</option>
              <option>+5.25</option>
              <option>+5.50</option>
              <option>+5.75</option>
              <option>+6.00</option>
            </Form.Select>
          </Form.Group>
          <Form.Group as={Col} controlId="Axis-L">
            <Form.Label>Axis</Form.Label>
            <Form.Control />
          </Form.Group>
          <Form.Group as={Col} controlId="ADD-L">
            <Form.Label>ADD</Form.Label>
            <Form.Select defaultValue="n/a">
              <option>n/a</option>
              <option>+0.25</option>
              <option>+0.50</option>
              <option>+0.75</option>
              <option>+1.00</option>
              <option>+1.25</option>
              <option>+1.50</option>
              <option>+1.75</option>
              <option>+2.00</option>
              <option>+2.25</option>
              <option>+2.50</option>
              <option>+2.75</option>
              <option>+3.00</option>
              <option>+3.25</option>
              <option>+3.50</option>
              <option>+3.75</option>
              <option>+4.00</option>
              <option>+4.25</option>
              <option>+4.50</option>
              <option>+4.75</option>
              <option>+5.00</option>
              <option>+5.25</option>
              <option>+5.50</option>
              <option>+5.75</option>
              <option>+6.00</option>
              <option>+6.25</option>
              <option>+6.50</option>
              <option>+6.75</option>
              <option>+7.00</option>
              <option>+7.25</option>
              <option>+7.50</option>
              <option>+7.75</option>
              <option>+8.00</option>
            </Form.Select>
          </Form.Group>
        </Row>
        <Row className="mb-3 pb-4 pt-3 text-muted bg-info text-dark bg-opacity-10">
          <Form.Group as={Col} className="mb-3" controlId="PD-R">
            <Form.Label className="mt-3 pt-2 fs-5">PD (Pupillary Distance)</Form.Label>
          </Form.Group>
          <Form.Group as={Col} controlId="RPD">
            <Form.Label></Form.Label>
            <Form.Select defaultValue="Right PD">
              <option>Right PD</option>
              <option>23.0</option>
              <option>23.5</option>
              <option>24.0</option>
              <option>24.5</option>
              <option>25.0</option>
              <option>25.5</option>
              <option>26.0</option>
              <option>26.5</option>
              <option>27.0</option>
              <option>27.5</option>
              <option>28.0</option>
              <option>28.5</option>
              <option>29.0</option>
              <option>29.5</option>
              <option>30.0</option>
              <option>30.5</option>
              <option>31.0</option>
              <option>31.5</option>
              <option>32.0</option>
              <option>32.5</option>
              <option>33.0</option>
              <option>33.5</option>
              <option>34.0</option>
              <option>34.5</option>
              <option>35.0</option>
              <option>35.5</option>
              <option>36.0</option>
              <option>36.5</option>
              <option>37.0</option>
              <option>37.5</option>
              <option>38.0</option>
              <option>38.5</option>
              <option>39.0</option>
              <option>39.5</option>
              <option>40.0</option>
            </Form.Select>
          </Form.Group>
          <Form.Group as={Col} controlId="LPD">
            <Form.Label></Form.Label>
            <Form.Select defaultValue="Left PD">
              <option>Left PD</option>
              <option>25.0</option>
              <option>25.5</option>
              <option>26.0</option>
              <option>26.5</option>
              <option>27.0</option>
              <option>27.5</option>
              <option>28.0</option>
              <option>28.5</option>
              <option>29.0</option>
              <option>29.5</option>
              <option>30.0</option>
              <option>30.5</option>
              <option>31.0</option>
              <option>31.5</option>
              <option>32.0</option>
              <option>32.5</option>
              <option>33.0</option>
              <option>33.5</option>
              <option>34.0</option>
              <option>34.5</option>
              <option>35.0</option>
              <option>35.5</option>
              <option>36.0</option>
              <option>36.5</option>
              <option>37.0</option>
              <option>37.5</option>
              <option>38.0</option>
              <option>38.5</option>
              <option>39.0</option>
              <option>39.5</option>
              <option>40.0</option>
            </Form.Select>
          </Form.Group>
        </Row>

        <Form.Group as={Col} className="mb-3" controlId="Name">

          <Form.Label>Name</Form.Label>
          <Form.Control
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>
        <div className="mb-3">
          <Button type="submit">Update</Button>
        </div>
      </form>
    </div>
  );
}