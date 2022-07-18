import React, { useContext, useReducer, useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from 'react-helmet-async';
import { Store } from '../Store';
import { toast } from 'react-toastify';
import { getError } from '../utils';
import {axiosGetAuth, axiosPutAuth} from "../components/AxiosHelper"
import { Row, Col, Button, Form, Container } from "react-bootstrap";
import PrescriptionImg from './PrescriptionImg';


const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "UPDATE_REQUEST":
      return { ...state, loadingUpdate: true };
    case "UPDATE_SUCCESS":
      return { ...state, loadingUpdate: false };
    case "UPDATE_FAIL":
      return { ...state, loadingUpdate: false };
    case "UPLOAD_REQUEST":
      return { ...state, loadingUpload: true, errorUpload: "" };
    case "UPLOAD_SUCCESS":
      return {
        ...state,
        loadingUpload: false,
        errorUpload: "",
      };
    case "UPLOAD_FAIL":
      return { ...state, loadingUpload: false, errorUpload: action.payload };

    default:
      return state;
  }
};

export default function PrescriptionScreen() {
  const navigate = useNavigate();
  const params = useParams(); // /prescription/:id
  const { id: prescriptionId } = params;

  const { state } = useContext(Store);
  const { userInfo } = state;
  const [{ loading, error, loadingUpdate, loadingUpload }, dispatch] =
    useReducer(reducer, {
      prescription: [],
      loading: true,
      error: "",
    });
  const [SphereR, setSphereR] = useState("");
  const [CylinderR, setCylinderR] = useState("");
  const [AxisR, setAxisR] = useState("");
  const [ADDR, setADDR] = useState("");
  const [SphereL, setSphereL] = useState("");
  const [CylinderL, setCylinderL] = useState("");
  const [AxisL, setAxisL] = useState("");
  const [ADDL, setADDL] = useState("");
  const [RPD, setRPD] = useState("");
  const [LPD, setLPD] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const endpoint = `/api/prescriptions`
        const { data } = await axiosGetAuth(endpoint,userInfo.token);
        setSphereR(data.SphereR);
        setCylinderR(data.CylinderR);
        setAxisR(data.AxisR);
        setADDR(data.ADDR);
        setSphereL(data.SphereL);
        setCylinderL(data.CylinderL);
        setAxisL(data.AxisL);
        setADDL(data.ADDL);
        setRPD(data.RPD);
        setLPD(data.LPD);

        dispatch({ type: "FETCH_SUCCESS" });
      } catch (err) {
        dispatch({
          type: "FETCH_FAIL",
          payload: getError(err),
        });
      }
    };
    fetchData();
  }, [prescriptionId]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: "UPDATE_REQUEST" });
      const endpoint = `/api/prescriptions`;
      const payload = {
        SphereR,
        CylinderR,
        AxisR,
        ADDR,
        SphereL,
        CylinderL,
        AxisL,
        ADDL,
        RPD,
        LPD
      };
      const { data } = await axiosPutAuth(endpoint, payload, userInfo.token);
      dispatch({
        type: 'UPDATE_SUCCESS',
      });
      toast.success('Prescription updated successfully');
      // navigate("/api/prescriptions");
    } catch (err) {
      dispatch({
        type: 'FETCH_FAIL',
      });
      toast.error(getError(err));
    }
  };

  return (
    <Container >
    <div>
      <PrescriptionImg />
    </div>

    <div className="container small-container">
      <Helmet>
        <title>Prescription</title>
      </Helmet>
      <h1 className="text-center mb-4 mt-5 py-4">What is your prescription?</h1>
      <form onSubmit={submitHandler} >
        <Row className="mb-3 pb-3 pt-4 text-muted bg-info text-dark bg-opacity-10">
          <Form.Group as={Col} className="mb-3" controlId="ODR">
            <Form.Label className="mt-3 pt-3 fs-5">OD (Right eye)</Form.Label>
          </Form.Group>
          <Form.Group as={Col} controlId="SphereR">
            <Form.Label>Sphere(SPH)</Form.Label>
            <Form.Control as="select"
              type="number"
              value={SphereR}
              placeholder="0.00"
              onChange={(e) => setSphereR(e.target.value)}
              required>
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
            </Form.Control>
          </Form.Group>
          <Form.Group as={Col} controlId="CylinderR">
            <Form.Label>Cylinder(CYL)</Form.Label>
            <Form.Control as="select"
              type="number"
              placeholder="0.00"
              value={CylinderR}
              onChange={(e) => setCylinderR(e.target.value)}
              required>
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
            </Form.Control>
          </Form.Group>
          <Form.Group as={Col} controlId="AxisR">
            <Form.Label>Axis</Form.Label>
            <Form.Control
              type="number"
              placeholder="0"
              value={AxisR}
              onChange={(e) => setAxisR(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group as={Col} controlId="ADDR">
            <Form.Label>ADD</Form.Label>
            <Form.Control as="select"
              type="number"
              placeholder="n/a"
              value={ADDR}
              onChange={(e) => setADDR(e.target.value)}
              required>
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
            </Form.Control>
          </Form.Group>
        </Row>
        <Row className="mb-3 pb-2 pt-2 text-muted bg-info text-dark bg-opacity-10">
          <Form.Group as={Col} className="mb-3" controlId="OS">
            <Form.Label className="mt-3 pt-3 fs-5">OS (Left eye)</Form.Label>
          </Form.Group>
          <Form.Group as={Col} controlId="SphereL">
            <Form.Label>Sphere(SPH)</Form.Label>
            <Form.Control as="select"
              type="number"
              placeholder="0.00"
              value={SphereL}
              onChange={(e) => setSphereL(e.target.value)}
              required>
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
            </Form.Control>
          </Form.Group>
          <Form.Group as={Col} controlId="CylinderL">
            <Form.Label>Cylinder(CYL)</Form.Label>
            <Form.Control as="select"
              type="number"
              placeholder="0.00"
              value={CylinderL}
              onChange={(e) => setCylinderL(e.target.value)}
              required>
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
            </Form.Control>
          </Form.Group>
          <Form.Group as={Col} controlId="AxisL">
            <Form.Label>Axis</Form.Label>
            <Form.Control
              type="number"
              placeholder="0"
              value={AxisL}
              onChange={(e) => setAxisL(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group as={Col} controlId="ADDL">
            <Form.Label>ADD</Form.Label>
            <Form.Control as="select"
              type="number"
              placeholder="n/a"
              value={ADDL}
              onChange={(e) => setADDL(e.target.value)}
              required>
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
            </Form.Control>
          </Form.Group>
        </Row>
        <Row className="mb-5 pb-4 pt-3 text-muted bg-info text-dark bg-opacity-10">
          <Form.Group as={Col} className="mb-3" controlId="PDR">
            <Form.Label className="mt-3 pt-2 fs-5">PD (Pupillary Distance)</Form.Label>
          </Form.Group>
          <Form.Group as={Col} className="mb-3" controlId="RPD">
            <Form.Label></Form.Label>
            <Form.Control as="select"
              type="number"
              placeholder="Right PD"
              value={RPD}
              onChange={(e) => setRPD(e.target.value)}>
              <option>Right PD</option>
              <option>n/a</option>
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
            </Form.Control>
          </Form.Group>
          <Form.Group as={Col} controlId="LPD">
            <Form.Label></Form.Label>
            <Form.Control as="select"
              type="number"
              placeholder="Left PD"
              value={LPD}
              onChange={(e) => setLPD(e.target.value)}>
              <option>Left PD</option>
              <option>n/a</option>
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
            </Form.Control>
          </Form.Group>
        </Row>

        <div className="text-center my-3 mb-5">
          <Button type="submit">Update</Button>
        </div>
       
      </form>

    </div>
    </Container>
     );
}
