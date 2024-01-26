//form component
import React, { useState } from 'react';
import ReactDOMServer from 'react-dom/server';
//import {convertImageToBuffer} from './gfunctions';
import {schoolName, addressOfSchool, SEMIS, Tehsil, District} from './constants';



// Function to convert image file to base64 string
const convertImageToBase64 = (imageFile) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(imageFile);
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = (error) => reject(error);
  });
};



//code starts
function Form() {
    const [formData, setFormData] = useState({
        fullName: '',
        fatherName: '',
        caste: '',
        religon: '',
        dateOfBirth: '',
        nic: '',
        gender: '',
        markOfIdentification: '',
        class: '',
        contactNumber: '',
        email: '',
        address: '',
        lastSchoolAttended: '',
        dateOfFormSubmission: '',
        dateOfAdmission: '',
        grNo: '',
        rollNo: '',
        photo: '',

      });


const [globalFetchedClass, setGlobalFetchedClass] = useState('');

//update code starts here
const handleFetchData = async () => {
  try {
    // Check if either G.R number or Roll number is provided
    if (formData.grNo || formData.rollNo) {
      // Fetch the student data based on G.R number or Roll number
      const response = await fetch(`${window.location.origin}/api/students/${formData.grNo || formData.rollNo}`);
      const responseData = await response.json();
      console.log('Response from server:', responseData);
      

      if (response.ok) {
        const studentData = responseData;
        
        // Check if a student record is found
        if (studentData) {
          // Update the form fields with the fetched data
          setFormData({
            ...formData,
            fullName: studentData.fullName || '',
            fatherName: studentData.fatherName || '',
            caste: studentData.caste || '',
            religon: studentData.religon || '',
            dateOfBirth: studentData.dateOfBirth ? new Date(studentData.dateOfBirth.toString().split("T")[0]) : '',
            nic: studentData.nic || '',
            gender: studentData.gender || '',
            markOfIdentification: studentData.markOfIdentification || '',
            class: studentData.class || '',
            contactNumber: studentData.contactNumber || '',
            email: studentData.email || '',
            address: studentData.address || '',
            lastSchoolAttended: studentData.lastSchoolAttended || '',
            dateOfFormSubmission: studentData.dateOfFormSubmission ? new Date(studentData.dateOfFormSubmission.toString().split("T")[0]) : '',
            dateOfAdmission: studentData.dateOfAdmission ? new Date(studentData.dateOfAdmission.toString().split("T")[0]) : '',
            grNo: studentData.grNo || '',
            rollNo: studentData.rollNo || '',
            // Update other fields as needed
          });



          // Set the fetchedClass using the state hook
          setGlobalFetchedClass(studentData.class || '');

          // Set dyClass using the class property from studentData
        const dyClass = studentData.class || '';
        console.log(`dyClass inside hUC: ${dyClass}`);

          console.log(globalFetchedClass)
          console.log('Full Name:', studentData.fullName);
          console.log('Father\'s Name:', studentData.fatherName);
          console.log('Class:', studentData.class);
          console.log('Date of Birth (String):', studentData.dateOfBirth);
          console.log('Date of Form Submission (String):', studentData.dateOfFormSubmission);
          console.log('Date of Admission (String):', studentData.dateOfAdmission);


/*
          // Change the button text to Update
          document.getElementById('submitBtn').innerText = 'Update';
          // Change the button functionality to handle the update
          document.getElementById('submitBtn').removeEventListener('click', handleFormSubmit);
          document.getElementById('submitBtn').addEventListener('click', handleUpdateSubmit);
**/


          console.log('Record found and form updated for update');
        } else {
          console.log('No record found for update');
        }
      } else {
        console.error('Failed to fetch student data for update:', response.statusText);
      }
    } else {
      console.log('G.R number or Roll number is required for update');
    }
  } catch (error) {
    console.error('Error fetching student data for update:', error);
  }
};


// Function to handle form update submission
async function handleUpdateSubmit(...studentData) {
  

  try {
    // Make sure either G.R number or Roll number is provided
    if (formData.grNo || formData.rollNo) {
      
      
      
      // Use the class name to dynamically select the corresponding collection
      //const responseStudent = await fetch(`http://127.0.0.1:3001/api/search/${formData.grNo||formData.rollNo}
const responseStudent = await fetch(`${window.location.origin}/api/Students/${formData.grNo || formData.rollNo}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    ...formData,
    // Convert the photo to base64 string
    photo: formData.photo ? await convertImageToBase64(formData.photo) : '',
    class: formData.class,
  }),
});


      if (responseStudent.ok) {
        console.log(`Form data updated successfully in MongoDB for ${formData.grNo || formData.rollNo}`);
      } else {
        console.error(`Failed to update form data in MongoDB for ${formData.grNo || formData.rollNo}`);
      }
    } else {
      console.log('G.R number or Roll number is required for update');
    }
  } catch (error) {
    console.error('Error updating form data:', error);
  }
};
//update code ends here



//handling data submission function starts here

const handleFormSubmit = async (e) => {
  e.preventDefault();

  // 1. Determine the class selected in the form
  const selectedClass = formData.class;

  // 2. Send the form data to the server for class-specific storage
  try {
    const responseClass = await fetch(`${window.location.origin}/api/Students/${selectedClass}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
        // Convert the photo to base64 string
        photo: formData.photo ? await convertImageToBase64(formData.photo) : '',
        class: formData.class,
      }),
    });

    if (responseClass.ok) {
      console.log(`Form data submitted successfully to MongoDB for ${selectedClass}`);
    } else {
      console.error(`Failed to submit form data to MongoDB for ${selectedClass}`);
    }
  } catch (error) {
    console.error('Error submitting form data:', error);
  }


