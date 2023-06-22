import axios from "axios";
import { Field, Form, FormikProvider, useFormik } from "formik";
import * as majji from "react-bootstrap";
import { SlArrowDownCircle } from "react-icons/sl";
import { SweetAlertGeneral } from "../CommonFiles/SweetAlerts";


const StuBasicReg = () => {

    const imgUrl = "https://img.freepik.com/free-vector/personal-site-concept-illustration_114360-2577.jpg?w=826&t=st=1683008240~exp=1683008840~hmac=aee1750bb487f4ac8d16ea5628407d15bc8bb062501f2779212924455f8aa0dc";

    const formik = useFormik({
        initialValues: {
            "user_name": '',
            "user_email": '',
            "user_password": '',
        },
    },
    )

    function submitFunc() {
        let url = "http://localhost:8000/hms/v1/users";
        axios.post(url, formik.values).then(res => {
            if (res.data.scode === "01") {
                SweetAlertGeneral("success", res.data.sdesc, "success");
            }
            else {
                SweetAlertGeneral("failed", res.data.sdesc, "error");
            }
        })
    }

    return (<>
        <majji.Row className="my-2">
            <majji.Col xs={12} sm={12} md={12} lg={2} xl={2} xxl={2}></majji.Col>
            <majji.Col xs={12} sm={12} md={12} lg={8} xl={8} xxl={8}>
                <div>{/* style={divContainer} */}
                    <majji.Row>
                        <majji.Col xs={12} sm={12} md={12} lg={6} xl={6} xxl={6}>
                            <FormikProvider value={formik}>
                                <Form autoComplete="off">
                                    <majji.Row className="my-5 py-5">
                                        <majji.Row>
                                            <majji.Col xs={12} className="text-center">
                                                <h4 className="text-primary">Register Here</h4>
                                            </majji.Col>
                                        </majji.Row>
                                        <majji.Row className="my-2">
                                            <majji.Col
                                                xs={12}
                                                sm={12}
                                                md={12}
                                                lg={2}
                                                xl={2}
                                                xxl={2}
                                            ></majji.Col>
                                            <majji.Col
                                                xs={12}
                                                sm={12}
                                                md={12}
                                                lg={8}
                                                xl={8}
                                                xxl={8}
                                            >
                                                <label> Your Name:</label>
                                                <majji.InputGroup>
                                                    <Field
                                                        type="text"
                                                        name="user_name"
                                                        className="form-control "
                                                        maxLength="30"
                                                        placeholder=""
                                                        autoComplete="off"
                                                    />

                                                </majji.InputGroup>
                                            </majji.Col>
                                        </majji.Row>
                                        <majji.Row className="my-2">
                                            <majji.Col
                                                xs={12}
                                                sm={12}
                                                md={12}
                                                lg={2}
                                                xl={2}
                                                xxl={2}
                                            ></majji.Col>
                                            <majji.Col
                                                xs={12}
                                                sm={12}
                                                md={12}
                                                lg={8}
                                                xl={8}
                                                xxl={8}
                                            >
                                                <label> Your Email:</label>
                                                <majji.InputGroup>
                                                    <Field
                                                        type="text"
                                                        name="user_email"
                                                        className="form-control "
                                                        maxLength="30"
                                                        placeholder=""
                                                        autoComplete="off"
                                                    />

                                                </majji.InputGroup>
                                            </majji.Col>
                                        </majji.Row>
                                        <majji.Row className="my-2">
                                            <majji.Col
                                                xs={12}
                                                sm={12}
                                                md={12}
                                                lg={2}
                                                xl={2}
                                                xxl={2}
                                            ></majji.Col>
                                            <majji.Col
                                                xs={12}
                                                sm={12}
                                                md={12}
                                                lg={8}
                                                xl={8}
                                                xxl={8}
                                            >
                                                <label> Your Password:</label>
                                                <majji.InputGroup>
                                                    <Field
                                                        type="password"
                                                        name="user_password"
                                                        className="form-control"
                                                        maxLength="30"
                                                        placeholder=""
                                                    />

                                                </majji.InputGroup>
                                            </majji.Col>
                                        </majji.Row>
                                        <majji.Row className="my-2">
                                            <majji.Col
                                                xs={12}
                                                sm={12}
                                                md={12}
                                                lg={2}
                                                xl={2}
                                                xxl={2}
                                            ></majji.Col>
                                            <majji.Col
                                                xs={12}
                                                sm={12}
                                                md={12}
                                                lg={8}
                                                xl={8}
                                                xxl={8}
                                                className="btn-group"
                                            >

                                                <button type="button" onClick={() => { submitFunc(); }} className="btn btn-primary">
                                                    <SlArrowDownCircle /> Register
                                                </button>
                                            </majji.Col>
                                        </majji.Row>
                                    </majji.Row>
                                </Form>
                            </FormikProvider>
                        </majji.Col>
                        {/* <majji.Col xs={12} sm={12} md={12} lg={1} xl={1} xxl={1}>
                    <div className="vr" />
                    </majji.Col> */}
                        <majji.Col
                            xs={12}
                            sm={12}
                            md={12}
                            lg={6}
                            xl={6}
                            xxl={6}
                            className=" text-center"
                        >
                            <img
                                src={imgUrl}
                                className="img-fluid"
                                alt="mlogo"
                            />
                        </majji.Col>
                    </majji.Row>
                </div>
            </majji.Col>
            <majji.Col xs={12} sm={12} md={12} lg={2} xl={2} xxl={2}></majji.Col>
        </majji.Row>
        {/* </div> */}
    </>)
}
export default StuBasicReg;