import { useState, useEffect } from "react";
import profile from "../assets/profile.png";
import moment from "moment";
import sortObjectsArray from "sort-objects-array";

const Table = ({ tableData, filter }) => {
  const [columns, setColumns] = useState([
    {
      text: "Name",
      dataField: "name",
    },
    {
      text: "City",
      dataField: "city",
    },
    { text: "Email Address", dataField: "email" },
    { text: "Joining Date", dataField: "joiningDate" },
    { text: "Role", dataField: "role" },
  ]);
  const [filterData, setfilterData] = useState([...tableData]);
  let filteredColumn;
  filteredColumn = filter.length ? filter : columns;

  const handleSort = (dataField) => {
    if (dataField === "joiningDate") {
      let sortedParsedDates = [...filterData].sort(
        (a, b) =>
          moment(a.joiningDate, ["MM-DD-YYYY", "YYYY-MM-DD", "YYYY MM DD"]) -
          moment(b.joiningDate, ["MM-DD-YYYY", "YYYY-MM-DD", "YYYY MM DD"])
      );
      setfilterData([...sortedParsedDates]);
    } else {
      let data = sortObjectsArray(
        filterData,
        dataField === "name" || dataField === "email" ? "email" : dataField,
        "asc"
      );
      setfilterData([...data]);
    }
  };

  return (
    <div className='table-responsive-sm my-4'>
      <table className='table-sm table-striped table-bordered'>
        <thead>
          <tr>
            {filteredColumn.map(({ text, dataField, sort }) => {
              return (
                <th
                  key={dataField}
                  onClick={() => sort && handleSort(dataField)}>
                  {text}
                  <img
                    className='sort'
                    src={
                      "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTIgMGw4IDEwaC0xNmw4LTEwem04IDE0aC0xNmw4IDEwIDgtMTB6Ii8+PC9zdmc+"
                    }
                    alt='sort icon'
                  />
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {filterData.map((data, i) => {
            return (
              <tr key={i}>
                {filteredColumn.map(({ dataField }, j) => (
                  <td key={j}>
                    {data[dataField] ? (
                      dataField === "email" ? (
                        <a href={`mailto:${data[dataField]}`}>
                          {data[dataField]}
                        </a>
                      ) : (
                        data[dataField]
                      )
                    ) : (
                      <>
                        <img src={profile} alt='image' />{" "}
                        {data.person[dataField]}
                      </>
                    )}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
