
import ReactDOM from 'react-dom';
import jsPDF from 'jspdf';
import {schoolName, SEMIS, addressOfSchool, Tehsil} from './constants';
import {studentData, setFetchMessage } from './StudentCard';




// Function to convert an image file to a buffer
export const convertImageToBuffer = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      // The result is a data URL containing the base64-encoded image data
      const dataUrl = event.target.result;

      // Extract the base64-encoded image data
      const base64Data = dataUrl.split(',')[1];

      // Convert base64 to buffer
      const imageBuffer = Buffer.from(base64Data, 'base64');

      resolve(imageBuffer);
    };

    reader.onerror = (error) => {
      reject(error);
    };

    // Read the file as a data URL
    reader.readAsDataURL(file);
  });
};



//parchi starts
export const generateParchi = () => {
  // You can customize the parchiContent based on your requirements
  const parchiContent = (
    <>
    <style>{`
    .ParchiContainer {
  width: 19.5cm;
  height: 6.4cm;
  border: 3px dashed green;
  text-align: center;
  position: relative;
}

.title {
  text-decoration: underline;
}

.ParchiContainer p {
  text-align: left;
  display: inline;
  align-self: left;
  margin-right: 5px;
}

.dynamicdata {
  border-bottom: 1px solid;
  box-sizing: border-box;
}

.parchidata {
  margin-left: 10px;
  margin-right: 10px;
  line-height: 1cm; /* Fixed height for each line, adjust if needed */
  text-align: left;
}

.signature {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 4.9cm; /* Fixed width for the signature box */
  height: 1.7cm; /* Fixed height for the signature box */
  margin-right: 15px;
  margin-bottom: 5px;
  border: 1px solid black;
  text-align: center;
}

.signature p {
  line-height: 2.85cm; /* Adjust the line-height to match the height of the signature box */
  margin-bottom: 0; /* Remove any default margin */
}
#sname {
  width: 4cm;
  position: relative;
  text-align: center;
}
#fname {
  width: 3.9cm;
  position: relative;
  text-align: center;
}
#mname {
  width: 3.9cm;
  position: relative;
  text-align: center;
}
#schname {
  width: 8.2cm;
  position: relative;
  text-align: center;
}
#semis {
  width: 3.9cm;
  position: relative;
  text-align: center;
}
#schaddress {
  width: 11.3cm;
  position: relative;
  text-align: center;
}
#tehsil {
  width: 3.9cm;
  position: relative;
  text-align: center;
}
#classno {
  width: 1.5cm;
  position: relative;
  text-align: center;
}
#section {
  width: 1.9cm;
  position: relative;
  text-align: center;
}
#group {
  width: 2.4 cm;
  position: relative;
  text-align: center;
}
#grnum {
  width: 2.4cm;
  position: relative;
  text-align: center;
}
#teachername {
  width: 4.9cm;
  position: relative;
  text-align: center;
}
#teachercontact {
  width: 3.9cm;
  position: relative;
  text-align: center;
}
`}</style>
      <div className="title">
        <h4>SCHOOL/COLLEGE VERIFICATION SLIP</h4>
      </div>
      <div className="parchidata">
        <p>Student Name:<span className="dynamicdata" id='sname'>{studentData.fullName}</span></p>
        <p>Father Name:<span className="dynamicdata" id='fname'>{studentData.fatherName}</span></p>
        <p>Mother Name:<span className="dynamicdata" id='mname'>                </span> </p><br />
        <p>School Name:<span className="dynamicdata" id='schname'>{schoolName}</span> </p>
        <p>SEMIS Code:<span className="dynamicdata" id='semis'>{SEMIS}</span> </p><br />
        <p>School Address:<span className="dynamicdata" id='schaddress'>{addressOfSchool}</span> </p>
        <p>Teshil:<span className="dynamicdata" id='tehsil'>{Tehsil}</span> </p><br />
        <p>Class:<span className="dynamicdata" id='classno'>{studentData.class}</span> </p>
        <p>Section:<span className="dynamicdata" id='section'>_______</span> </p>
        <p>Group:<span className="dynamicdata" id='group'>_________</span> </p>
        <p>GR/Admission #:<span className="dynamicdata" id='grnum'>{studentData.grNo}</span> </p><br />
        <p>Teacher Name:<span className="dynamicdata" id='teachrename'>_____________________</span> </p>
        <p>Teacher Contact:<span className="dynamicdata" id='teachercontact'>_________________</span> </p>
      </div>
      <div className="signature">
        <p>Signature:</p>
      </div>
    </>
  );

  // Create a container element for appending to the current document
  const container = document.createElement('div');
  container.className = "parchiPreview";

  // Append JSX content to the container
  ReactDOM.render(parchiContent, container);

  // Append the container to the document body
  document.body.appendChild(container);
};
//parchi ends



