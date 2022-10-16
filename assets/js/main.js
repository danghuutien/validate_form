function Validator(options){
    let selectorRules = {};

    const formElement = document.querySelector(options.form)

    function getErrorElement(inputElement,rule){
        let errorMessage ;
        // let errorElement = .parentElement.querySelector(options.errorSelector)
        
        let rules = selectorRules[rule.selector]
        
        for (let index = 0; index < rules.length; index++) {
            switch (inputElement.type){
                case 'radio':
                    errorMessage = rules[index](formElement.querySelector(rule.selector 
                        + ':checked'));
                    break;
                default:
                    errorMessage = rules[index](inputElement.value);

            }
            if(errorMessage){
                break;
            }
            // console.log(formElement.querySelector('input[type = "radio"]:checked').value)
        }

        return errorMessage
    }

    function validate(inputElement, errorMessage){
        let errorElement = inputElement.parentElement.querySelector(options.errorSelector)
        if(errorMessage){
            errorElement.innerText = errorMessage;
            inputElement.parentElement.classList.add('invalid')
        }else{
            errorElement.innerText = '';
            inputElement.parentElement.classList.remove('invalid')
        }

    }
   
    if(formElement){
        formElement.onsubmit = (e)=>{

            if(typeof(options.onSubmit) == 'function'){

                e.preventDefault()
                options.rules.forEach((rule)=>{
                    const inputElement = formElement.querySelector(rule.selector)
                    validate(inputElement, getErrorElement(inputElement,rule))
                })

                let inputEables = document.querySelectorAll('[name]')
            
                values = Array.from(inputEables).reduce((values, input)=>{
                    // console.log(input)

                    switch(input.type){
                        case 'radio':
                            if(values[input.name] = formElement.querySelector('input[name="'+input.name+'"]:checked')){

                                values[input.name] = formElement.querySelector('input[name="'+input.name+'"]:checked').value
                            }
                                break 
                        default:
                            values[input.name] = input.value
                            break
                    }
                    return values
                },{})
                let isSubmit
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

                console.log(isSubmit)

                    if(isSubmit){

                        options.onSubmit(values)
                    }else{
                        options.onSubmit()
                    }
            }else{
                formElement.submit()
            }
        }
        options.rules.forEach((rule) => {
            const inputElements = formElement.querySelectorAll(rule.selector)
            // console.log(inputElement)
            if (Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test);
            }  else {
                selectorRules[rule.selector] = [rule.test];
            }
            
            Array.from(inputElements).forEach((inputElement)=>{

                if(inputElement){
                    inputElement.onblur = ()=>{
                        validate(inputElement, getErrorElement(inputElement,rule))  
                    }
        
                    inputElement.oninput = ()=>{
                        
                        let errorElement = inputElement.parentElement.querySelector(options.errorSelector)
                        errorElement.innerText = '';
                        inputElement.parentElement.classList.remove('invalid')
                    }
                }
            })
        });
    }else{
        console.log('khong tim thay thẻ form')
    }
    // console.log(selectorRules)
}

Validator.isRequired = (selector, message)=>{
    return{
        selector,
        test: (value)=>{
            return value? undefined : message||'Vui long nhập trường này'
        }
    }
}

Validator.isEmail = ({selector, message})=>{
    return  {
        selector,
        test: function(value) {
            let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; 
            return regex.test(value) ? undefined : message||'Vui lòng nhập Email  đúng định dạng';
        }
    };
}

Validator.isAge = (selector, message)=>{
    return  {
        selector,
        test: function(value) {
            return value > 0 ? undefined : message||'Số tuổi không hợp lệ';
        }
    };
}

Validator.minLength = (selector, message)=>{
    return  {
        selector,
        test: function(value) {
            return value.length >= 10 ? undefined : message||'Số điện thoại không hợp lệ';
        }
    };
}



