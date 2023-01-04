import {tableData} from "./data.js";

let $popupAdd = $(".popup-add");
let $bgGray = $(".bg-gray");
let $arrAdd = [];
let $statusAdd = $("#status-add");
let $cusNameAdd = $("#cusName-add");
let $dateAdd = $("#datepicker");
let $priorAdd = $("#priority-add");
let $btnSaveAdd = $(".btn-save");

window.renderTableData = renderTableData;
window.showAdd = showAdd;
window.getHide = getHide;
window.saveAdd = saveAdd;
window.isEmptyAdd = isEmptyAdd;
window.getDel = getDel;
window.showEdit = showEdit;
window.saveEdit = saveEdit;
window.isEmptyEdit = isEmptyEdit;

// render table data
let $tableData = $("#table");
function renderTableData(obj) {
  $.each(obj, function (idx, val) {
    let $rowData = $('<tr class="data-table">');
    $rowData.html(`
    <td>
     <img src="${val.faceIcon}" alt="" />
     <div class="ticket-detail">
       <p class="ticket-name text-up">
       ${val.ticketName}
       </p>
       <p class="ticket-info text-down">${val.ticketInfo}</p>
     </div>
   </td>
   <td>
     <p class="cus-name text-up">${val.cusName}</p>
     <p class="cus-date text-down">${val.cusDate}</p>
   </td>
   <td>
     <p class="date-label text-up">${val.date}</p>
     <p class="time-label text-down">${val.time}</p>
   </td>
   <td ><div class="wrap-dropbox"><span class="priority ${val.priority}">${val.priority}</span>
   
     
     <i class="fas fa-ellipsis-v ellipsis"></i>
     
    <div class='drop-box'>
     <div id ="add${val.id}" onclick="showAdd(${val.id})" class="opt add d-flex align-items-center justify-content-between">
     <i class="fas fa-plus"></i>
     <p >Add</p>
     </div>
     <div id ="edit${val.id}" onclick="showEdit(${val.id})" class="opt edit d-flex align-items-center justify-content-between">
     <i class="fas fa-edit"></i>
     <p >Edit</p>
     </div>
     <div id ="del${val.id}" onclick="getDel(${val.id})" class="opt del d-flex align-items-center justify-content-between">
     <i class="fas fa-trash"></i>
     <p >Del</p>
     </div>
     </div>
     <div class="popup-edit" id="popup-edit">
     <h4 class="heading">Edit</h4>
     <div class="wrapper-input">
     <label for="status-edit" class="status-edit-label">Status</label>
     <input type="text" id="status-edit${val.id}" class="status-edit edit-input" value="${val.ticketName}" onkeyup="isEmptyEdit(${val.id})">
     <label for="cusName-edit" class="cusName-edit-label">Customer Name</label>
     <input type="textarea" id="cusName-edit${val.id}" class="cusName-edit edit-input" value="${val.cusName}"  onkeyup="isEmptyEdit(${val.id})">
     <label for="date-edit" class="date-edit-label">Date</label>
     <input type="textarea" id="date-edit${val.id}" class="date-edit edit-input" readonly value="${val.date}"  onkeyup="isEmptyEdit(${val.id})" >
     <label for="priority-edit" class="priority-edit-label">Priority</label>
     <select name="priority" class="priority-edit edit-input" id="priority-edit">
                    <option value="high">high</option>
                    <option value="normal">normal</option>
                    <option value="low">low</option>
                </select>
     <button type="submit" class="btn btn-edit" onclick="saveEdit(${val.id})" >Save</button>
     </div>
     <i class="fas fa-times icon-out" onclick="getHide()"></i>
   </div>
   </div>

   </td>`);
    $tableData.append($rowData);
  });
}
renderTableData(tableData);

// show hide dropbox
document.addEventListener("click", function (event) {
  let specifiedElement = document.getElementsByClassName("ellipsis");
  let specifiedElement2 = document.getElementsByClassName("drop-box");

  for (let idx = 0; idx < specifiedElement.length; idx++) {
    var isClickInside = specifiedElement[idx].contains(event.target);
    var isClickInside2 = specifiedElement2[idx].contains(event.target);
    if (isClickInside) {
      specifiedElement2[idx].classList.toggle("show-dropbox");
    } else if (isClickInside2) {
      specifiedElement2[idx].classList.toggle("show-dropbox");
    } else {
      specifiedElement2[idx].classList.remove("show-dropbox");
    }
  }
});

// show popup add
function showAdd(id) {
  let $add = $(".add");
  for (let idx = 0; idx < $add.length; idx++) {
    if (id === idx + 1) {
      $popupAdd.show();
      $bgGray.show();
    }
  }
}

// save add data
function saveAdd() {
  let isAddItem = {
    id: tableData.length + 1,
    faceIcon: "./assets/images/9.png",
    ticketName: $statusAdd.val(),
    ticketInfo: `Updated ${$dateAdd.val()} day ago`,
    cusName: $cusNameAdd.val(),
    cusDate: "on 24.05.2019",
    date: $dateAdd.val(),
    time: "8:00 AM",
    priority: $priorAdd.val(),
  };
  tableData.push(isAddItem);
  $arrAdd = tableData.slice(tableData.length - 1);
  renderTableData($arrAdd);
  rerenderInput();
  getHide();
  for (let idx = 0; idx < $(".date-edit").length; idx++) {
    $($(".date-edit")[idx]).datepicker({
      dateFormat: "M dd, yy",
      showButtonPanel: true,
      currentText: "Today",
      closeText: "Close",
      changeMonth: true,
      changeYear: true,
      showOtherMonths: true,
      showTimepicker: true,
    });
    console.log(idx);
  }
}

