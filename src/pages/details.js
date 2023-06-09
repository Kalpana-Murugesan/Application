import React from 'react';
import DataTable from './datatable'

const Details = () => {
  const tableStyles = {
    background: '#0069c0',
    color: '#fff',
    border: '2px solid #ccc',
    borderRadius: '10px',
    padding: '10px',
  };
  return (
    <div>
      <div style={tableStyles}>
        <DataTable
        />
      </div>

    </div>

  );
};
export default Details;
