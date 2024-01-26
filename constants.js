// Global Constant and Variables  
export const schoolName = 'Naseem Kharal Government Boys Higher Secondary School Ripri';
export const SEMIS = "(415020315)";
export const addressOfSchool = 'Khuhra Road, Ripri';
export const Tehsil = 'Gambat';
export const District = 'Khairpur';



// Function to format a date from 'yyyy-mm-dd' to a more readable format
export const formatDate = (dateString) => {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};
