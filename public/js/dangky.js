

async function create(){  
  try {
   
        var username = $('#username').val()
        var password = $('#password').val()
        var user = await $.ajax({
                url:'http://localhost:3000/user',
                type: 'POST',
                data: {
                    username: username,
                    password: password
                }
                
        })
        alert('tạo user thành công')

        
        window.location.href = '/index/login'
        console.log(user);
    }
   catch (error) {
    console.log(error);
  }}