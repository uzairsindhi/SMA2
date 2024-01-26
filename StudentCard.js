//Time 1036 28122023
//student card generator
//this can generate student card after converting it to photo
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import {schoolName, SEMIS, addressOfSchool, Tehsil, District} from './constants';

//import './StudentCard.css';



const generateCardContent = (studentData) => {
  if (!studentData) {
    return <p>No student data available</p>;
  }
  
  return (
    <>
    <style>{`
  /* studentCard.css */
  @font-face {
    font-family: 'SindhiUrduFonts';
    src: url('./mblateefi.ttf') format('truetype'),
         url('./JameelNoori.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
  }
  
  


  #studentcardfront {
    /*border: 1px solid #12b31a;*/
    padding-right: 20px;
    padding-left: 20px;
    width: 8.6cm;
    height: 5.5cm;
    font-size: 7px;
    /*box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);*/
    background-image: url('./cardbg.jpg');
    border: 1px solid black;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
  }

  #schnalo, #snalo {
    margin-top: 2px;
    font-family: 'Arial', sans-serif;
    font-size: 12px;
  }


  #studentcardback {
    /*border: 1px solid #12b31a;*/
    padding-right: 20px;
    padding-left: 20px;
    width: 8.6cm;
    height: 5.5cm;
    font-size: 7px;
    /*box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);*/
    background-image: url('./cardbg1.jpg');
    border: 1px solid black;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
  }

  #semis {
    margin: auto;
  }

  #SchoolName {
    text-align: center;
    line-height: 15px;
    width: 98%;
    
  }

  .scard {
    background-color: black;
    margin: auto;
    padding: 5px;
    color: yellow;
    display: inline;
    border: 1px solid white;
    border-radius: 5px 0px;
  }


  #SchoolName p {
    line-height: 6px;
    margin-bottom: 4px;
  }

  .studentInfo {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    /* Align items at the start (top) of the container */
  }

  #StudentData {
    text-align: left;
    margin-top: 1px;
    width: 48%;
  }

  .photo {
    width: 75px;
    height: 95px;
    margin-bottom: 75px;
    border: 1px dotted black;
    border-radius: 4px;
    padding: 1px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #image {
    border-radius: 4px;
    width: 100%;
    height: 100%;
  }

  .sindhiscard{
    font-family: mblateefi;
    font-size: 11px;
  }

  .studentcar {
    
    font-family: 'Arial', sans-serif;
    font-size: 11px;
  }

  #StudentData h1 {
    margin-bottom: 7px;
    color: Black;
  }

  #StudentData p {
    margin: 5px 0;
    line-height: 8px;
}
`}</style>
    <div id="studentcardfront" className="studentcar" data-side='frontside'>
    <div id="SchoolName" className="SchoolName">
      <h1 id='schnalo'> <strong>{schoolName}</strong>  </h1>
      <p id='semis'>
        {SEMIS}
      </p>
      <p>
        {addressOfSchool + " " + Tehsil + " " + District}
      </p>
      <p id="scard" className="scard">
        <strong>Student Identity Card</strong>
      </p>
    </div>
    <div className="studentInfo">
      <div id="StudentData" className="StudentData">
        <h1 id='snalo'> <strong>  {studentData.fullName} </strong></h1>
        <p>Father's Name: {studentData.fatherName}</p>
        <p>G.R No: {studentData.grNo}</p>
        <p>Roll No: {studentData.rollNo}</p>
        <p>Class: {studentData.class}</p>
      </div>
      <div id="photo" className="photo">
      <img id='image' src={`data:image/png;base64,${studentData.photo}`} alt={studentData.fullName + "'s Photo"} />
      </div>
    </div>

    {/* Add other relevant details as needed */}
  </div>
  <div id="studentcardback" className="studentcar" data-side='backside'>
    <div id="SchoolName" className="SchoolName">
      <h1 id='schnalo'>{schoolName}</h1>
      <p id='semis'>
        {SEMIS}
      </p>
      <p>
        {addressOfSchool + " " + Tehsil + " " + District}
      </p>
      <p id="sindhiscard" className="sindhiscard">
        <strong>شاگرد جو سڃاڻپ ڪارڊ</strong>
      </p>
      <p>!هٿ آيل ڪارڊ کي ان جي مالڪ تائين پهچائڻ جي ڪوشش ڪيو</p>
    </div>
  </div>
  </>
    
    
  );
};

  const StudentCard = () => {
  const [grNumber, setGrNumber] = useState('');
  const [studentData, setStudentData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchMessage, setFetchMessage] = useState('');

  const handleFetchData = async () => {
    try {
      setIsLoading(true);
      setFetchMessage('Loading...'); // Set loading message
      console.log('Search Query:', grNumber);
      const response = await axios.get(`${window.location.origin}/api/search/${grNumber}`);

      if (response.data && response.data.length > 0) {
        setStudentData(response.data[0]); // Assuming you want the first result
        setFetchMessage(`${response.data[0].fullName}'s data Fetched`); // Update fetch message
      } else {
        setStudentData(null);
        setFetchMessage('No student data found');
      }
    } catch (error) {
      console.error('Error searching for student:', error);
      setFetchMessage('Error fetching data'); // Set an error message
    } finally {
      setIsLoading(false);
    }
  };

  const generateStudentCard = (scaleFactor, isPreviewMode) => {
    if (studentData) {
      const cardContent = generateCardContent(studentData);
  
      // Create a container element for appending to the current document
      const container = document.createElement('div');
      container.className = "cardPreview";
      container.id = "cardPreview";
  
      // Set the size based on the scaleFactor
      container.style.width = `${17 * scaleFactor}cm`;
      container.style.height = `${10.8 * scaleFactor}cm`;
  
      // Set the positioning based on the preview mode
      if (isPreviewMode) {
        container.style.float = 'center';
      }
  
      // Append JSX content to the container
      ReactDOM.render(cardContent, container);
  
      // Reference to the buttons container
      const buttonsContainer = document.getElementById("buttonsContainer");
  
      // Insert the container after the buttons
      if (buttonsContainer) {
        buttonsContainer.insertAdjacentElement('afterend', container);
      } else {
        // Fallback: if buttonsContainer is not found, append to the body
        document.body.appendChild(container);
      }
    } else {
      // Prompt user to fetch data first
    }
  };
  
  





// Function to download the student card as an image
const downloadImage = () => {
  if (studentData) {
    const cardContent = generateCardContent(studentData);

    // Create a container element for appending to the current document
    const container = document.createElement('div');

    // Append JSX content to the container
    ReactDOM.render(cardContent, container);

    // Append the container to the document body
    document.body.appendChild(container);

    // Convert content to canvas
    html2canvas(container, {scale: 2
    }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');

        // Create a link element and trigger a download
        const link = document.createElement('a');
        link.href = imgData;
        link.download = `${studentData.fullName}_Card_${studentData.grNo}.png`;

        // Append the link to the body after a short delay
        setTimeout(() => {
          document.body.appendChild(link);

          // Wait for the link to be appended before clicking it
          link.click();

          // Remove the link from the body after the click
          setTimeout(() => {
            document.body.removeChild(link);
          }, 0);
        }, 0);
      })
      .catch((error) => {
        console.error('Error generating image:', error);
      })
      .finally(() => {
        // Remove the container from the body
        document.body.removeChild(container);
      });
  } else {
    // Prompt user to fetch data first
  }
};

