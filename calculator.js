/* add
subtract
multiply
divide
*/

let displayValue = [];
let postFix = "";
const history = document.getElementById('history-container');
let numDisplay = document.getElementById('numDisplay')

let decimalPress = document.querySelector('#decimal')
    decimalPress.addEventListener('click', () =>{
        decimalPress.disabled=true;
    })

let btnSelect = document.querySelectorAll('.numBtn')
    btnSelect.forEach(btn => {
        btn.addEventListener('click', () => {
            displayValue.push(`${btn.value}`)
            document.getElementById('numDisplay').setAttribute("value",displayValue.join(''))
        })
    })
let opSelect = document.querySelectorAll('.opBtn')
    opSelect.forEach(btn =>{
        btn.addEventListener('click', () => {
            displayValue.push(`${btn.value}`)
            document.getElementById('numDisplay').setAttribute("value",displayValue.join(''))
            if(decimalPress.disabled == true){
                decimalPress.disabled = false;
            }

        })
    });

let equals = document.querySelector('.aequalis')
    equals.addEventListener('click', () => {
        infix = displayValue.join(' ')
        historySet();        
        shuntYard();
    })
let clearBtn = document.querySelector('#clear')
    clearBtn.addEventListener('click', () =>{
        clearAll();
    })
    //Functions

    function historySet(){
        history.textContent = `${numDisplay.value}` + " ="
    }


    function Stack(){
        this.opStack = [];
        this.top = 0;
        this.push = push;
        this.pop = pop;
        this.peek = peek;
        this.length = length;

        function push(element){
            this.opStack[this.top++] = element;
        }
    
        function pop(){
            return this.opStack[--this.top];
        }
    
        function peek(){
            return this.opStack[this.top-1];
        }
        function length(){
            return this.top;
        }
    }

    function shuntYard(){

    infix = infix.replace(/\s+/g, ''); // remove spaces, so infix[i]!=" "
    let s = new Stack();
    let opCheck = "-+/*^";
    let precedence = {"^":4, "*":3, "/":3, "+":2, "-":2};
    let fixity = {"^": "Right", "*": "Left", "/": "Left", "+": "Left", "-": "Left"};//associativity
    let token;
    let o1, o2;

    for(i=0;i<infix.length;i++){
        token = infix[i];
        if(!isNaN(token) || token == "."){
            postFix += token;
        }
        else if(opCheck.indexOf(token)!= -1){ //if token is operator
            postFix += " ";
            o1 = " "+token;
            o2 = s.peek();
            while(opCheck.indexOf(o2)!= -1 && ((fixity[o1] == "Left" && (precedence[o1] <= precedence[o2]) ) ||
            (fixity[o1] == "Right" && (precedence[o1] < precedence[o2]))
            )){
                postFix += " " + o2;
                s.pop();
                o2 = s.peek();
            }
            s.push(o1);
        }
        else if(token == "("){
            s.push(token);
        }
        else if(token == ")"){
            while(s.peek()!= "("){
                postFix += s.pop() + " "
            }
            s.pop();
        }

    }
    postFix += s.opStack.reverse().join("");
    console.log(postFix);
    evaluator();
}

    
    
    function evaluator(){
        let e = postFix.split(' ');
        let storage = [];
        for(let i in e){
            let t=e[i];
            let n=+t;
            if(!isNaN(t))
            storage.push(n)
            else{
                var o2=storage.pop();
                var o1=storage.pop();
                switch(t){
                    case '^' : storage.push(Math.pow(o1,o2)); break;
                    case '*' : storage.push(o1*o2); break;
                    case '/' : storage.push(o1/o2); if(o2 == "0"){return clearAll(), alert('Silly goose...');}; break;
                    case '+' : storage.push(o1+o2); break;
                    case '-' : storage.push(o1-o2); break;
                }
            }

        }
        console.log(storage);
        document.getElementById('numDisplay').setAttribute("value",storage[0].toFixed(2));
        eClear();
        displayValue = [storage]
    }

    function eClear(){
        displayValue = [];
        postFix = "";
    }

    function clearAll(){
        displayValue = [];
        postFix = "";
        document.getElementById('numDisplay').setAttribute("value","0")
        history.textContent = "";
    }