//image buffer convertor
// Convert the image file to a buffer
try {
  const imageBuffer = await convertImageToBase64(formData.photo);

  // Update the formData with the image buffer
  setFormData({ ...formData, photo: imageBuffer });
} catch (error) {
  //console.error('Error converting image to buffer: Either Image is not selected or the selected image is invalid');
  // Handle the error appropriately
  return;
}


  // Create a new HTML page content
  const formDataContent = (
    <ul>
      <p>
        <strong>Full Name:</strong> {formData.fullName}
      </p>
      <p>
        <strong>Father's Name:</strong> {formData.fatherName}
      </p>
      <p>
        <strong>Caste:</strong> {formData.caste}
      </p>
      <img src={URL.createObjectURL(formData.photo)} alt="User" id="imga" />
      <p>
        <strong>Date Of Birth:</strong>{" "}
        {formData.dateOfBirth.toString().split("T")[0]}
      </p>
      <p>
        <strong>Religon:</strong> {formData.religon}
      </p>
      <p>
        <strong>CNIC:</strong> {formData.nic}
      </p>
      <p>
        <strong>Gender:</strong> {formData.gender}
      </p>
      <p>
        <strong>Mark Of Identification:</strong> {formData.markOfIdentification}
      </p>
      <p>
        <strong>Class:</strong> {formData.class}
      </p>
      <p>
        <strong>Contact Number:</strong> {formData.contactNumber}
      </p>
      <p>
        <strong>Email:</strong> {formData.email}
      </p>
      <p>
        <strong>Date of Form Submission:</strong>{" "}
        {formData.dateOfFormSubmission.toString().split("T")[0]}
      </p>
      <p>
        <strong>Date of Form Admission:</strong>{" "}
        {formData.dateOfAdmission.toString().split("T")[0]}
      </p>
      <p>
        <strong>Address:</strong> {formData.address}
      </p>
      <p>
        <strong>Last School Attended:</strong> {formData.lastSchoolAttended}
      </p>
      <p>
        <strong>General Register No: :</strong> {formData.grNo}
      </p>
      <p>
        <strong>Roll Number: :</strong> {formData.rollNo}
      </p>
      {/* Add other form fields as needed */}
    </ul>
  );





  const htmlContent = (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Student Data</title>
      </head>
      <body>
        <link rel="stylesheet" href="./MyComponents./formstyle.css" />
        <div id="page">
          <h1> {schoolName + " " + SEMIS + " "}</h1>
          <p align="center">
            {addressOfSchool + " " + Tehsil + " " + District}
          </p>
          {formDataContent}
        </div>
      </body>
    </html>
  );



  // Open a new tab with the generated HTML content
  const newTab = window.open();
  newTab.document.write(ReactDOMServer.renderToStaticMarkup(htmlContent));
  newTab.document.close();
  if (newTab !== null) {
  console.log("New tab is blank")
} else {
  console.error('newTab is null');
}
};

