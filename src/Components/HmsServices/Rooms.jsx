import axios from "axios";
import React, { useEffect, useState } from "react"
import { Col, Row } from "react-bootstrap";
import { FaWifi, FaUtensils, FaSnowflake, FaTv, FaFan } from 'react-icons/fa';

import { useNavigate } from "react-router-dom";


export default function Rooms() {
    let nav = useNavigate();
    const [rooms, setRooms] = useState([]);

    function getRooms() {
        const url = "http://localhost:8000/hms/v1/rooms";
        axios.get(url).then(res => {
            if (res.data.status === true) {
                setRooms(res.data.rooms);
            }
        })
    }

    useEffect(() => { getRooms(); }, []);

    async function navBooking(room_data) {
        localStorage.setItem("room_data", JSON.stringify(room_data));
        nav("/room");
    }

    return (<>
        <Row className="my-4">
            <Col xs={12} sm={12} md={12} lg={2} xl={2} xxl={2}></Col>
            <Col xs={12} sm={12} md={12} lg={8} xl={8} xxl={8}>
                <Row className="mb-3">
                    <Col>
                        <h4 className="h-blue">Available Rooms For Booking</h4>
                    </Col>
                </Row>
                <Row>
                    <table className="table">
                        <thead>
                            <tr>

                                <th>Room</th>
                                <th>Persons(Max)</th>
                                <th>Complementories</th>
                                <th>Price $</th>
                                <th>Action</th>

                            </tr>
                        </thead>
                        <tbody>
                            {rooms.length > 0 && rooms.map((d, i) => {
                                return <React.Fragment key={i}>
                                    <tr>

                                        <td>{d.room_name} </td>
                                        <td>{d.max_allowed}</td>

                                        <td align="center">
                                            <div>
                                                <ul className="list-group list-group-horizontal">
                                                    <li className="list-group-item">{<FaUtensils className={`${d.has_breakfast ? 'text-success' : 'text-danger'}`} />} Food</li>
                                                    <li className="list-group-item">{<FaSnowflake className={`${d.has_ac ? 'text-success' : 'text-danger'}`} />} AC</li>
                                                    <li className="list-group-item">{<FaFan className={`${d.has_heater ? 'text-success' : 'text-danger'}`} />} Heater</li>
                                                    <li className="list-group-item">{<FaWifi className={`${d.has_wifi ? 'text-success' : 'text-danger'}`} />} Wifi</li>
                                                    <li className="list-group-item">{<FaTv className={`${d.has_tv ? 'text-success' : 'text-danger'}`} />} TV</li>


                                                </ul>

                                            </div>

                                        </td>
                                        <td>{d.price}/-</td>
                                        <td><button type="button" onClick={() => { navBooking(d) }} className="btn btn-primary">Reserve</button></td>
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