// New function to generate PDF directly from HTML content
const downloadTextPDF = async () => {
  if (studentData) {
    const cardContent = generateCardContent(studentData);

    // Render JSX content to a container
    const container = document.createElement('div');
    ReactDOM.render(cardContent, container);

    // Introduce a delay to ensure content is fully loaded
    await new Promise((resolve) => setTimeout(resolve, 500)); // Adjust the delay as needed

    // Create a new PDF document
    const doc = new jsPDF({
      unit: 'px',
      format: [1010, 1300], // Set the width and height in pixels
      orientation: 'potrait',
    });

    // Convert content to data URL
    const contentDataURL = `<div>${container.innerHTML}</div>`;

    // Add the content to the PDF
    doc.html(contentDataURL, {
      callback: function (doc) {
        // Save the PDF after rendering
        doc.save(`${studentData.fullName}_TextCard_${studentData.grNo}.pdf`);
      },
      x: 7,
      y: 7,
    });

    // Clean up, remove the rendered content
    ReactDOM.unmountComponentAtNode(container);
  } else {
    setFetchMessage('No student data found');
  }
};




// Function to download the student card as a PDF
const downloadPDF = () => {
  if (studentData) {
    const cardContent = generateCardContent(studentData);

    // Create a container element for appending to the current document
    const container = document.createElement('div');

    // Append JSX content to the container
    ReactDOM.render(cardContent, container);

    // Append the container to the document body
    document.body.appendChild(container);

    // Create a new PDF document
    const doc = new jsPDF();

    // Convert content to canvas
    html2canvas(container)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');

        // Add the image to the PDF
        doc.addImage(imgData, 'PNG', 2.5, 5, 280, 240); // Adjust the positioning and size as needed

        // Save the PDF after a short delay
        setTimeout(() => {
          doc.save(`${studentData.fullName}_Card_${studentData.grNo}.pdf`);
        }, 0);
      })
      .catch((error) => {
        console.error('Error generating PDF:', error);
      })
      .finally(() => {
        // Remove the container from the body
        document.body.removeChild(container);
      });
  } else {
    // Prompt user to fetch data first
  }
};






  return (
    <div style={{ textAlign: 'center', padding: '20px', backgroundColor: 'lightblue' }}>
      <h1>Generate Student Card</h1>
      <label htmlFor="grNumber">Enter G.R Number:</label>
      <input
        type='number'
        id="grNumber"
        value={grNumber}
        onChange={(e) => setGrNumber(e.target.value)}
        style={{ margin: '10px', padding: '5px' }}
      />
     <div id="buttonsContainer">
     <button
        onClick={handleFetchData}
        style={{ backgroundColor: 'green', color: 'white', padding: '8px', borderRadius: '5px', cursor: 'pointer' }}
      >
        {isLoading ? 'Loading...' : 'Fetch Student Data'}
      </button>
      <p>{fetchMessage}</p>
      <button
        onClick={() => generateStudentCard(1, true)}
        style={{ backgroundColor: 'orange', color: 'black', padding: '8px', borderRadius: '5px', cursor: 'pointer' }}
      >
        Generate & Preview Student Card
      </button>
      <button
      onClick={downloadImage}
      style={{ backgroundColor: 'purple', color: 'white', padding: '8px', borderRadius: '5px', cursor: 'pointer', marginLeft: '10px' }}
    >
      Download Image
    </button>
      <button
        onClick={downloadPDF}
        style={{ backgroundColor: 'blue', color: 'white', padding: '8px', borderRadius: '5px', cursor: 'pointer', marginLeft: '10px' }}
      >
        Download Image PDF
      </button>
      <button
        onClick={downloadTextPDF}
        style={{ backgroundColor: 'red', color: 'white', padding: '8px', borderRadius: '5px', cursor: 'pointer', marginLeft: '10px' }}
      >
        Download Text PDF
      </button>
     </div>
    </div>
  );
};

export default StudentCard;
