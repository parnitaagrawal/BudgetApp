var btnBudgetSubmit=document.getElementById("budgetSubmit");
var displayBudget=document.getElementById("budgetValue");
var btnBudgetSubmit = document.getElementById("budgetSubmit");
var displayBudget = document.getElementById("budgetValue");
var btnExpenditureSubmit = document.getElementById("expenditureSubmit");
var txtExpenseType = document.getElementById("txtExpenseType");
var displayExpenseAmount = document.getElementById("expenseAmount");
var txtExpense = document.getElementById("txtExpense");
var displayExpenditure = document.getElementById("expenditureValue");
var tblData = document.getElementById("tblData");
var inputBudget = document.getElementById("budgetText");
var balance = document.getElementById("spnBalance");
// Budget Input Form


// Budget Input Form
btnBudgetSubmit.addEventListener("click", function () {
  // Setting up the value of Budget Value
  displayBudget.textContent = inputBudget.value;
  // Setting up the Value of Expenditure Value
  displayExpenditure.textContent = 0;
  // Setting Up the Value of Balance Value
  balance.textContent = inputBudget.value;
});

// Expenditure Input Form
// Click Function of Expenditure Submit
btnExpenditureSubmit.addEventListener("click", function () {
  // Letting the Value of Expense from Input Expense Value
  let expense = Number(txtExpense.value);
  // Displaying the Value of display Expenditure by Calculating (Its Old Value + New Input Value of Expense)
  displayExpenditure.textContent =
    Number(displayExpenditure.textContent) + expense;
    // Displaying the Value of display Balance by Calculating (Its Old Value - New Input Value of Expense)  
  balance.textContent = Number(balance.textContent) - expense;
  generateTableData(expense);  
  // For Reseting the Value of Input To Blank After Click Event
  txtExpense.value = txtExpenseType.value = "";   
});

// function for Creating Dyanamic Element In Table 
function createDynamicElement(type) {
  // createElement is a function to create an element.
  let elem = document.createElement(type);
  // in function we have to return the value.
  return elem;
}

// Function for Table-Row & Column
function generateTableData(expense){
  // Creating a Table Row.
  let tr = createDynamicElement("tr");
  // Creating a text Value Column
  let tdtitlle = createDynamicElement("td");
  // Giving the Value of text Expense from input to text Value
  tdtitlle.textContent = txtExpenseType.value;
  // Styling it red Font
  tdtitlle.style.color="red";
   // Creating a text Amount Value Column
  let tdValue = createDynamicElement("td");
  //  Giving the Value of text Value Expense from input to text Amount Value
  tdValue.textContent = expense;
  // Styling it red Font
  tdValue.style.color="red";
  // Creating A Column for Edit and Delete 
  let tdAction = createDynamicElement("td");
  // Creating a Edit With In Action And Giving An Anchor Tag
  let aEdit = createDynamicElement("a");
  // Setting Attribute to the Edit and using Font-Awesome icon class in it.     
  aEdit.setAttribute("class","fa fa-pencil-square-o");
  // Giving Color to the font Awesome icon
  aEdit.style.color="#03668d" ;
  // Click Event For Edit.
  aEdit.addEventListener("click",function(){
    // To Bring Value To Input Tag
    txtExpense.value = expense;
    // To Bring the Text Tiltle to Input Tag Text Expenditure
    txtExpenseType.value=tdtitlle.textContent; 
    // 
    let trParent = getNearestTableAncestor(aEdit);
    trParent.parentNode.removeChild(trParent); 
    // To Re Calculate the Value of Edit Item, Since it is removed from Table List.
    displayExpenditure.textContent =Number(displayExpenditure.textContent) - expense;
    // To Re Calculate the Value of Edit Item, Since it is removed from Table List.
    balance.textContent = Number(balance.textContent) + expense;    
    // to Bring Back Value To this Same Place.

  });
  // To Create A Anchor Tag In Action Column To Create A Space Between A Edit and Delete Icon
  let aSeprate=createDynamicElement("a");
  aSeprate.textContent="  ";
  // To Create A Anchor Tag in Action Column.
  let aDelete = createDynamicElement("a");  
    // Setting Attribute to the Delete and using Font-Awesome icon class in it.
  aDelete.setAttribute("class","fa fa-trash-o");
  // Giving Color to the font Awesome icon
  aDelete.style.color="red";
  // Delete Click Event
  aDelete.addEventListener("click", function (){
    // Function For the Delete
   performDelete(expense,this); 
  });
  // Giving Notation to the Create Document and Relating it with its Parent Element.
  tdAction.appendChild(aEdit);
  tdAction.appendChild(aSeprate)
  tdAction.appendChild(aDelete);  
  tr.appendChild(tdtitlle);
  tr.appendChild(tdValue);
  tr.appendChild(tdAction);
  tblData.appendChild(tr); 
}
// function for Delete
function performDelete(expense,element){
  // Condition for Delete 
  if (confirm("do you want to delete this row?")) {
    // Considering The Value of trParent from Function
    let trParent = getNearestTableAncestor(element);
    // After Getting the Tr, And instruct it to remove from the Parent item.
    trParent.parentNode.removeChild(trParent);
    // Re Calculate the value after Being Deleted.
    displayExpenditure.textContent =
    Number(displayExpenditure.textContent) - expense;
    balance.textContent = Number(balance.textContent) + expense;
  }
}
// Function For Extracting the Value outoff Row.
function getNearestTableAncestor(htmlElementNode) {
  // A Conditional for extracting the Value of tr.
  while (htmlElementNode) {
    htmlElementNode = htmlElementNode.parentNode;
    // Condition Will go till if value is equaal to tr.
    // td to tr.
    if (htmlElementNode.tagName.toLowerCase() === "tr") {
      return htmlElementNode;
    }
  }
  return undefined;
}
