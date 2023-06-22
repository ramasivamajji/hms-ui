import axios from "axios";
import React, { useEffect, useState } from "react"
import { Col, Row } from "react-bootstrap";
import { RiDeleteBin6Line } from "react-icons/ri";
import { SweetAlertGeneral } from "../CommonFiles/SweetAlerts";

export default function ViewBookings() {
    const user_email = localStorage.getItem("user_email");
    const [bookings, setBookings] = useState([]);

    function getBookings() {
        let url = "http://localhost:8000/hms/v1/bookings?email=" + user_email;
        axios.get(url).then(res => {
            if (res.data.status === true) {
                setBookings(res.data.bookings);
            }
        })
    }

    useEffect(() => { getBookings(); }, []);

    async function delOrder(booking_id) {
        let url = "http://localhost:8000/hms/v1/del-booking?booking_id=" + booking_id;
        axios.delete(url).then(res => {
            if (res.data.scode === "01") {
                SweetAlertGeneral("Success", res.data.sdesc, "success");
                getBookings();
            }
            else {
                SweetAlertGeneral("Failed", res.data.sdesc, "error");
            }
        })
    }

    return (<>
        <Row className="my-4">
            <Col xs={12} sm={12} md={12} lg={2} xl={2} xxl={2}></Col>
            <Col xs={12} sm={12} md={12} lg={8} xl={8} xxl={8}>
                <Row className="mb-3">
                    <Col>
                        <h4 className="h-blue">Your Bookings</h4>
                    </Col>
                </Row>
                <Row>
                    <table className="table">
                        <thead>
                            <tr>

                                <th>Booking Id</th>
                                <th>Room Name</th>
                                <th>Persons</th>
                                <th>Stay From</th>
                                <th>Stay Upto</th>
                                <th>Price $</th>
                                <th>Hotel Confirmation</th>

                            </tr>
                        </thead>
                        <tbody>
                            {bookings.length > 0 && bookings.map((d, i) => {
                                return <React.Fragment key={i}>
                                    <tr>

                                        <td>{d.booking_id} </td>
                                        <td>{d.room_name}</td>
                                        <td>{d.persons_count}</td>
                                        <td>{d.stay_from}</td>
                                        <td>{d.stay_upto}</td>
                                        <td>{d.price}/-</td>
                                        <td>
                                            <span className={`btn ${d.hot_cnf_col}`}>{d.hot_cnf}</span>&nbsp;&nbsp;
                                            {d.hot_cnf === "Pending" ? <RiDeleteBin6Line onClick={() => { delOrder(d.booking_id); }} className="text-danger" size={25} /> : ''}
                                        </td>
                                    </tr>
                                </React.Fragment>
                            })}
                        </tbody>
                    </table>
                </Row>
            </Col>
            <Col xs={12} sm={12} md={12} lg={2} xl={2} xxl={2}></Col>
        </Row >
    </>)
}