import { Field, Form, FormikProvider, useFormik } from "formik";
import { Col, Row } from "react-bootstrap";
import { FaWifi, FaUtensils, FaSnowflake, FaTv, FaFan, FaUser } from 'react-icons/fa';
import { Badge } from 'react-bootstrap';
import axios from "axios";
import { SweetAlertGeneral } from "../CommonFiles/SweetAlerts";

export default function BookingForm() {

    const room_data = JSON.parse(localStorage.getItem("room_data"));
    const user_email = localStorage.getItem("user_email");

    const formik = useFormik({
        initialValues: {
            "roomId": room_data.room_id,
            "userEmail": user_email,
            "contactNumber": '',
            "personsCount": "",
            "optedFood": '',
            "country": "",
            "nativeAddress": "",
            "stayFrom": "",
            "stayUpto": ""
        },
        onSubmit: (values, { resetForm }) => {
            let url = "http://localhost:8000/hms/v1/book-room";
            axios.post(url, values).then(res => {
                if (res.data.scode === "01") {
                    SweetAlertGeneral("Success", res.data.sdesc, "success");
                    resetForm();
                }
                else {
                    SweetAlertGeneral("Failed", res.data.sdesc, "error");
                }
            })
        }
    });

    const { room_name, has_wifi, price, has_breakfast, max_allowed, has_ac, has_tv, is_active, has_heater } = room_data;

    let maxAllowedUsersArr = [];
    let maxAllowedCountArr = [];

    for (let i = 0; i < max_allowed; i++) {
        maxAllowedUsersArr.push(<FaUser key={i} size={22} />);
        maxAllowedCountArr.push(<option key={i} value={i + 1}>{i + 1}</option>);
    }

    return (<>
        <FormikProvider value={formik}>
            <Form>
                <div className="container my-4">
                    <div className="row align-items-center">
                        <div className="col-md-4">
                            <h3>{room_name}</h3>
                            <p className="text-muted mb-0">Price: ${price} per night</p>
                        </div>
                        <div className="col-md-8 text-end">
                            <Badge bg={is_active ? 'success' : 'danger'}>{is_active ? 'Available' : 'Not Available'}</Badge>
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col-md-8">
                            <h5>Room Amenities</h5>
                            <ul className=" list-group list-group-horizontal">
                                <li className="list-group-item"><FaWifi className="me-2" />{has_wifi ? 'Free  Wi-Fi' : 'No Wi-Fi'}</li>
                                <li className="list-group-item"><FaUtensils className="me-2" />{has_breakfast ? 'Free Breakfast' : 'No Breakfast'}</li>
                                <li className="list-group-item"><FaSnowflake className="me-2" />{has_ac ? 'Air Conditioner' : 'No AC'}</li>
                                <li className="list-group-item"><FaTv className="me-2" />{has_tv ? 'Television' : 'No TV'}</li>
                                <li className="list-group-item"><FaFan className="me-2" />{has_heater ? 'Heater' : 'No Heater'}</li>

                            </ul>
                        </div>
                        <div className="col-md-4">
                            <h5>Max Number Of Persons</h5>
                            {maxAllowedUsersArr}


                        </div>

                    </div>
                    <hr />
                </div>

                <Row className="my-4">
                    <Col xs={12} sm={12} md={12} lg={2} xl={2} xxl={2}></Col>
                    <Col xs={12} sm={12} md={12} lg={8} xl={8} xxl={8}>

                        <Row className="mb-4">
                            <Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
                                <label>Your Email:</label>
                                <Field type="input" name="userEmail" className="form-control" readOnly={true} />
                            </Col>

                            <Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
                                <label>Contact Number:</label>
                                <Field type="number" name="contactNumber" className="form-control" />
                            </Col>

                            <Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
                                <label>Number Of Persons:</label>
                                <Field as="select" name="personsCount" className="form-select" >
                                    <option value="">Select</option>
                                    {maxAllowedCountArr}
                                </Field>
                            </Col>
                        </Row>
                        {/* row 2 */}
                        <Row className="mb-4">
                            <Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
                                <label>Include Food:</label>
                                <div className="form-control">
                                    <Field type="radio" name="optedFood" value={"true"} className="form-check-input" /> Yes &nbsp;
                                    <Field type="radio" name="optedFood" value={"false"} className="form-check-input" /> No
                                </div>
                            </Col>

                            <Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
                                <label>Stay From:</label>
                                <Field type="date" name="stayFrom" className="form-control" />
                            </Col>

                            <Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
                                <label>Stay Upto:</label>
                                <Field type="date" name="stayUpto" className="form-control" />
                            </Col>
                        </Row>
                        {/* row 2 */}
                        <Row className="mb-4">
                            <Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
                                <label>Your Country:</label>
                                <Field type="text" name="country" className="form-control" />
                            </Col>

                            <Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
                                <label>Your Address:</label>
                                <Field type="text" name="nativeAddress" className="form-control" />
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} sm={12} md={12} lg={10} xl={10} xxl={10}></Col>
                            <Col xs={12} sm={12} md={12} lg={2} xl={2} xxl={2}>
                                <button type="submit" className="btn btn-success">Book Room</button>
                            </Col>

                        </Row>
                    </Col>
                </Row>
            </Form>
        </FormikProvider>
    </>)
}