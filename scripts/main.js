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
var role;
(function (role) {
    role[role["HR Recruiter"] = 0] = "HR Recruiter";
    role[role["Web-Apps Trainee"] = 1] = "Web-Apps Trainee";
    role[role["Snr. Tech. Head"] = 2] = "Snr. Tech. Head";
    role[role["Principal Architect"] = 3] = "Principal Architect";
})(role || (role = {}));
class userDataTable {
    constructor(_data) {
        this.data = _data;
    }
    loadData() {
        const table = document.getElementById("dataTable");
        let rowCount = table.rows.length;
        for (let employeeData of this.data) {
            let row = table.insertRow(rowCount);
            let cellNum = 0;
            for (let colName in employeeData) {
                let newCell = row.insertCell(cellNum);
                if (cellNum != 7) {
                    newCell.innerHTML = `<p class="info-row-${row.rowIndex}">${colName == "role"
                        ? role[employeeData[colName]]
                        : employeeData[colName]}</p><br>
          <input type="text" class=\"edit-info-row-${row.rowIndex}\" name=\"${colName}\" style="display:none" value=\"${colName == "role"
                        ? role[employeeData[colName]]
                        : employeeData[colName]}\">`;
                }
                else {
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
    deleteRow(rowNum) {
        this.data = [...this.data.slice(0, rowNum - 1), ...this.data.slice(rowNum)];
        this.refreshData();
    }
    editRow(rowNum) {
        let editableRowInput = document.getElementsByClassName(`edit-info-row-${rowNum}`);
        let staticCellData = document.getElementsByClassName(`info-row-${rowNum}`);
        Array.from(editableRowInput).forEach((input) => {
            input.style.display = "inline";
        });
        Array.from(staticCellData).forEach((input) => {
            input.style.display = "none";
        });
        document.getElementById(`normal-action-${rowNum}`).style.display = "none";
        document.getElementById(`edit-action-${rowNum}`).style.display = "inline";
    }
    save(rowNum) {
        let editableRowInput = document.getElementsByClassName(`edit-info-row-${rowNum}`);
        Array.from(editableRowInput).forEach((input) => {
            let value = input.value;
            input.name == "role"
                ? (this.data[rowNum - 1][input.name] = role[value])
                : (this.data[rowNum - 1][input.name] = value);
        });
        this.refreshData();
    }
    cancel(rowNum) {
        let editableRowInput = document.getElementsByClassName(`edit-info-row-${rowNum}`);
        let staticCellData = document.getElementsByClassName(`info-row-${rowNum}`);
        Array.from(editableRowInput).forEach((input) => {
            input.style.display = "none";
        });
        Array.from(staticCellData).forEach((input) => {
            input.style.display = "inline";
        });
        document.getElementById(`normal-action-${rowNum}`).style.display = "inline";
        document.getElementById(`edit-action-${rowNum}`).style.display = "none";
    }
    refreshData() {
        const table = document.getElementById("dataTable");
        while (table.rows.length !== 1) {
            table.deleteRow(1);
        }
        this.loadData();
    }
}
let obj = new userDataTable(data);
