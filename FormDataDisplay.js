// FormDataDisplay.js
import React, { useEffect, useState } from 'react';
import { jsPDF } from 'jspdf';

async function FormDataDisplay({ studentName, formData }) {
  const [downloadLink, setDownloadLink] = useState('');

  useEffect(() => {
    // Fetch student data based on G.R number
    const fetchStudentData = async () => {
      try {
        const response = await fetch(`${window.location.origin}/api/search/${formData.grNo}`);
        if (response.ok) {
          const studentData = await response.json();
          console.log('Fetched Student Data:', studentData);

          // Generate PDF and set download link
          const pdfLink = generatePdf(studentName, studentData);
          setDownloadLink(pdfLink);
        } else {
          console.error('Failed to fetch student data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };

    fetchStudentData();
  }, [formData.grNo, studentName]);

  const generatePdf = (studentName, studentData) => {
    const pdf = new jsPDF();
    const fileName = studentData.grNo ? `${studentData.grNo}_${studentName}_userData.pdf` : `${studentName}_userData.pdf`;
    console.log(fileName + 'pdf is ready')
    // Use fromHTML instead of html
    pdf.fromHTML(document.getElementById('page'), 15, 15, { width: 170 });

    // Save the PDF content to a Blob
    const pdfContent = pdf.output('blob');

    // Create a download link
    const downloadLink = URL.createObjectURL(pdfContent);

    return downloadLink;
  };

  return (
    <div>
      <h1>{`${studentName}'s Data submitted Successfully`}</h1>
      {/* Display other form data as needed */}
      <ul>
        <p><strong>Full Name:</strong> {formData.fullName}</p>
        <p><strong>Father's Name:</strong> {formData.fatherName}</p>
        {/* Add other form fields as needed */}
      </ul>
      <a href={downloadLink} download="userData.pdf">
        <button>Download PDF</button>
      </a>
    </div>
  );
}

export default FormDataDisplay