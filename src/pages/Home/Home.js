import React from "react";
import "../Home/home.css";
import "../../components/stylesheets/fonts.css";
import Image from "../../components/Image.js";
import image1 from "../../assets/images/homeDoc.png";
import image2 from "../../assets/images/asd 3.png";
import doctor1 from "../../assets/images/doctor.png";
import {
  FaSearch,
  FaClipboardList,
  FaPhone,
  FaArrowRight,
  FaPlay,
  FaMicroscope,
  FaAmbulance,
  FaMobile,
  FaQuestion,
  FaStar,
  FaStarHalf,
} from "react-icons/fa";

import Box from "../../components/box.js";
import { Button } from "react-bootstrap";
import ToggleSwitch from "../../components/ToggleSwitch/ToggleSwitch.js";
import { useState } from "react";

function Home() {
  const [value, setValue] = useState("");
  const [isOn, setIsOn] = useState(true);

  const handleTextChange = (event) => {
    setValue(event.target.value);
  };

  const handleToggle = () => {
    setIsOn((prevState) => !prevState);
  };

  return (
    <div className="home-container">
      <div className="home-circle-container">
        {/* Text Section */}
        <div className="home-text-container">
          <h1 className="home-title">We care </h1>
          <h1 className="home-subtitle">about your health</h1>
          <p className="home-paragraph">
            Good health is the state of mental, physical, and social well-being
            <br />
            and it does not just mean absence of diseases.
          </p>
          <div className="home-botton-container">
            <div className="home-container-circle-button">
              <Button
                className="home-button"
                style={{
                  width: "200px",
                  height: "40px",
                  padding: "0 10px",
                }}
              >
                <h1>Book an appointment</h1>
                <FaArrowRight
                  style={{
                    width: "20px",
                    height: "auto",
                    color: "white",
                    marginLeft: "18px",
                  }}
                />
              </Button>
              <div className="home-circle-container-small">
                <div className="home-outer-circle-small"> </div>
                <div className="home-inner-circle-small">
                  <FaPlay className="home-pause"></FaPlay>
                </div>
              </div>
              <h1 className="home-basic-text">Watch videos</h1>
            </div>
          </div>
          <div className="home-sign-up-row">
            <h1 className="home-basic-text">
              Become a member of our community?
            </h1>
            <h1 className="home-basic-text" style={{ color: "blue" }}>
              Sign up
            </h1>
          </div>
          <Box
            style={{
              width: "950px",
              height: "90px",
              zIndex: "26",
              borderRadius: "20px",
              display: "flex",
            }}
          >
            <div style={{ flexDirection: "column" }}>
              <h1
                className="home-basic-text"
                style={{
                  fontWeight: "bold",
                  marginTop: "20px",
                  marginLeft: "40px",
                }}
              >
                Find a doctor
              </h1>
              <div
                style={{
                  flexDirection: "row",
                  display: "flex",
                  marginRight: "30px",
                  marginLeft: "30px",
                }}
              >
                <input
                  type="text"
                  value={value}
                  onChange={handleTextChange}
                  placeholder="Name a doctor"
                  className="home-text-field"
                ></input>
                <input
                  type="text"
                  value={value}
                  onChange={handleTextChange}
                  placeholder="Speciality"
                  className="home-text-field"
                  style={{ marginRight: "40px" }}
                ></input>
                <h1 className="home-basic-text" style={{ marginRight: "20px" }}>
                  Availability
                </h1>
                <ToggleSwitch />
                <Button
                  style={{
                    backgroundColor: "blue",
                    width: "70px",
                    marginLeft: "60px",
                  }}
                >
                  Search
                </Button>
              </div>
            </div>
          </Box>
        </div>

        <div>
          {/* Outer Circle (Grey Outline) */}
          <div className="home-outer-circle">
            <div>
              {/* Inner Blue Circle */}
              <div className="home-inner-circle">
                {/* Image Section */}
                <Image
                  src={image1}
                  style={{
                    width: "475px",
                    height: "auto",
                    position: "absolute",
                    top: "-150px",
                    left: "50%",
                    transform: "translateX(-45%)",
                  }}
                />
              </div>
              <Image
                src={image2}
                style={{
                  width: "475px",
                  height: "auto",
                  position: "absolute",
                  top: "-130px",
                  left: "50%",
                  transform: "translateX(-45%)",
                  zIndex: 20,
                }}
              />
            </div>
          </div>
          {/* Box with Search Icon */}
          <Box
            style={{
              height: "45px",
              width: "200px",
              top: "25%",
              right: "23%",
              backgroundColor: "#FFFFFF",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              zIndex: 10,
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              padding: "0 10px",
            }}
          >
            <FaSearch
              style={{
                color: "blue",
                width: "23px",
                marginRight: "8px",
              }}
            />
            <div>
              <h1
                style={{
                  marginTop: "15px",
                  fontFamily: "Poppins",
                  color: "black",
                  fontSize: "10px",
                }}
              >
                Well qualified doctors
              </h1>
              <h1
                style={{
                  fontFamily: "Poppins",
                  color: "#A7A7A7",
                  fontSize: "10px",
                  marginTop: "-4px",
                }}
              >
                Treat with care
              </h1>
            </div>
          </Box>
        </div>
        <div>
          <Box
            style={{
              position: "absolute",
              height: "55px",
              width: "200px",
              top: "42%",
              right: "23%",
              backgroundColor: "#FFFFFF",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              borderRadius: "60px",
              zIndex: 22,
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              padding: "0 10px",
            }}
          >
            <div>
              <FaClipboardList
                style={{
                  color: "blue",
                  width: "27px",
                  height: " auto",
                  marginRight: "8px",
                }}
              />
            </div>

            <div>
              <h1
                style={{
                  marginTop: "15px",
                  fontFamily: "Poppins",
                  color: "black",
                  fontSize: "10px",
                }}
              >
                Book an appointment
              </h1>
              <h1
                style={{
                  fontFamily: "Poppins",
                  color: "#A7A7A7",
                  fontSize: "10px",
                  marginTop: "-4px",
                }}
              >
                Online appointment
              </h1>
            </div>
          </Box>
        </div>
        <div>
          <Box
            style={{
              position: "absolute",
              height: "45px",
              width: "150px",
              top: "43%",
              right: "6%",
              backgroundColor: "rgba(230, 230, 230, 0.4)",
              boxShadow: "4px 4px 4px rgba(255, 255, 255, 0.2)",
              borderRadius: "90px",
              zIndex: 22,
              display: "flex",
              // justifyContent: "flex-start",
              alignItems: "center",
              padding: "0 10px",
            }}
          >
            <FaPhone
              style={{
                width: "23px",
                marginRight: "8px",
                transform: " rotate(90deg)",
              }}
            />
            <div>
              <h1
                style={{
                  marginTop: "7px",
                  fontFamily: "Poppins",
                  fontWeight: "bold",
                  color: "black",
                  fontSize: "7px",
                }}
              ></h1>
              contact no
              <h1
                style={{
                  fontFamily: "Poppins",
                  color: "black",
                  fontSize: "10px",
                  marginTop: "-4px",
                }}
              >
                +9715123871325
              </h1>
            </div>
          </Box>
        </div>
      </div>
      <div
        style={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          marginTop: "200px",
        }}
      ></div>
      <h1
        className="home-basic-text"
        style={{
          fontSize: "50px",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Our medical services
        <h1 className="home-paragraph">
          we are dedicated to serve you <br /> best medical service{" "}
        </h1>
      </h1>

      <div className="home-box-container">
        <div className="home-box">
          <FaMicroscope className="home-services-icon" />
          <h1 className="home-basic-text"> well equipped labs</h1>
        </div>
        <div className="home-box">
          <FaAmbulance className="home-services-icon" />
          <h1 className="home-basic-text"> Emergency Ambulance</h1>
        </div>
        <div className="home-box">
          <FaMobile className="home-services-icon" />
          <h1 className="home-basic-text"> Online appointment</h1>
        </div>
        <div className="home-box">
          <FaQuestion className="home-services-icon" />
          <h1 className="home-basic-text"> Call center</h1>
        </div>
      </div>
      <h1
        className="home-basic-text"
        style={{
          fontSize: "50px",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Meet our doctors
        <h1 className="home-paragraph">
          well qualified doctors ready to serve you
        </h1>
      </h1>
      <div className="home-doctor-cards-container">
        <div className="home-doctors-cards">
          <div className="home-blue-box">
            <image className="home-doctors-images" src={doctor1}></image>
          </div>
        </div>
        <div className="home-doctors-cards"></div>
      </div>
      <div className="home-doctor-cards-container">
        <div className="home-doctors-cards"></div>
        <div className="home-doctors-cards"></div>
      </div>
    </div>
  );
}

export default Home;