// hide popup
function getHide() {
  let $popupEdit = $(".popup-edit");
  $popupAdd.hide();
  $bgGray.hide();
  $popupEdit.hide();
  $(".wrapper-sidebar").removeClass("on");
  $("body").css("overflow", "visible");
}

// rerender input add
function rerenderInput() {
  $statusAdd.val("");
  $cusNameAdd.val("");
  $dateAdd.val("");
}

// check empty input
function isEmptyAdd() {
  if (
    $statusAdd.val() == "" ||
    $cusNameAdd.val() == "" ||
    $dateAdd.val() == ""
  ) {
    $btnSaveAdd.prop("disabled", true);
  } else {
    $btnSaveAdd.prop("disabled", false);
  }
}

// check empty edit
function isEmptyEdit(id) {
  let $statusEdit = $(".status-edit");
  let $cusNameEdit = $(".cusName-edit");
  let $priorEdit = $(".priority-edit");
  let $dateEdit = $(".date-edit");

  let $btnSaveEdit = $(".btn-edit");
  for (let idx = 0; idx < tableData.length; idx++) {
    if (id === idx + 1) {
      if (
        $($statusEdit[idx]).val() == "" ||
        $($cusNameEdit[idx]).val() == "" ||
        $($priorEdit[idx]).val() == "" ||
        $($dateEdit[idx]).val() == ""
      ) {
        $($btnSaveEdit[idx]).prop("disabled", true);
        console.log(true);
      } else {
        $($btnSaveEdit[idx]).prop("disabled", false);
        console.log(false);
      }
    }
  }
}

// delete data
function getDel(id) {
  let $rowData = $(".data-table");
  for (let idx = 0; idx < tableData.length; idx++) {
    if (id === idx + 1) {
      $($rowData[idx]).css("display", "none");
    }
  }
}

// show popup edit
function showEdit(id) {
  let $popupEdit = $(".popup-edit");
  for (let idx = 0; idx < $popupEdit.length; idx++) {
    if (id === idx + 1) {
      $($popupEdit[idx]).show();
      $bgGray.show();
    }
  }
}

// save edit data
function saveEdit(id) {
  let $statusEdit = $(".status-edit");
  let $cusNameEdit = $(".cusName-edit");
  let $dateEdit = $(".date-edit");
  let $priorEdit = $(".priority-edit");
  let $ticketName = $(".ticket-name");
  let $cusName = $(".cus-name");
  let $dateLabel = $(".date-label");
  let $priorName = $(".priority");
  for (let idx = 0; idx < tableData.length; idx++) {
    if (id === idx + 1) {
      tableData[idx].ticketName = $($statusEdit[idx]).val();
      tableData[idx].cusName = $($cusNameEdit[idx]).val();
      tableData[idx].date = $($dateEdit[idx]).val();
      tableData[idx].priority = $($priorEdit[idx]).val();
      $($ticketName[idx]).text(`${$($statusEdit[idx]).val()}`);
      $($cusName[idx]).text(`${$($cusNameEdit[idx]).val()}`);
      $($dateLabel[idx]).text(`${$($dateEdit[idx]).val()}`);
      $($priorName[idx]).text(`${$($priorEdit[idx]).val()}`);
      switch ($($priorName[idx]).text()) {
        case "high":
          $($priorName[idx]).css("background", "#f12b2c");
          break;
        case "low":
          $($priorName[idx]).css("background", "#fec400");
          break;
        case "normal":
          $($priorName[idx]).css("background", "#29cc97");
          break;
      }
    }
  }
  getHide();
}

$(document).ready(function () {
  // show sidebar
  $(".icon-bar").on("click", function () {
    $(".wrapper-sidebar").toggleClass("on");
    $bgGray.show();
    $("body").css("overflow", "hidden");
  });

// sort
$('#sort').click(function(){
  let arrSort=[]
  $.each(tableData, function(idx,val){
    arrSort.push(val.cusName.toUpperCase())
    arrSort.sort()
    console.log($tableData);
  })
})

  // dataPicker{
  $(function () {
    $("#datepicker").datepicker({
      dateFormat: "M dd, yy",
      showButtonPanel: true,
      currentText: "Today",
      closeText: "Close",
      changeMonth: true,
      changeYear: true,
      showOtherMonths: true,
      showTimepicker: true,
    });
  });

  // datepicker
  for (let idx = 0; idx < $(".date-edit").length; idx++) {
    $($(".date-edit")[idx]).datepicker({
      dateFormat: "M dd, yy",
      showButtonPanel: true,
      currentText: "Today",
      closeText: "Close",
      changeMonth: true,
      changeYear: true,
      showOtherMonths: true,
      showTimepicker: true,
    });
  }
});
