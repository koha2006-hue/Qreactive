"use client";
// pages/qrList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import MyQR from "./MyQRCodes.module.css";
import { getEmailUser } from '@/components/emailuser';
function MyQRCodesContent() {
  // State to manage dropdown visibility
  const [dropdown1Visible, setDropdown1Visible] = useState(false);
  const [dropdown2Visible, setDropdown2Visible] = useState(false);
  const [dropdown3Visible, setDropdown3Visible] = useState(false);
  const [dropdown4Visible, setDropdown4Visible] = useState(false);
  const [qrCodes, setQRCodes] = useState([]);
  const [dropdownVisibility, setDropdownVisibility] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  // Toggle dropdown function
  const toggleDropdown = (dropdownId) => {
    switch (dropdownId) {
      case "1":
        setDropdown1Visible(!dropdown1Visible);
        break;
      case "2":
        setDropdown2Visible(!dropdown2Visible);
        break;
      case "3":
        setDropdown3Visible(!dropdown3Visible);
        break;
      case "4":
        setDropdown4Visible(!dropdown4Visible);
        break;
      default:
        break;
    }
  };

  const toggleItemDropdown = (id) => {
    setDropdownVisibility((prevVisibility) => ({
      ...prevVisibility,
      [id]: !prevVisibility[id],
    }));
  };

  // Close dropdowns on click outside
  const handleClickOutside = (event) => {
    const dropdowns = [
      { id: "1", visible: dropdown1Visible, setVisible: setDropdown1Visible },
      { id: "2", visible: dropdown2Visible, setVisible: setDropdown2Visible },
      { id: "3", visible: dropdown3Visible, setVisible: setDropdown3Visible },
      { id: "4", visible: dropdown4Visible, setVisible: setDropdown4Visible },
    ];

    // Check if the click target is inside any of the dropdowns
    const isClickInsideDropdown = dropdowns.some(({ visible }) => visible);

    if (!isClickInsideDropdown) {
      // Close all dropdowns if the click is outside
      dropdowns.forEach(({ visible, setVisible }) => {
        if (visible) {
          setVisible(false);
        }
      });
    }
  };

  // Attach click event listener when the component mounts
  React.useEffect(() => {
    window.addEventListener("click", handleClickOutside);

    // Cleanup event listener when the component unmounts
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [dropdown1Visible, dropdown2Visible, dropdown3Visible, dropdown4Visible]);

  useEffect(() => {
    const fetchQRCodes = async () => {
      try {
        const email = getEmailUser();
        const response = await axios.post('http://localhost:5000/qrList/list', {
          email
          });
        setQRCodes(response.data.qrCodes);
        setLoading(false); // Set loading to false once data is fetched

        console.log(response.data.qrCodes);
      } catch (error) {
        console.error('Error fetching QR codes:', error);
        setLoading(false); // Set loading to false in case of an error
      }
    };

    fetchQRCodes();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.get(`http://localhost:5000/profile/delete/${id}`);
      //refresh the page
      const updatedQRCodes = qrCodes.filter((code) => code._id !== id);
      setQRCodes(updatedQRCodes);
    }
    catch (error) {
      console.error(`Error deleting QR code with id ${id}:`, error);
    }
  }



  const handleEditLink = async (id) => {
    try {
      console.log(id);
      //navigate to the edit page
      router.push(`/qr_link/${id}`); 
    }
    catch (error) {
      console.error(`Error editing QR code with id ${id}:`, error);
    }
  }

  const handleEditText = async (id) => {
    try {
      console.log(id);
      //navigate to the edit page
      router.push(`/qr_text/${id}`); 
    }
    catch (error) {
      console.error(`Error editing QR code with id ${id}:`, error);
    }
  }

  const handleEditWifi = async (id) => {
    try {
      console.log(id);
      //navigate to the edit page
      router.push(`/qr_wifi/${id}`); 
    }
    catch (error) {
      console.error(`Error editing QR code with id ${id}:`, error);
    }
  }

  const handleEditPersonal = async (id) => {
    try {
      console.log(id);
      //navigate to the edit page
      router.push(`/qr_personal/${id}`); 
    }
    catch (error) {
      console.error(`Error editing QR code with id ${id}:`, error);
    }
  }

  const handleEditPersonalData = async (id) => {
    try {
      console.log(id);
      //navigate to the edit page
      router.push(`/personalData/${id}`); 
    }
    catch (error) {
      console.error(`Error editing QR code with id ${id}:`, error);
    }
  }

  const handleEditEmail = async (id) => {
    try {
      console.log(id);
      //navigate to the edit page
      router.push(`/qr_email/${id}`); 
    }
    catch (error) {
      console.error(`Error editing QR code with id ${id}:`, error);
    }
  }

  return (
    <div>
      <div className={MyQR.container}>
        <div className={MyQR.header}>
          <h2>My QR Codes</h2>
          <nav>
            <ol>
              <li>All QR codes /</li>
            </ol>
          </nav>
        </div>
        <div className={MyQR.buttonContainer}>
          <a
            href="/qr_scanner"
            className={MyQR.createBtn}
            id="create-new-qenerator-btn"
            data-action="click->admin--qr-filters#createNewBtn"
          >
            <div>
              <img src="more.png" alt="add" />
              <span>Create new QR</span>
            </div>
          </a>
        </div>
      </div>
      {/* New big container with three child divs */}
      <div className={MyQR.bigContainer}>
        <div className={MyQR.headDiv1}>
          <button className={MyQR.selectAllBtn}>Select All</button>
          <button className={MyQR.copyBtn} id={MyQR.copyButton}></button>
          <button className={MyQR.deleteBtn} id={MyQR.deleteButton}></button>
          <div className={MyQR.dropdown} id={MyQR.filterButton}>
            <button
              onClick={() => toggleDropdown("1")}
              className={MyQR.dropbtn}
            >
              <img
                src="filter.png"
                alt="from"
                style={{ width: "24px", height: "24px" }}
              />
            </button>
            <div
              id={MyQR.dropdownContent1}
              className={`${MyQR.dropdownContent} ${
                dropdown1Visible ? MyQR.show : ""
              }`}
            >
              <a href="#" onClick={() => toggleDropdown("1")}>
                Link
              </a>
              <a href="#" onClick={() => toggleDropdown("1")}>
                Vcard
              </a>
              <a href="#" onClick={() => toggleDropdown("1")}>
                Text
              </a>
            </div>
          </div>

          <div className={MyQR.dropdown} id={MyQR.fromButton}>
            <button
              onClick={() => toggleDropdown("2")}
              className={MyQR.dropbtn}
            >
              <img
                src="from.png"
                alt="from"
                style={{ width: "24px", height: "24px" }}
              />
            </button>
            <div
              id={MyQR.dropdownContent2}
              className={`${MyQR.dropdownContent} ${
                dropdown2Visible ? MyQR.show : ""
              }`}
            >
              <a href="#" onClick={() => toggleDropdown("2")}>
                New First
              </a>
              <a href="#" onClick={() => toggleDropdown("2")}>
                Old First
              </a>
              <a href="#" onClick={() => toggleDropdown("2")}>
                By Popularity
              </a>
            </div>
          </div>
        </div>
        <div className={MyQR.headDiv2}>
          <input type="text" id={MyQR.searchBox} placeholder="Search..." />
        </div>
        <div className={MyQR.belowDiv}>


        <ul>


          
            {qrCodes.map((code, index) => (
              <li key={index}>
                <div className={MyQR.qrCodeContainer}>
                  <div className={MyQR.checkboxContainer}>
                      {/* Checkbox */}
                      <input type="checkbox" id={MyQR.checkbox} />
                      {/* Text next to the checkbox */}
                      <label htmlFor={MyQR.checkbox} className={MyQR.checkboxLabel}>
                        Include in Selection
                      </label>
                  </div>
                  <img src={code.QRcode} alt={code.name} />
                    <div className={MyQR.qrCodeInfo}>
                      <p>Link: {code.Link}</p>
                      <p>Type: {code.type}</p>
                      <p>Created: {code.generatedAt}</p>
                    </div>

                    <div className={MyQR.buttonsContainer}>
                      <div className={MyQR.dropdown}>
                        <button
                          onClick={() => toggleItemDropdown(code._id)}
                          className={MyQR.dropbtn}
                        >
                          Download
                        </button>
                          <div
                            className={`${MyQR.dropdownContent} ${
                              dropdownVisibility[code._id] ? MyQR.show : ''
                            }`}
                          >
                            {/* Dropdown content */}
                            <a
                              href="#"
                              style={{ display: 'flex', alignItems: 'center' }}
                              onClick={(e) => e.preventDefault()} // Prevent default behavior of anchor tag
                            >
                            PNG
                            <img
                              src="qrdowload.png"
                              alt="Download SVG"
                              style={{
                                width: "24px",
                                height: "24px",
                                marginLeft: "30px",
                              }}
                            />
                          </a>
                          <a
                              href="#"
                              style={{ display: 'flex', alignItems: 'center' }}
                              onClick={(e) => e.preventDefault()} // Prevent default behavior of anchor tag
                            >
                              SVG
                            <img
                              src="qrdowload.png"
                              alt="Download SVG"
                              style={{
                                width: "24px",
                                height: "24px",
                                marginLeft: "30px",
                              }}
                            />
                          </a>
                        </div>
                      </div>
                  <button onClick={() => {
                    if (code.type === "link" ){
                      handleEditLink(code._id);
                    } else if (code.type === "personal"){
                      handleEditPersonal(code._id);
                    }
                    else if (code.type === "text"){
                      handleEditText(code._id);
                    }
                    else if (code.type === "wifi"){
                      handleEditWifi(code._id);
                    }
                    else if (code.type === "personalData"){
                      handleEditPersonalData(code._id);
                    }
                    else if (code.type === "email"){
                      handleEditEmail(code._id);
                    }}}>Edit</button> 
                  <button onClick={() => handleDelete(code._id)}>Delete</button>
                </div>
              </div>
              </li>
            ))}

        </ul>
        </div>
      </div>
    </div>
  );
}

export default MyQRCodesContent;