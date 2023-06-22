import * as hms from "react-bootstrap";
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { FaList } from "react-icons/fa";
import { BsFillCaretDownSquareFill, BsArrowRightSquare } from "react-icons/bs";
import { Link } from "react-router-dom";
import Fade from 'react-bootstrap/Fade';
import axios from "axios";

export default function Home() {

  const user_email = localStorage.getItem("user_email");

  const imgUrl = "https://img.freepik.com/free-vector/costumer-survey-concept-illustration_114360-459.jpg?t=st=1683007090~exp=1683007690~hmac=89e41add73dc7f652a421ff3ce95f3453a58ad668d6a6d2ab2f2f3282e00c10f";

  const [open, setOpen] = useState(false);
  const [services, setServices] = useState([]);

  function getServices() {
    let url = "http://localhost:8000/hms/v1/services?email=" + user_email;
    axios.get(url).then(res => {
      if (res.data.status === true) {
        setServices(res.data.services);
      }
    })
  }

  useEffect(() => { getServices() }, []);
  return (
    <>
      <hms.Row className="my-2">
        <hms.Col xs={12} sm={12} md={12} lg={2} xl={2} xxl={2}></hms.Col>
        <hms.Col xs={12} sm={12} md={12} lg={8} xl={8} xxl={8}>
          <div>
            <hms.Row>
              <hms.Col xs={12} sm={12} md={12} lg={6} xl={6} xxl={6} className=" text-center">

                <img
                  src={imgUrl}
                  className="img-fluid"
                  alt="mlogo"
                />

              </hms.Col>
              <hms.Col xs={12} sm={12} md={12} lg={6} xl={6} xxl={6} className="my-5">
                <hms.Row>
                  <Button
                    onClick={() => setOpen(!open)}
                    aria-controls="example-collapse-text"
                    aria-expanded={open}
                    style={{ width: '100%', backgroundColor: '#007FFF', color: 'white', fontWeight: 'bold', borderRadius: '0' }}
                    variant="outline-primary"
                    className="text-start"

                  >
                    <hms.Row>
                      <hms.Col xs={1} sm={1} md={1} lg={1} xl={1} xxl={1}><FaList style={{ fontSize: '1.3em' }} /></hms.Col>{/* */}
                      <hms.Col xs={10} sm={10} md={10} lg={10} xl={10} xxl={10}> Services</hms.Col>
                      <hms.Col xs={1} sm={1} md={1} lg={1} xl={1} xxl={1}><BsFillCaretDownSquareFill /></hms.Col>
                    </hms.Row>

                  </Button>
                  <Fade in={open}>
                    <table style={{ width: '100%' }} className="border border-primary">
                      <thead >
                        {services && services.map((s, i) => {
                          return <React.Fragment key={i}>
                            <tr className="border border-primary"><th className="p-2 d-flex justify-content-between align-items-center"><span>{s.service_name}</span> <span><Link to={s.target_path}><BsArrowRightSquare /></Link></span></th></tr>
                          </React.Fragment>
                        })}

                      </thead>
                    </table>
                  </Fade>
                </hms.Row>
              </hms.Col>
            </hms.Row>
          </div>
        </hms.Col>
        <hms.Col xs={12} sm={12} md={12} lg={2} xl={2} xxl={2}></hms.Col>
      </hms.Row>
    </>
  )
}