let data = [
  {
    firstName: "Sunny",
    middleName: "NA",
    lastName: "Tyagi",
    email: "sunny.tyagi@sourcefuse.com",
    phone: "6396786017",
    role: 1,
    address: "Ghaziabad",
    id: 1,
  },
  {
    firstName: "Deepak",
    middleName: "NA",
    lastName: "Kumar",
    email: "deepak.kumar@sourcefuse.com",
    phone: "8559010326",
    role: 2,
    address: "Mohali",
    id: 2,
  },
  {
    firstName: "Meghna",
    middleName: "NA",
    lastName: "kashyap",
    email: "meghna.kashyap@sourcefuse.com",
    phone: "7834086997",
    role: 0,
    address: "Mohali",
    id: 3,
  },
  {
    firstName: "Samarpan",
    middleName: "NA",
    lastName: "Bhattacharya",
    email: "samarpan.bhattacharya@sourcefuse.com",
    phone: "9999909854",
    role: 3,
    address: "Mohali",
    id: 4,
  },
];

enum role {
  "HR Recruiter",
  "Web-Apps Trainee",
  "Snr. Tech. Head",
  "Principal Architect",
}

interface CRUD {
  data: any[];
  loadData: () => void;
  deleteRow: (rowNum: any) => void;
  save: (rowNum: any) => void;
  cancel: (rowNum: any) => void;
  editRow: (rowNum: any) => void;
  refreshData: () => void;
}

class userDataTable implements CRUD {
  data: any[];
  constructor(_data) {
    this.data = _data;
  }

  loadData(): void {
    const table = document.getElementById(
      "dataTable"
    ) as HTMLTableElement | null;
    let rowCount = table.rows.length;
    for (let employeeData of this.data) {
      let row = table.insertRow(rowCount);
      let cellNum = 0;
      for (let colName in employeeData) {
        let newCell = row.insertCell(cellNum);
        if (cellNum != 7) {
          newCell.innerHTML = `<p class="info-row-${row.rowIndex}">${
            colName == "role"
              ? role[employeeData[colName]]
              : employeeData[colName]
          }</p><br>
          <input type="text" class=\"edit-info-row-${
            row.rowIndex
          }\" name=\"${colName}\" style="display:none" value=\"${
            colName == "role"
              ? role[employeeData[colName]]
              : employeeData[colName]
          }\">`;
        } else {
          newCell.innerHTML = ` <div id=\"normal-action-${row.rowIndex}\">
          <button id=\"del-row-${employeeData[colName]}\" onclick=\"obj.deleteRow(${row.rowIndex})\">del</button>
          <button id=\"edit-row-${employeeData[colName]}\" onclick=\"obj.editRow(${row.rowIndex})\">edit</button>
      </div>
      <div id=\"edit-action-${row.rowIndex}\" style=\"display:none\">
          <button id=\"save-row-${employeeData[colName]}\" onclick=\"obj.save(${row.rowIndex})\">save</button>
          <button id=\"cancel-row-${employeeData[colName]}\" onclick=\"obj.cancel(${row.rowIndex})\">cancel</button>
      </div>`;
        }
        cellNum++;
      }
      rowCount++;
    }

    document.getElementById("load").style.display = "none";
    document.getElementById("refresh").style.display = "inline";
  }

  deleteRow(rowNum: any): void {
    this.data = [...this.data.slice(0, rowNum - 1), ...this.data.slice(rowNum)];
    this.refreshData();
  }

  editRow(rowNum): void {
    let editableRowInput = document.getElementsByClassName(
      `edit-info-row-${rowNum}`
    ) as HTMLCollectionOf<HTMLElement>;

    let staticCellData = document.getElementsByClassName(
      `info-row-${rowNum}`
    ) as HTMLCollectionOf<HTMLElement>;
    Array.from(editableRowInput).forEach((input) => {
      input.style.display = "inline";
    });
    Array.from(staticCellData).forEach((input) => {
      input.style.display = "none";
    });
    document.getElementById(`normal-action-${rowNum}`).style.display = "none";
    document.getElementById(`edit-action-${rowNum}`).style.display = "inline";
  }

  save(rowNum): void {
    let editableRowInput = document.getElementsByClassName(
      `edit-info-row-${rowNum}`
    ) as HTMLCollectionOf<HTMLInputElement>;
    Array.from(editableRowInput).forEach((input) => {
      let value = input.value;
      input.name == "role"
        ? (this.data[rowNum - 1][input.name] = role[value])
        : (this.data[rowNum - 1][input.name] = value);
    });

    this.refreshData();
  }

  cancel(rowNum): void {
    let editableRowInput = document.getElementsByClassName(
      `edit-info-row-${rowNum}`
    ) as HTMLCollectionOf<HTMLElement>;

    let staticCellData = document.getElementsByClassName(
      `info-row-${rowNum}`
    ) as HTMLCollectionOf<HTMLElement>;
    Array.from(editableRowInput).forEach((input) => {
      input.style.display = "none";
    });
    Array.from(staticCellData).forEach((input) => {
      input.style.display = "inline";
    });
    document.getElementById(`normal-action-${rowNum}`).style.display = "inline";
    document.getElementById(`edit-action-${rowNum}`).style.display = "none";
  }

  refreshData(): void {
    const table = document.getElementById(
      "dataTable"
    ) as HTMLTableElement | null;
    while (table.rows.length !== 1) {
      table.deleteRow(1);
    }
    this.loadData();
  }
}

let obj = new userDataTable(data);
