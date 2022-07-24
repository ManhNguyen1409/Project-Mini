$("#add").on("click", function () {
  const name = $("#name").val();
  const deadline = $("#deadline").val();
  const status = $("#status").val();
  $.ajax({
    type: "POST",
    url: "/todo/create",
    data: {
      name: name,
      deadline: deadline,
      status: status,
    },
  })
    .then(function (data) {
      console.log(data);
      render();
    })
    .catch(function (err) {
      console.log(err);
    });
});
function render() {
  $(".todo").html("");
  $(".doing").html("");
  $(".done").html("");
  $.ajax({
    url: "/todo",
    type: "GET",
  })
    .then(function (data) {
      data.data.map(function (value, i) {
        
        var jobHtml = `
                   <tr>
                        <td>${value.name}</td>
                        <td>${value.deadline}</td>
                        <td><button class="delete${value._id}">x</button></td>
                        <td><!-- Button trigger modal -->
                        <button type="button" class="btn btn-primary " data-bs-toggle="modal" data-bs-target="#staticBackdrop${value._id}" >
                        <i class="fa-solid fa-file-pen"></i>Update
                        </button>
                        
                        <!-- Modal -->
                        <div class="modal fade" id="staticBackdrop${value._id}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                          <div class="modal-dialog">
                            <div class="modal-content">
                              <div class="modal-header">
                                <h5 class="modal-title" id="staticBackdropLabel">Modal title</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                              </div>
                              <div class="modal-body">
                              <input type="text" name="" id="newname${value._id}" placeholder="newname" />
                              <input  type="date" name="" id="newdeadline${value._id}" placeholder="newdeadline" />
                              <select name="" id="newstatus${value._id}">
                                <option value="todo">todo</option>
                                <option value="doing">doing</option>
                                <option value="done">done</option>
                              </select>
                              </div>
                              <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" id="updateData${value._id}" data-bs-dismiss="modal" class="btn btn-primary">change</button>
                              </div>
                            </div>
                          </div>
                        </div></button></td>
                   </tr>
                `;
        $(`.${value.status}`).append(jobHtml);
        if (value.status === "todo") {
          $(".notThing").html("");
        } else if (value.status === "doing") {
          $(".notThing1").html("");
        } else if (value.status === "done") {
          $(".notThing2").html("");
        }
        $(".close").trigger("click");
        $(`#updateData${value._id}`).on("click", function () {
          const newname = $(`#newname${value._id}`).val();
          const newdeadline = $(`#newdeadline${value._id}`).val();
          const newstatus = $(`#newstatus${value._id}`).val();
          console.log(newname, newdeadline, newstatus);
          $.ajax({
            url: "/todo/" + value._id,
            type: "PUT",
            data: {
              newname: newname,
              newdeadline: newdeadline,
              newstatus: newstatus,
            },
          })
            .then(function (data) {
              console.log(data);
              window.location.reload();
            })
            .catch(function (err) {
              console.log(err);
            });
        });
        $(`.delete${value._id}`).on("click", function () {
            $.ajax({
              url: "/todo/" + value._id,
              type: "DELETE",
            })
              .then(function (data) {
                console.log(data);
                render();
              })
              .catch(function (err) {
                console.log(err);
              });
            window.location.reload();
          });

      });
    })
    .catch(function (err) {
      res.json(err);
    });

}
$("#changePass").on("click",function(){
  window.location.href = '/index/change'
})
render();