//onclick submit a form will be displayed in new tab
    return (
  
      <div id="form">
         
               <form onSubmit={handleFormSubmit} encType="multipart/form-data">
        <div id="names">
          <input type="text" id="FullName" name='FullName' placeholder="Full Name" value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} />
          <input type="text" id="Father'sName" name='FatherName' placeholder="Father's Name" value={formData.fatherName}
            onChange={(e) => setFormData({ ...formData, fatherName: e.target.value })} />
        </div>
        <div id="race">
          <input type="text" id="cast" name='Caste' placeholder="Caste" value={formData.caste} onChange={(e) => setFormData({...formData, caste: e.target.value})} />
          <input type="text" id="religon" placeholder="Religon" value={formData.religon} onChange={(e) => setFormData({ ...formData, religon: e.target.value })} />
        </div>
        <div id="DOB">
          <label htmlFor="DOB">DOB:</label>
          <input type='date' id="DOB" name='DOB' value={formData.dateOfBirth} onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})} />
          <input type="number" name="NIC" id="CNIC" placeholder="CNIC Number If Available" value={formData.nic} onChange={(e) => setFormData({ ...formData, nic: e.target.valueAsNumber})} />
        </div>
        <div id="genderdiv">
          <p id='cgend'><strong>Choose Your Gender</strong></p>
          <label htmlFor="radio1">
            <input type="radio" className="gen" name="radio" id="radio1" value="Male" onChange={(e) => setFormData({ ...formData, gender: e.target.value })} /> Male </label>
        <label htmlFor="radio2">
            <input type="radio" className="gen" name="radio" id="radio2" value="Female" onChange={(e) => setFormData({ ...formData, gender: e.target.value })} /> Female </label> </div>

        <div id="markofid">
          <input type="text" id="markofidentification" name='MarkOfIdentification' placeholder="Mark of Identification" value={formData.markOfIdentification} onChange={(e) => setFormData({ ...formData, markOfIdentification: e.target.value })} />
        </div>
        <div id="classofadmission">
          <select name="Class" id="class" onChange={(e) => setFormData({...formData, class: e.target.value})} >
          <option value="">Select Class</option>
            <option value="Class-Katchi">Class-Katchi</option>
            <option value="Class-I">Class-I</option>
            <option value="Class-II">Class-II</option>
            <option value="Class-III">Class-III</option>
            <option value="Class-IV">Class-IV</option>
            <option value="Class-V">Class-V</option>
            <option value="Class-VI">Class-VI</option>
            <option value="Class-VII">Class-VII</option>
            <option value="Class-VIII">Class-VIII</option>
            <option value="Class-IX">Class-IX</option>
            <option value="Class-X">Class-X</option>
            <option value="Class-XI-PE">Class-XI PE</option>
            <option value="Class-XI-PM">Class-XI PM</option>
            <option value="Class-XI-Arts">Class-XI Arts</option>
            <option value="Class-XII-PE">Class-XII PE</option>
            <option value="Class-XII-PM">Class-XII PM</option>
            <option value="Class-XII-Arts">Class-XII Arts</option>
          </select>
          <input type="number" id="Contact" name='Contact' placeholder="Contact Number" value={formData.contactNumber} onChange={(e) => setFormData({...formData, contactNumber: e.target.value})}/>
          <input type='email' id='email' name='Email' placeholder="Email Address" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
        </div>
        <div id="Address">
          <input type="text" name="address" id="address" placeholder="Write Your Address Here!" value={formData.address} onChange={(e)=> setFormData({...formData, address: e.target.value})} />
          <input type="text" name="previousschool" id="preschool" placeholder="Last School Attended" value={formData.lastSchoolAttended} onChange={(e)=> setFormData({...formData, lastSchoolAttended: e.target.value})} />
        </div>
        <div id="dateofformdata">
          <label htmlFor="datasub">Date of Form Submission</label>
          <input type="date" name="dateofformsubmission" id="datasub" value={formData.dateOfFormSubmission} onChange={(e)=> setFormData({...formData, dateOfFormSubmission: e.target.value})} />
        </div>
        <div id="dateofadmission">
          <label htmlFor="datadmis">Date of Admission</label>
          <input type="date" name="dateofadmission" id="dateofad" value={formData.dateOfAdmission} onChange={(e)=> setFormData({...formData, dateOfAdmission: e.target.value})} />
          <input type="number" id="grno" name='GRNo' placeholder="GR. No, If allotted" value={formData.grNo} onChange={(e) => setFormData({...formData, grNo: e.target.valueAsNumber})} />
          <input type="number" id="rollno" name='RollNo' placeholder="Roll Number" value={formData.rollNo} onChange={(e) => setFormData({...formData, rollNo: e.target.valueAsNumber})} />
        </div>
        <div id="imageinput">
        <input type="file" name="photo" id="photo" accept="image/*" onChange={(e) => setFormData({ ...formData, photo: e.target.files[0] })} />
        </div>
        <button type="submit" id='submitBtn' >Submit</button>
        <button type="button" onClick={handleUpdateSubmit}>Upate Data!</button>
        <button type="button" onClick={handleFetchData}>Fetch Student Data</button>

      
      </form>
          </div>
    )
  }
  
  export default Form