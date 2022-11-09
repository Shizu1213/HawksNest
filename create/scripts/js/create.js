function onSubmit(event) {
    event.preventDefault()

    let request = new XMLHttpRequest()

    request.onreadystatechange = () => handleResponse(request)
    let formData = new FormData(event.target)

    request.open('POST', '/create/scripts/php/create.php')
    request.send(formData)
}

function handleResponse(request) {
    if (request.readyState !== XMLHttpRequest.DONE || request.status !== 200) {
        return
    }

    let response = JSON.parse(request.responseText)

    if (!response) {
        return
    }

    updateFeedback(response)
    if (response.success) {
        showSuccess()
    } else {
        hcaptcha.reset()
    }
}

function updateFeedback(feedback) {
    let groups = document.querySelectorAll('.form-group')

    for (let group of groups) {
        setFeedback(group, feedback[group.id.replace('-group', '')])
    }
}

function setFeedback(group, message = null) {
    let input = group.querySelector('input')
    let feedback = group.querySelector('.feedback')

    if (input) {
        if (message) {
            input.classList.add('invalid')
        } else {
            input.classList.remove('invalid')
        }
    }
}

function showSuccess() {
    updateModal(
        'Account Created',
        '<p>Your Account has been created.</p>',
        'Play Now',
        () => window.location.href = '/'

    )
}

function updateModal(title, content, button, onclick) {
    document.getElementById('model-title').innerHTML = title
    document.getElementById('modal-content').innerHTML = content

    let modalButton = document.getElementById('model-button')
    
    modelButton.innerHTML = button
    modelButton.onclick = onclick

    let element = document.getElementById('modal')
    element.classList.remove('fade')

    void element.offsetWidth
    element.classList.add('fade')
}

window.onload = function() (
    document.getElementById('modal-form').addEventListener('submit', onSubmit)
)
