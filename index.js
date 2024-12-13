const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButtons = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = {

    previousOperandTextElement,
    
    currentOperandTextElement,

    currentOperand: '',

    computation: '',

    equalClicked: false,

    clear: function (){  
        this.currentOperand= '',
        this.previousOperand='',
        this.operation=undefined,
        this.updateDisplay()
    },
    
    delete: function () {
        // //if numbers have been inputted in the calculator, delete the last character and display the updated number on the screen
        if(this.currentOperand!==''){
            this.currentOperand = this.currentOperand.slice(0, -1);
            this.updateDisplay()
            console.log('deleted a number', calculator.currentOperand)
        }
    },

    appendNumber: function (number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        // console.log(this.computation)
        this.currentOperand = this.currentOperand.toString() + number.toString(); //convert and concats each number into a string of numbers ('' = '' + number)
    
    },
    
    chooseOperation: function (operation) {
        //if no current number exist operations should not work..move to next line if current number exist
        if(this.currentOperand === '')return; 
        
        //a current number exist and an operation is clicked when a previous number also exist...compute the previous and current number first before moving to the next line
        if(this.previousOperand !=='') {
            this.compute()
        }
        
        this.operation = operation; //sets the calculators operation to the operation that was clicked by the user

        this.previousOperand = this.currentOperand //when u click an operation the current number  before the operation was clicked become the previous number
        this.currentOperand = '', //clears the current operand
        this.updateDisplay()
        console.log(`${operation} button clicked`);
    },

    compute: function (){
        const prev = parseFloat(this.previousOperand) //converted prevOperand string to actual number for computing
        const current = parseFloat(this.currentOperand) //converted current operand string to number
        // console.log(prev, current)

        if (isNaN(prev) || isNaN(current)) return; //returns if prev or current is not a number type
   
        //use switch statement to determine which operation to run when the user presses the equal button
        switch(this.operation){
            case '+' : 
            this.computation = prev + current
            break
            case '-' : 
            this.computation = prev - current
            break
            case 'x' : 
            this.computation = prev * current
            break
            case '÷' : 
            this.computation = prev / current
            break
        }
        // console.log('computation executed', this.computation)
        this.clear()
        this.appendNumber(this.computation)
        this.updateDisplay()
    },


    updateDisplay: function () {
        this.currentOperandTextElement.innerText = this.currentOperand
        // this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operation}`;
        this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operation || ''}`;
    }
}


//console.log(calculator)
calculator.clear() //on mount, clear the calculator




// console.log(numberButtons) //nodelist...ie array of dom button elements..calculator numbers



numberButtons.forEach(button=>{
    //numbers functionality
    button.addEventListener('click', ()=>{
        if (calculator.equalClicked === true) {
            calculator.clear()
            calculator.equalClicked = false
        }
        calculator.appendNumber(button.innerText) //append the clicked numbers
        calculator.updateDisplay()
    })
})

//the delete button functionality
deleteButton.addEventListener('click', ()=>{
    calculator.delete()
})

operationButtons.forEach(button=>{
    button.addEventListener('click', ()=>{
        calculator.chooseOperation(button.innerText);
        calculator.equalClicked = false
    })
})


equalsButtons.addEventListener('click', event =>{
    console.log(event)
    calculator.compute();
    calculator.equalClicked = true
    console.log(calculator.equalClicked)
})

allClearButton.addEventListener('click', event =>{
    calculator.clear()
})

//josh
// create a variable that checks if equal was clicked
// If the variable is true, then, if number is clicked next, clear all input, set variable to false, then display number



