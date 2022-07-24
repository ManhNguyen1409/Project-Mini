async function changePass() {
  try {
    const username = $("#username").val();
    const password = $("#password").val();
    const newPass = $("#newPass").val();
    const data = await $.ajax({
      url: '/user',
      type : 'GET',
    }).then(function(data){
      data.map(function(value,i){
        
         $.ajax({
          url: "/user/"+ value._id,
          type: "PUT",
          data: { username: username, password: password, newPass: newPass },
        });
        console.log(11 , data);
   
      })
      alert('Đổi mật khẩu thành công')
      window.location.href = '/index/login'
    }).catch(function(err){
      console.log(err);
    })
   
    
  } catch (error) {
    console.log(13 , error);
  }
}


