function Validator(options){

    
    let selectorRules = {};

    const formElement = document.querySelector(options.form)

    if(formElement){

        // ---------------- xử lí sự kiện bubmit js và mặc định--------
        formElement.onsubmit = (e)=>{
            if(typeof(options.onSubmit) == 'function'){
                e.preventDefault()
                options.rules.forEach((rule)=>{
                    const inputElement = formElement.querySelector(rule.selector)
                    // console.log(inputElement)
                    if(inputElement!= null){

                        validate(
                            {
                                inputElement, 
                                errorMessage: getErrorValue({inputElement,rule})
                            })
                    }
                })

                let inputEables = document.querySelectorAll('[name]')
            
                values = Array.from(inputEables).reduce((values, input)=>{
                    // console.log(input)

                    switch(input.type){
                        case 'radio':
                            if(formElement.querySelector('input[name="'+input.name+'"]:checked')){
                                
                                values[input.name] = formElement.querySelector('input[name="'+input.name+'"]:checked').value

                            }
                                break 
                        default:
                            values[input.name] = input.value
                            break
                    }
                    return values
                },{})
                let isSubmit;
                let valueError = formElement.querySelectorAll(options.errorSelector)
                for(let i = 0; i< valueError.length; i++){
                    // console.log(valueError[i].textContent)
                    if(valueError[i].textContent == ''){
                        isSubmit = true
                    }
                    else{
                        isSubmit = false
                        break
                    }
                }

                // console.log(isSubmit)

                    if(isSubmit){

                        options.onSubmit(values)
                    }else{
                        options.onSubmit()
                    }
            }else{
                formElement.submit()
            }
        }

        // ---------xử lí sự kiện blur và onchange input

        const radios = document.querySelectorAll('input[name = "Marital"')
        console.log(radios)

        Array.from(radios).forEach((radio)=>{
            if(radio.value == 'other'){
                radio.onclick = function(){

                    document.getElementById('addtext-orther').style.display = 'block'
                    document.getElementById('addtext-orther').querySelector('input').setAttribute("id", "Marital_status");
                    getRule() 
               
                }
            }else{ 
                radio.onclick = function(){
                    document.getElementById('addtext-orther').style.display = 'none'
                    document.getElementById('addtext-orther').querySelector('input').removeAttribute("id");
                }
            }
        })

        function getRule(){

            options.rules.forEach((rule) => {
    
                
                let inputElements = formElement.querySelectorAll(rule.selector)
                // console.log(inputElements)
                // console.log(inputElement)
                if (Array.isArray(selectorRules[rule.selector])) {
                    selectorRules[rule.selector].push(rule.test);
                }  else {
                    selectorRules[rule.selector] = [rule.test];
                }
                
                Array.from(inputElements).forEach((inputElement)=>{
    
                    if(inputElement != null){
                        inputElement.onblur = ()=>{
                            validate({
                                        inputElement, 
                                        errorMessage:getErrorValue({inputElement,rule})
                                    })  
                        }
            
                        inputElement.oninput = ()=>{
                            
                            let errorElement = inputElement.parentElement.querySelector(options.errorSelector)
                            errorElement.innerText = '';
                            inputElement.parentElement.classList.remove('invalid')
                        }
                    }
                })
            });
        }
        getRule()
        // --------------------------------------------------
    }else{
        console.log('khong tim thay thẻ form')
    }

    // --------------------kiểm tra lỗi----------------
    let getErrorValue = (listOptions)=>{
        let errorMessage ;
        
        // lấy tất cả các rules của phần tử cần validator
        let rules = selectorRules[listOptions.rule.selector]
        //------------------------------
        for (let index = 0; index < rules.length; index++) {
                // console.log(inputElement)

            switch (listOptions.inputElement.type){
                case 'radio':
                    errorMessage = rules[index](formElement.querySelector(listOptions.rule.selector 
                        + ':checked'));
                    break;
                default:
                    errorMessage = rules[index](listOptions.inputElement.value);
                    break;

            }
            if(errorMessage){
                break;
            }
            // console.log(formElement.querySelector('input[type = "radio"]:checked').value)
        }

        return errorMessage
    }

    // ------------------------hiện lỗi------------------
    function validate(listOptions){
        // console.log(listOptions.inputElement)
        let errorElement = listOptions.inputElement.parentElement.querySelector(options.errorSelector)
        if(listOptions.errorMessage){
            errorElement.innerText = listOptions.errorMessage;
            listOptions.inputElement.parentElement.classList.add('invalid')
        }else{
            errorElement.innerText = '';
            listOptions.inputElement.parentElement.classList.remove('invalid')
        }

    }
   
    
    // console.log(selectorRules)
}


function isRequired (selector, message){
    return{
        selector,
        test: (value)=>{
            return value? undefined : message||'Vui long nhập trường này'
        }
    }
}

function isEmail (selector, message){
    return  {
        selector,
        test: function(value) {
            let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; 
            return regex.test(value) ? undefined : message||'Vui lòng nhập Email  đúng định dạng';
        }
    };
}

function isAge (selector, message){
    return  {
        selector,
        test: function(value) {
            return value > 0 ? undefined : message||'Số tuổi không hợp lệ';
        }
    };
}

function minLength (selector, message){
    return  {
        selector,
        test: function(value) {
            return value.length >= 10 ? undefined : message||'Số điện thoại không hợp lệ';
        }
    };
}







