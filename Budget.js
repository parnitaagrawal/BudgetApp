  var lblBudget= document.getElementById("lblBudget");
var lblExpenses=document.getElementById("lblExpenses");
var lblBalance= document.getElementById("lblBalance");
var txtBudget= document.getElementById("txt_Budget");
var txtExpense= document.getElementById("txt_Expense");
var txtAmount=document.getElementById("txt_Amount");
var btnAddExpense = document.getElementById("btn_Add_Expense");
var btnCalculate= document.getElementById("btn_Calculate");
var tblExpense= document.getElementById("tblExpense");
//tblExpense.setAttribute("style","display:none");
var currentSituation="add";
var editTxtExpense="";
var editTxtAmount="";
var deleteTxtAmount="";

btnCalculate.addEventListener("click",function(){
  
  lblBudget.textContent=  txtBudget.value;
  lblBalance.textContent=  txtBudget.value;
  lblExpenses.textContent= 0; 
  
});

btnAddExpense.addEventListener("click",function()
{
 
  ChangeExpenseAndBalance(currentSituation);
  if(currentSituation==="add")
  { 
  ShowTable();
  }
  else{   
    EditTheExpense();
  }
});


function ChangeExpenseAndBalance(currentSituation)
{
  let expense= lblExpenses.textContent;  
  let balance= lblBalance.textContent;
  if(currentSituation==="add")
  { 
  expense= Number(expense) + Number(txtAmount.value);  
  balance= Number(balance)- Number(txtAmount.value);
  }
  if(currentSituation=="delete")
  {
    expense= Number(expense) -Number(deleteTxtAmount) ;  
    balance= Number(balance)+ Number(deleteTxtAmount);
  }
  if(currentSituation=="edit"){
    expense= Number(expense) + Number(txtAmount.value)-  Number(editTxtAmount) ;  
    balance= Number(balance)- Number(txtAmount.value)+ Number(editTxtAmount);
  }
  lblExpenses.textContent= expense;
  lblBalance.textContent=balance;


}

function EditTheExpense()
{  
    var currentEdittr= document.getElementsByClassName("selectedRow");
    console.log(currentEdittr);
    currentEdittr[0].cells[0].innerText= txtExpense.value;
    currentEdittr[0].cells[1].innerText=txtAmount.value;
    currentEdittr[0].classList.remove("selectedRow");
    txtExpense.value="";
    txtAmount.value="";
}

function ShowTable()
{
  
  tblExpense.setAttribute("style","display:block");
  var tr= document.createElement('tr');
  tblExpense.appendChild(tr);  

  var tdTitle=document.createElement('td');
  tdTitle.innerHTML= txtExpense.value;
  tr.appendChild(tdTitle);

  var tdAmount=document.createElement('td');
  tdAmount.innerHTML= txtAmount.value;
  tr.appendChild(tdAmount);

  var tdAction=document.createElement('td');
  var btnedit=createEditButton();
  var btndelete= createDeleteButton(); 
  
  tdAction.appendChild(btnedit);
  tdAction.appendChild(btndelete);
  tr.appendChild(tdAction);

  txtExpense.value="";
  txtAmount.value="";
}

function createEditButton()
{ 
   
  var btnEdit= document.createElement('button');
  var txtedit= document.createTextNode("Edit");
  btnEdit.appendChild(txtedit);
  btnEdit.addEventListener("click",function(){
    currentSituation="edit";
    var currenttr= this.closest("tr");
    currenttr.classList.add("selectedRow");

    editTxtExpense=txtExpense.value= currenttr.cells[0].innerText;
    editTxtAmount= txtAmount.value=currenttr.cells[1].innerText;   
    
  })

  return btnEdit;
  
}

function createDeleteButton()
{
  var btnDelete= document.createElement('button');
  var txtdelete= document.createTextNode("Delete");
  btnDelete.appendChild(txtdelete); 
  btnDelete.addEventListener("click",function(){
    
    var currentdeletetr = btnDelete.closest("tr");
    console.log("deletetr"+currentdeletetr);
    var result= confirm("Do you want to delete the expense?");
    if(result)
    {
      currentSituation="delete";
      deleteTxtAmount=currentdeletetr.cells[1].innerText;   
      currentdeletetr.remove();
      console.log(tblExpense.rows.length);
     
      ChangeExpenseAndBalance(currentSituation);
      if(tblExpense.rows.length==1)
      {
        tblExpense.setAttribute("style","display:none");
        currentSituation="add";
      }

      
    }
  })

  return btnDelete;
}

