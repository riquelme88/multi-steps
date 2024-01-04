let inputName = document.querySelector('#name')
let inputEmail = document.querySelector('#email')
let inputPhone = document.querySelector('#telephone')
let step = 1
let addName = [];
let addPrice = [];
let finalPrice = []

document.querySelectorAll('.next-stape').forEach(item=>{
    item.addEventListener('click', ()=>{
        acceptInputs()
    })
})


function acceptInputs(){
    let emailRegex = /\S+@\S+\.\S+/;
    let testEmail = emailRegex.test(inputEmail.value)
    let phoneRegex = /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/;
    let testPhone = phoneRegex.test(inputPhone.value)
    let regexName = /[a-z A-Z]/
    let testName = regexName.test(inputName.value)

    document.querySelectorAll('#step-1 label').forEach(item =>{
       if(item.querySelector('input').value == ''){
         item.querySelector('.error').innerHTML = 'The field is required'
         item.querySelector('input').style.border = '1px solid hsl(354, 84%, 57%)'
       }else{
        item.querySelector('.error').innerHTML = ''
        item.querySelector('input').style.border = '1px solid hsl(229, 24%, 87%)'
       }
    })
    
    if(testPhone && testName && testEmail){
        step ++
        nextStape()
    }

}

document.querySelector('.slider').addEventListener('click', ()=>{
    let cardElement = document.querySelector('.slider-card')
    let style = window.getComputedStyle(cardElement)
    let matrix = new WebKitCSSMatrix(style.transform)
    if(matrix.m41 == 0){
        document.querySelectorAll('.card').forEach(item=>{
            item.classList.add('active-year')
            let priceCard = item.querySelector('.price-card')
            let span = item.querySelector('.price-card span')
            let month = item.querySelector('.months')
            priceCard.innerHTML = `<p class="price-card">$<span>${span.innerHTML = span.innerHTML * 10}</span><span class="month-p">/yr</p>`
            month.style.display = 'block'
        })
    }else{
        document.querySelectorAll('.card').forEach(item=>{
            item.classList.remove('active-year')
            let priceCard = item.querySelector('.price-card')
            let span = item.querySelector('.price-card span')
            let month = item.querySelector('.months')
            priceCard.innerHTML = `<p class="price-card">$<span>${span.innerHTML = span.innerHTML / 10}</span><span class="month-p">/mo</p>`
            month.style.display = 'none'
        })
    }
})

document.querySelectorAll('.card').forEach(item=>{
    item.addEventListener('click', (e)=>{
        document.querySelector('.card.selected').classList.remove('selected')
        e.currentTarget.classList.add('selected')
        
    })
})

function goBack(){
    step--
    document.querySelectorAll('.plan').forEach(plans=>{
        let myCheckBox = plans.querySelector('input')
        myCheckBox.checked = false
    })
    nextStape()
}
document.querySelectorAll('.plan').forEach(plans=>{
    plans.addEventListener('click', ()=>{
       let myCheckBox = plans.querySelector('input')
       if(myCheckBox.checked != true){
            myCheckBox.checked = true
            plans.style.border = '1px solid hsl(243, 100%, 62%)'
            pickAdd(plans)
       }else{
            myCheckBox.checked = false
            plans.style.border = ''
            pickRemove(plans)
       }

    })
})

document.querySelector('.option p').addEventListener('click', ()=>{
    step = 2
    nextStape()
})
function nextStape(){
    document.querySelectorAll('.right-steps section').forEach(item=>{
        item.style.display = 'none'
    })
    let stepDiv = document.querySelector(`#step-${step}`).style.display = 'block'

    document.querySelectorAll('.number').forEach(item=>{
        item.classList.remove('active')
        let numberActual = item.innerHTML
        if(numberActual == step){
            item.classList.add('active')
        }
    })

   

}

