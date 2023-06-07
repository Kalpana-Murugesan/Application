import { React, useEffect, useState } from "react"
import MUIDataTable from "mui-datatables";
import axios from 'axios';


const DataTable = () => {
  const [Data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      axios.get('http://localhost:5000/getAllUser')
        .then(res => setData(res.data.data))
        .catch(err => console.log(err))
    }
    fetchData();
  }, [])


  const columns = ["EmpId", "Time", "date",]; // Define your table columns    

  const options = {
    responsive: 'standard',
    selectableRows: 'none',
    print: true,
    download: true,
  };
  return (
    <div>
      <MUIDataTable

        title="Employee Data"
        data={Data}
        columns={columns}
        options={options}
      />
    </div>
  )
};

export default DataTable;
