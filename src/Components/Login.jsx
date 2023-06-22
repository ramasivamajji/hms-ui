import axios from "axios";
import { Field, Form, FormikProvider, useFormik } from "formik";
import * as hms from "react-bootstrap";
import { SlArrowUpCircle, SlArrowDownCircle } from "react-icons/sl";
import { useNavigate } from "react-router-dom";
import { SweetAlertGeneral, SweetAlertLoginSuccess } from "./CommonFiles/SweetAlerts";

const Login = () => {

  const imgUrl = "https://img.freepik.com/free-vector/sign-concept-illustration_114360-5425.jpg?w=826&t=st=1683007110~exp=1683007710~hmac=4e1b7e1e81805d671a67f4e8df7c776513c8e5adbcca07af82ceb39e20d48550";

  function navReg() {
    navigate("/register")
  }

  let navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      user_email: "",
      user_password: "",
    },
    onSubmit: (values) => {
      let url = "http://localhost:8000/hms/v1/auth";
      axios.post(url, values).then(res => {
        if (res.data.scode === "01") {

          localStorage.setItem("user_email", formik.values.user_email);
          localStorage.setItem("is_logged", "true");
          SweetAlertLoginSuccess();
          window.location.href = "/services";

        } else {
          SweetAlertGeneral("Login Failed", res.data.sdesc, "error")
        }
      })
    }
  });

  return (
    <>

      <hms.Row className="my-2">
        <hms.Col xs={12} sm={12} md={12} lg={2} xl={2} xxl={2}></hms.Col>
        <hms.Col xs={12} sm={12} md={12} lg={8} xl={8} xxl={8}>
          <div>
            <hms.Row>
              <hms.Col xs={12} sm={12} md={12} lg={6} xl={6} xxl={6}>
                <FormikProvider value={formik}>
                  <Form autoComplete="off">
                    <hms.Row className="my-5 py-5">
                      <hms.Row>
                        <hms.Col xs={12} className="text-center">
                          <h4 className="text-primary">Login Here</h4>
                        </hms.Col>
                      </hms.Row>
                      <hms.Row className="my-2">
                        <hms.Col
                          xs={12}
                          sm={12}
                          md={12}
                          lg={2}
                          xl={2}
                          xxl={2}
                        ></hms.Col>
                        <hms.Col
                          xs={12}
                          sm={12}
                          md={12}
                          lg={8}
                          xl={8}
                          xxl={8}
                        >
                          <label> Your Email Id:</label>
                          <hms.InputGroup>

                            <Field
                              type="text"
                              name="user_email"
                              className="form-control "
                              maxLength="30"

                              autoComplete="off"
                            />

                          </hms.InputGroup>
                        </hms.Col>
                      </hms.Row>
                      <hms.Row className="my-2">
                        <hms.Col
                          xs={12}
                          sm={12}
                          md={12}
                          lg={2}
                          xl={2}
                          xxl={2}
                        ></hms.Col>
                        <hms.Col
                          xs={12}
                          sm={12}
                          md={12}
                          lg={8}
                          xl={8}
                          xxl={8}
                        >
                          <label> Your Password:</label>
                          <hms.InputGroup>
                            <Field
                              type="password"
                              name="user_password"
                              className="form-control"
                              maxLength="30"

                            />

                          </hms.InputGroup>
                        </hms.Col>
                      </hms.Row>
                      <hms.Row className="my-2">
                        <hms.Col
                          xs={12}
                          sm={12}
                          md={12}
                          lg={2}
                          xl={2}
                          xxl={2}
                        ></hms.Col>
                        <hms.Col
                          xs={12}
                          sm={12}
                          md={12}
                          lg={8}
                          xl={8}
                          xxl={8}
                          className="btn-group"
                        >
                          <button type="submit" className="btn btn-success ">
                            <SlArrowUpCircle /> Login
                          </button>

                          <button type="button" onClick={() => { navReg(); }} className="btn btn-primary">
                            <SlArrowDownCircle /> Register
                          </button>
                        </hms.Col>
                      </hms.Row>
                      <hms.Row className="my-2">
                        <hms.Col
                          xs={12}
                          sm={12}
                          md={12}
                          lg={6}
                          xl={5}
                          xxl={5}
                        ></hms.Col>

                      </hms.Row>
                    </hms.Row>
                  </Form>
                </FormikProvider>
              </hms.Col>

              <hms.Col
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
              </hms.Col>
            </hms.Row>
          </div>
        </hms.Col>
        <hms.Col xs={12} sm={12} md={12} lg={2} xl={2} xxl={2}></hms.Col>
      </hms.Row>
    </>
  );
};
export default Login;
