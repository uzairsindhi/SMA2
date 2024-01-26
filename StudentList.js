import React, { useState, useRef } from 'react';
import { renderToString } from 'react-dom/server';
import axios from 'axios';
import jsPDF from 'jspdf';
import { schoolName, addressOfSchool, Tehsil, District } from './constants';
//import './tablestyleforStudentlist.css';





const StudentList = () => {
  const [selectedClass, setSelectedClass] = useState('');
  const [students, setStudents] = useState([]);
  const listRef = useRef(null);

  const generateList = async () => {
    if (selectedClass) {
      try {
        const response = await axios.get(`${window.location.origin}/api/students/class/${selectedClass}`);
        setStudents(response.data);
        console.log('Fetched Data:', response.data);
       // console.log('Fetched Data:', response.data[0].class);
        
  
        // Create a new div container to show the list dynamically
        const listContainer = document.createElement('div');
        listContainer.style.border = '2px solid black';
        listContainer.style.padding = '10px';
        listContainer.style.margin = '10px';
        listContainer.style.backgroundColor = '#f0f0f0';
        const listContent = renderStudentList(response.data);
        

        
        // Convert React element to HTML string
        const listHtmlString = renderToString(listContent);
  
        // Use innerHTML to set the HTML content
        listContainer.innerHTML = listHtmlString;
  
        // Append the listContainer to the listRef
        listRef.current.innerHTML = '';
        listRef.current.appendChild(listContainer);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  };


  
  
  

  const downloadListPDF = async () => {
    if (students.length === 0) {
      return console.log('No One is Enrolled in this Class');
    }
  
    const listContent = renderStudentList(students);
  
    // Convert React element to HTML string
    const listHtmlString = renderToString(listContent);
  
    // Create a new PDF document
    const pdf = new jsPDF({
      unit: 'px',
      format: 'a3',
      orientation: 'landscape',
      pageSize: 'a3', // Adjust the page size as needed
      width: '100%',
      margin: { top: 10, right: 10, bottom: 20, left: 10 },
    });
  
    // Add the content to the PDF
    pdf.html(listHtmlString, {
      callback: function (pdf) {
        // Save the PDF after rendering
        pdf.save(`StudentList_${selectedClass}.pdf`);
      },
    });
  }

  const renderStudentList = (studentList) => (
    <table className={'tableStyle'} style={{width: '100%', display: 'inlineBlock'}}>
        <tr><h1 style={h1}>{schoolName}</h1></tr>
        <tr><h2 style={h1}>{addressOfSchool + ' ' + Tehsil + ' ' + District}</h2></tr>
      <thead>
        <tr style={{ borderBottom: '1px solid #ddd', width: 'fit-content',}}>
          <th style={tableCellStyle}>S. No</th>
          <th style={tableCellStyle} id='gr'>GR Number</th>
          <th style={tableCellStyle} id='nalo'>Student Name</th>
          <th style={tableCellStyle} id='fathernalo'>Father's Name</th>
          <th style={tableCellStyle} id='caste'>Caste</th>
          <th style={tableCellStyle} id='religon'>Religon</th>
          <th style={tableCellStyle} id='DOB'>Date Of Birth</th>
          <th style={tableCellStyle} id='roll'>Roll Number</th>
          <th style={tableCellStyle} id='jins'>Gender</th>
          <th style={tableCellStyle} id='mundi'>Picture</th>
        </tr>
      </thead>
      <tbody>
        {studentList.map((student, index) => (
          <tr key={student.grNo || student.rollNo}>
            <td style={tableCellStyle} >{index + 1}</td>
            <td style={tableCellStyle}>{student.grNo}</td>
            <td style={tableCellStyle}>{student.fullName}</td>
            <td style={tableCellStyle}>{student.fatherName}</td>
            <td style={tableCellStyle}>{student.caste}</td>
            <td style={tableCellStyle}>{student.religon}</td>
            <td style={tableCellStyle}>{student.dateOfBirth}</td>
            <td style={tableCellStyle}>{student.rollNo}</td>
            <td style={tableCellStyle}>{student.gender}</td>
            <td style={tableCellStyle}><img id='image' width={47} height={55} src={`data:image/png;base64,${student.photo}`} alt={student.fullName + "'s Photo"} /></td>
            
          </tr>
        ))}
      </tbody>
    </table>
  );
  
//styling starts
const tableCellStyle = {
  width: 'fit-content',
  fontSize: '12px',
  padding: '8px',
  margin: '18px',
  textAlign: 'left',
  borderBottom: '1px solid red',
};

const h1 = {
  display: 'block',
  width: '100%',
  textAlign: 'center',
  fontSize: '16px',
}

//styling ends

  

  return (
    <div style={{ textAlign: 'center', padding: '20px', backgroundColor: 'yellow', color: 'black' }}>
      <h1>Generate Student List</h1>
      <label htmlFor="classSelect">Select Class:</label>
      <select
        id="classSelect"
        onChange={(e) => setSelectedClass(e.target.value)}
        value={selectedClass}
        style={{ margin: '10px', padding: '5px', backgroundColor: '#0dcaf0', color: 'black' }}
      >
            
            <option>Select Class</option>
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
      <button
        onClick={generateList}
        style={{ backgroundColor: 'black', color: 'yellow', padding: '8px', borderRadius: '5px', cursor: 'pointer' }}
      >
        Generate List
      </button>
      <button
        onClick={downloadListPDF}
        style={{ backgroundColor: 'blue', color: 'white', padding: '8px', borderRadius: '5px', cursor: 'pointer', marginLeft: '10px' }}
      >
        Download List as PDF
      </button>

      


      <div ref={listRef}></div>
    </div>
  );
};

export default StudentList;
