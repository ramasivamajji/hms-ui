import { lazy, Suspense } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";


const Login = lazy(() => import("../src/Components/Login"))
const Home = lazy(() => import("../src/Components/Home"))
const StuBasicReg = lazy(() => import("./Components/HmsServices/CustomerBasicReg"))

const ApprReject = lazy(() => import("./Components/HmsServices/ApprReject"))
const Rooms = lazy(() => import("./Components/HmsServices/Rooms"))
const BookingForm = lazy(() => import("./Components/HmsServices/BookingForm"))
const ViewBookings = lazy(() => import("./Components/HmsServices/ViewBookings"))
const LandingPage = lazy(() => import("../src/Components/LandingPage"))


const RoutesComponent = () => (
    <Router>
        <Suspense fallback={<center style={{ marginTop: 300 }}><h3>Loading...</h3></center>}>
            <Routes>
                <Route path="/" exact={true} element={<LandingPage />} />
                <Route path="/login" exact={true} element={<Login></Login>} />
                <Route path="/services" exact={true} element={<Home />} />
                <Route path="/register" exact={true} element={<StuBasicReg />} />
                <Route path="/bookroom" exact={true} element={<Rooms />} />
                <Route path="/room" exact={true} element={<BookingForm />} />
                <Route path="/viewbooking" exact={true} element={<ViewBookings />} />
                <Route path="/apprreject" exact={true} element={<ApprReject />} />

            </Routes>
        </Suspense>
    </Router>
);
export default RoutesComponent;