import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Swal from "sweetalert2";
import { SweetAlertGeneral } from "../CommonFiles/SweetAlerts";
import { RiDeleteBin6Line } from "react-icons/ri";


export default function ApprReject() {
    const [bookings, setBookings] = useState([]);

    function getBookings() {
        let url = "http://localhost:8000/hms/v1/all-bookings";
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

    function apprRej(booking_id) {
        Swal.fire({
            title: 'Approve or Reject',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: `Approve`,
            denyButtonText: `Reject`,
            confirmButtonClass: 'btn btn-success',
            denyButtonClass: 'btn btn-danger',
            buttonsStyling: false
        }).then((result) => {
            if (result.isConfirmed) {
                setAction(true, booking_id);
            } else if (result.isDenied) {
                setAction(false, booking_id);
            }
        })
    }

    async function setAction(is_approoved, booking_id) {
        let url = "http://localhost:8000/hms/v1/update-booking?is_approoved=" + is_approoved + "&booking_id=" + booking_id;
        axios.put(url).then(res => {
            if (res.data.scode === "01") {
                SweetAlertGeneral("Success", "Action Success", "success");
                getBookings();
            }
            else {
                SweetAlertGeneral("Failure", "Action Failed, Try Again", "error");
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
                                <th>Customer Email</th>
                                <th>Room Name</th>
                                <th>Persons</th>
                                <th>Stay From</th>
                                <th>Stay Upto</th>
                                <th>Price $</th>
                                <th>Hotel Confirmation</th>
                                <th>Delete Booking</th>

                            </tr>
                        </thead>
                        <tbody>
                            {bookings.length > 0 && bookings.map((d, i) => {
                                return <React.Fragment key={i}>
                                    <tr>

                                        <td>{d.booking_id} </td>
                                        <td>{d.user_email}</td>
                                        <td>{d.room_name}</td>
                                        <td>{d.persons_count}</td>
                                        <td>{d.stay_from}</td>
                                        <td>{d.stay_upto}</td>
                                        <td>{d.price}/-</td>
                                        <td>
                                            {d.hot_cnf === "Pending" ?
                                                <button onClick={() => { apprRej(d.booking_id); }} className={`btn ${d.hot_cnf_col}`}>Action</button>
                                                : <span className={`btn ${d.hot_cnf_col}`}>{d.hot_cnf}</span>}
                                        </td>
                                        <td><RiDeleteBin6Line onClick={() => { delOrder(d.booking_id); }} className="text-danger" size={25} /></td>
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