// New function to generate Parchi PDF
export const downloadParchiPDF = async () => {
  if (studentData) {
    // Customize the parchiContent based on your requirements
    const parchiContent = (
      <>
        
        <div className="title">
          <h4>SCHOOL/COLLEGE VERIFICATION SLIP</h4>
        </div>
        <div className="parchidata">
        <p>Student Name:<span className="dynamicdata" id='sname'>{studentData.fullName}</span></p>
        <p>Father Name:<span className="dynamicdata" id='fname'>{studentData.fatherName}</span></p>
        <p>Mother Name:<span className="dynamicdata" id='mname'>                </span> </p><br />
        <p>School Name:<span className="dynamicdata" id='schname'>{schoolName}</span> </p>
        <p>SEMIS Code:<span className="dynamicdata" id='semis'>{SEMIS}</span> </p><br />
        <p>School Address:<span className="dynamicdata" id='schaddress'>{addressOfSchool}</span> </p>
        <p>Teshil:<span className="dynamicdata" id='tehsil'>{Tehsil}</span> </p><br />
        <p>Class:<span className="dynamicdata" id='classno'>{studentData.class}</span> </p>
        <p>Section:<span className="dynamicdata" id='section'>_______</span> </p>
        <p>Group:<span className="dynamicdata" id='group'>_________</span> </p>
        <p>GR/Admission #:<span className="dynamicdata" id='grnum'>{studentData.grNo}</span> </p><br />
        <p>Teacher Name:<span className="dynamicdata" id='teachrename'>_____________________</span> </p>
        <p>Teacher Contact:<span className="dynamicdata" id='teachercontact'>_________________</span> </p>
        </div>
        <div className="signature">
          <p>Signature:</p>
        </div>
      </>
    );

    // Create a container element for appending to the current document
    const container = document.createElement('div');
    container.className = 'parchiPreview';

    // Append JSX content to the container
    ReactDOM.render(parchiContent, container);

    // Introduce a delay to ensure content is fully loaded
    await new Promise((resolve) => setTimeout(resolve, 500)); // Adjust the delay as needed

    // Create a new PDF document
    const doc = new jsPDF({
      unit: 'px',
      format: [1000, 300],
      orientation: 'landscape',
    });

    // Add styles to the head of the document
    const styleElement = document.createElement('style');
    styleElement.textContent = `
    .ParchiContainer {
      width: 19.5cm;
      height: 6.4cm;
      border: 3px dashed green;
      text-align: center;
      position: relative;
    }
    
    .title {
      text-decoration: underline;
    }
    
    p {
      text-align: left;
      display: inline;
      align-self: left;
      margin-right: 5px;
    }
    
    .dynamicdata {
      border-bottom: 1px solid;
      box-sizing: border-box;
    }
    
    .parchidata {
      margin-left: 10px;
      margin-right: 10px;
      line-height: 1cm; /* Fixed height for each line, adjust if needed */
      text-align: left;
    }
    
    .signature {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 4.9cm; /* Fixed width for the signature box */
      height: 1.7cm; /* Fixed height for the signature box */
      margin-right: 15px;
      margin-bottom: 5px;
      border: 1px solid black;
      text-align: center;
    }
    
    .signature p {
      line-height: 2.85cm; /* Adjust the line-height to match the height of the signature box */
      margin-bottom: 0; /* Remove any default margin */
    }
    #sname {
      width: 4cm;
      position: relative;
      text-align: center;
    }
    #fname {
      width: 3.9cm;
      position: relative;
      text-align: center;
    }
    #mname {
      width: 3.9cm;
      position: relative;
      text-align: center;
    }
    #schname {
      width: 8.2cm;
      position: relative;
      text-align: center;
    }
    #semis {
      width: 3.9cm;
      position: relative;
      text-align: center;
    }
    #schaddress {
      width: 11.3cm;
      position: relative;
      text-align: center;
    }
    #tehsil {
      width: 3.9cm;
      position: relative;
      text-align: center;
    }
    #classno {
      width: 1.5cm;
      position: relative;
      text-align: center;
    }
    #section {
      width: 1.9cm;
      position: relative;
      text-align: center;
    }
    #group {
      width: 2.4 cm;
      position: relative;
      text-align: center;
    }
    #grnum {
      width: 2.4cm;
      position: relative;
      text-align: center;
    }
    #teachername {
      width: 4.9cm;
      position: relative;
      text-align: center;
    }
    #teachercontact {
      width: 3.9cm;
      position: relative;
      text-align: center;
    }
  `;

  document.head.appendChild(styleElement);
    // Convert content to data URL
    const contentDataURL = `<div width="1000", height='300'>${container.innerHTML}</div>`;

    // Add the content to the PDF
    doc.html(contentDataURL, {
      callback: function (doc) {
        // Save the PDF after rendering
        doc.save(`${studentData.fullName}_Parchi_${studentData.grNo}.pdf`);
      },
      x: 0,
      y: 0,
    });

    // Clean up, remove the rendered content
    ReactDOM.unmountComponentAtNode(container);
  } else {
    setFetchMessage('No student data found');
  }
};
