import { Container, Row, Col } from 'react-bootstrap';

function LandingPage() {
    const imgUrl = "https://img.freepik.com/free-photo/luxury-classic-modern-bedroom-suite-hotel_105762-1787.jpg?w=996&t=st=1683061255~exp=1683061855~hmac=e7dbc09edf5794b263e15ff2ef0a9afec3f0d97c321add6729f30e8370ef1060"
    return (
        <div  >
            <Container>
                <Row className="mt-5">
                    <Col md={6} >
                        <h1 className="mb-4 text-primary">Welcome to the Hotel Management System</h1>
                        <p className="lead">Our system provides a comprehensive solution for managing hotels, including room bookings, check-ins and check-outs, guest services, housekeeping, and billing.</p>
                        <p className="lead">With our user-friendly interface and advanced features, you can easily manage your hotel operations and provide excellent service to your guests.</p>
                    </Col>
                    <Col md={6} className="d-flex align-items-center justify-content-center">
                        <img src={imgUrl} alt="Hotel Management System" className="img-fluid rounded" />
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default LandingPage;