function summary(){
    let selected = document.querySelector('.selected')
    let name = selected.querySelector('.name-card').innerHTML
    let price = selected.querySelector('.price-card span').innerHTML
    let month = selected.querySelector('.price-card .month-p').innerHTML
    if(month == '/yr'){
        document.querySelector('.option h5').innerHTML = `<h5>${name}<span> (Yearly)</span></h5>`
        document.querySelectorAll('.price-plan').forEach(prices=>{
            let span = prices.querySelector('span')
            prices.innerHTML = `<p>+$<span>${span.innerHTML * 10}</span>/yr</p>`
        })
        document.querySelector('.final-price').innerHTML = `<p class="final-price">Total (<span>per year</span>)</p>`
    }else if(document.querySelector('.price-plan span').innerHTML == 1){
        document.querySelector('.option h5').innerHTML = `<h5>${name} <span> (Monthly)</span></h5>`
        document.querySelectorAll('.price-plan').forEach(prices=>{
            let span = prices.querySelector('span')
            prices.innerHTML = `<p>+$<span>${span.innerHTML}</span>/mo</p>`
        })
        document.querySelector('.final-price').innerHTML = `<p class="final-price">Total (<span>per month</span>)</p>`
    }else{
        document.querySelector('.option h5').innerHTML = `<h5>${name} <span> (Monthly)</span></h5>`
        document.querySelectorAll('.price-plan').forEach(prices=>{
            let span = prices.querySelector('span')
            prices.innerHTML = `<p>+$<span>${span.innerHTML / 10}</span>/mo</p>`
        })
        document.querySelector('.final-price').innerHTML = `<p class="final-price">Total (<span>per month</span>)</p>`
    }
    document.querySelector('.section-top .month').innerHTML = ` <p class="month">$<span>${price}</span>${month}</p>`
    ///////////////////////////////////////////////////////////////////////////////////
}

function pickAdd(plans){
    
    let name = plans.querySelector('h4').innerHTML
    let price = plans.querySelector('.price-plan p span').innerHTML
    addName.push(name)
    addPrice.push(price)
    
    
}

function pickRemove(plans){
    let name = plans.querySelector('h4').innerHTML
    let price = plans.querySelector('.price-plan p span').innerHTML
    const removeName = addName.filter((name) => name == name)
    const removeprice = addPrice.filter((price) => price == price)
    addName.pop(removeName)
    addPrice.pop(removeprice)
}

function finishingUp(){
    if(addName.length < 1){
        document.querySelector('.section-bottom .services').innerHTML = ''
        document.querySelector('.section-bottom .prices').innerHTML = ''
    }else{
        document.querySelector('.section-bottom .services ').innerHTML = ''
        document.querySelector('.section-bottom .prices').innerHTML = ''
        for(let i in addName){
            document.querySelector('.section-bottom .services ').innerHTML += `<p>${addName[i]}</p>`
        }

       if(document.querySelector('.price-card .month-p').innerHTML == '/mo'){
            for(let i in addPrice){
                document.querySelector('.section-bottom .prices').innerHTML += `<p>+$<span>${addPrice[i]}</span>/mo</p>`
            }
       }else{
            for(let i in addPrice){
                document.querySelector('.section-bottom .prices').innerHTML += `<p>+$<span>${addPrice[i]}</span>/yr</p>`
            }
       }
    }

    let prices = document.querySelectorAll('.section-bottom .prices p span')
    finalPrice.push(parseInt(document.querySelector('.section-top .month span').innerHTML))
    for(let i in prices){
        finalPrice.push(parseInt(prices[i].innerHTML))
    }
    let soma = 0
    finalPrice.splice(-6)

    for(let i = 0; i <finalPrice.length; i++){
        soma += finalPrice[i]
    };

    if(document.querySelector('.price-card .month-p').innerHTML == '/mo'){
        document.querySelector('.price h4').innerHTML = `$${soma}/mo`
   }else{
        document.querySelector('.price h4').innerHTML = `$${soma}/yr`
   }

   console.log(addName)
   console.log(addPrice)
}
function confirm(){
    document.querySelector('#step-4').style.display = 'none'
    document.querySelector('#conclusion .email').innerHTML = `${inputEmail.value}.`
    document.querySelector('#conclusion').style.display = 'flex'
}

nextStape()




