import React, { useState } from "react";
import Table from "./components/Table";
import data from "./assets/data.json";

function App() {
  return (
    <div className='App'>
      <h2>Table</h2>
      <Table tableData={data} filter={[]} />
      <Table
        tableData={data}
        filter={[
          { text: "Name", dataField: "name", sort: true },
          { text: "Role", dataField: "role", sort: true },
          { text: "Joining Date", dataField: "joiningDate", sort: true },
        ]}
      />
      {/* pass a req col-name in filter or empty will print all columns   */}
    </div>
  );
}

export default App;
