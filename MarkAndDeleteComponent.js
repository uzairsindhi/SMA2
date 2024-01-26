// MarkAndDeleteComponent.js
import React, { useState } from "react";
import axios from "axios";

const MarkAndDeleteComponent = () => {
  const [grNumbers, setGrNumbers] = useState([]);
  const [rollNumbers, setRollNumbers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [selectedRecords, setSelectedRecords] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');


  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `${window.location.origin}/api/search/${searchQuery}`
      );
      if (response.data) {
        setSearchResult(response.data);
      } else {
        setSearchResult([]);
      }
    } catch (error) {
      console.error("Error searching for student:", error);
    }
  };

  const handleCheckboxChange = (resultId, result) => {
    setSelectedRecords((prevSelected) =>
      prevSelected.includes(resultId)
        ? prevSelected.filter((id) => id !== resultId)
        : [...prevSelected, resultId]
    );
  
    // Check if grNo is available, if yes, add it to grNumbers array
    if (result.grNo) {
      setGrNumbers((prevGrNumbers) =>
        prevGrNumbers.includes(result.grNo)
          ? prevGrNumbers.filter((id) => id !== result.grNo)
          : [...prevGrNumbers, result.grNo]
      );
    }
  
    // Check if rollNo is available, if yes, add it to rollNumbers array
    if (result.rollNo) {
      setRollNumbers((prevRollNumbers) =>
        prevRollNumbers.includes(result.rollNo)
          ? prevRollNumbers.filter((id) => id !== result.rollNo)
          : [...prevRollNumbers, result.rollNo]
      );
    }
  
    // Check if grNo is missing and rollNo is available, add it to rollNumbers array
    if (!result.grNo && result.rollNo) {
      setRollNumbers((prevRollNumbers) => [
        ...prevRollNumbers,
        result.rollNo,
      ]);
    }
  };
  
  
  
  

  const handleDelete = async () => {
    try {
      if (!selectedClass) {
        console.error("Selected class is not defined");
        return;
      }

      //const grNumbers = selectedStudents.filter((id) => !isNaN(id)); // Filter out non-numeric values
      //const rollNumbers = selectedStudents.filter((id) => isNaN(id)); // Filter out numeric values

      console.log('GR Numbers to delete:', grNumbers);
      console.log('Roll Numbers to delete:', rollNumbers);

      const response = await axios.post(
        `${window.location.origin}/api/students/delete/${selectedClass}`,
        {
          grNumbers,
          rollNumbers,
        }
      );

      if (response.data.success) {
        setSelectedStudents([]);
      } else {
        console.error("Failed to delete students");
      }
    } catch (error) {
      console.error("Error deleting students:", error);
    }
    console.log('selectedStudents: ', selectedStudents);
  };

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        maxWidth: "600px",
        margin: "auto",
        padding: "20px",
      }}
    >
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
      <input
        type="text"
        placeholder="Enter search query"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ padding: "10px", marginRight: "10px" }}
      />
      <button
        onClick={handleSearch}
        style={{ padding: "10px", cursor: "pointer" }}
      >
        Search
      </button>

      {searchResult.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h3>Search Results:</h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {searchResult.map((result) => (
              <li
                key={result._id}
                style={{
                  marginBottom: "10px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <input
                  type="checkbox"
                  checked={selectedRecords.includes(result.grNo || result.rollNo)}
                  onChange={() => handleCheckboxChange(result.grNo || result.rollNo, result)}
                  id={result.id}
                  style={{ marginRight: "10px" }}
                />
                <span>
                  {result.fullName} | {result.fatherName} | {result.class} |{" "}
                  {result.grNo} | {result.rollNo}
                </span>
              </li>
            ))}
          </ul>

          {selectedRecords.length > 0 && (
            <button
              onClick={handleDelete}
              style={{ padding: "10px", marginTop: "20px", cursor: "pointer" }}
            >
              Delete
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default MarkAndDeleteComponent;
