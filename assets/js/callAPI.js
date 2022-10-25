window.onload = () => {
  hienThi();
};

const notification = document.getElementById("notification");

Validator({
  form: "#test_validation",
  errorSelector: ".form-message",
  rules: [
    // isRequired('input[name = "Marital"]'),
    // isRequired("#age"),
    // isAge("#age"),
    // isRequired("#Gender"),
    // isRequired("#Phone"),
    // minLength("#Phone"),
    // isRequired("#Email"),
    // isEmail("#Email"),
    // isRequired("#Marital_status"),
  ],
  onSubmit: (data = null) => {
    // console.log(data);
    const renderData = document.getElementById("data");
    if (data == null) {
      renderData.innerHTML =
        '<h1 style = "font-size:15px;color:red;"> Bạn phải nhập đầy đủ thông tin </h1>';
    } else {
      Object.keys(data).forEach((key) => {
        if (data[key] == "other") {
          data[key] = data.Marital_status;
        }
      });
      delete data.Marital_status;
      createUser(data);

      async function createUser(data) {
        try {
          const response = await fetch(
            "https://634fcc2978563c1d82b00708.mockapi.io/api/User",
            {
              method: "POST", // or 'PUT'
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            }
          );

          // console.log(response);
          if (response.ok) {
            // console.log(111111)
            hienThi();
            notification.querySelector("#success").innerText =
              "Bạn đã nhập thành công";
            notification.querySelector("#success").style.display = "inline";
            // document.getElementById("error").innerHTML  = '<span style="color:green">Bạn đã nhập thành công</span>';
            setTimeout(() => {
              notification.querySelector("#success").style.display = "none";
            }, 3000);
          } else {
            throw new Error(`${response.status} - ${response.statusText}`);
          }
        } catch (error) {
          notification.querySelector("#err").innerText = "lỗi: " + error;
          notification.querySelector("#err").style.display = "inline";
          // document.getElementById("error").style.color = 'red'
          // document.getElementById("error").innerHTML = 'lỗi: ' + error
          setTimeout(() => {
            notification.querySelector("#err").style.display = "none";
          }, 3000);
          // console.log(11111)
        }
      }
    }
  },
});

async function hienThi() {
  const renderData = document.getElementById("data");
  try {
    const response = await fetch(
      "https://634fcc2978563c1d82b00708.mockapi.io/api/User"
    );
    // console.log(response);
    if (response.ok) {
      const users = await response.json();
      let listDatas = "";
      let i = 0;
      users.forEach((user) => {
        listDatas += `<h1 style="font-size:16px; color:red;">Thông tin người thứ ${user["id"]} </h1> <table  style="width:100%; margin: 0 auto; border: 1px solid gray;">`;
        for (const key in user) {
          if (key == "id") {
            continue;
          }
          listDatas += `<tr><td style="width:30%">${key}</td><td style="width:70%">${user[key]}</td></tr>`;
        }
        listDatas +=
          `</table>` +
          `<button onclick = 'deleteUser(${user["id"]}) '>xóa </button>` +
          `<button onclick = 'updateUser(${user["id"]}) '><label for="scroll">sửa</label></button>`;
        // renderData.querySelector('table').innerHTML = listDatas
      });
      renderData.innerHTML = listDatas;
    } else {
      throw new Error(`${response.status} - ${response.statusText}`);
    }
  } catch (error) {
    notification.querySelector("#err").innerText = "lỗi: " + error;
    notification.querySelector("#err").style.display = "inline";
    setTimeout(() => {
      notification.querySelector("#err").style.display = "none";
    }, 3000);
  }
}

async function deleteUser(id) {
  try {
    const response = await fetch(
      "https://634fcc2978563c1d82b00708.mockapi.io/api/User/" + id,
      {
        method: "DELETE", // Method itself
        headers: {
          "Content-type": "application/json; charset=UTF-8", // Indicates the content
        },
      }
    );
    // console.log(response);
    if (response.ok) {
      notification.querySelector("#success").innerText =
        "Bạn đã xóa thành công";
      notification.querySelector("#success").style.display = "inline";
      // document.getElementById("error").innerHTML  = '<span style="color:green">Bạn đã nhập thành công</span>';
      setTimeout(() => {
        notification.querySelector("#success").style.display = "none";
      }, 3000);
      hienThi();
    } else {
      throw new Error(`${response.status} - ${response.statusText}`);
    }
  } catch (err) {
    notification.querySelector("#err").innerText = "lỗi: " + error;
    notification.querySelector("#err").style.display = "inline";
    setTimeout(() => {
      notification.querySelector("#err").style.display = "none";
    }, 3000);
  }
}

const updateUser = async (id) => {
  document.querySelector('input[type="submit"').style.display = "none";
  const update = document.querySelector("#update");
  update.style.display = "block";
  const form = document.querySelector("#test_validation");
  try {
    const response = await fetch(
      "https://634fcc2978563c1d82b00708.mockapi.io/api/User/" + id
    );
    // console.log(response)
    if (response.ok) {
      const user = await response.json();
      // console.log(user)
      form.querySelector("#firstname").value = user["firstname"];
      form.querySelector("#lastname").value = user["lastname"];
      form.querySelector("#age").value = user["age"];
      form.querySelector("#Gender").value = user["Gender"];
      form.querySelector("#Phone").value = user["Phone"];
      form.querySelector("#Email").value = user["Email"];
      form.querySelector("#Personal").value = user["Personal"];
      form.querySelector('input[name = "Marital"]').value = user["Personal"];

      update.onclick = async () => {
        const inputEables = form.querySelectorAll("[name]");
        // console.log(inputEables)
        values = Array.from(inputEables).reduce((values, input) => {
          // console.log(input)
          switch (input.type) {
            case "radio":
              if (
                form.querySelector('input[name="' + input.name + '"]:checked')
              ) {
                values[input.name] = form.querySelector(
                  'input[name="' + input.name + '"]:checked'
                ).value;
              } else {
                values[input.name] = " ";
              }
              break;
            default:
              values[input.name] = input.value;
          }
          return values;
        }, {});

        Object.keys(values).forEach((key) => {
          if (values[key] == "other") {
            values[key] = values.Marital_status;
          }
        });
        delete values.Marital_status;
        try {
          const response = await fetch(
            "https://634fcc2978563c1d82b00708.mockapi.io/api/User/" + id,
            {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(values),
            }
          );
          if (response.ok) {
            notification.querySelector("#success").innerText =
              "Bạn đã cập nhật thành công";
            notification.querySelector("#success").style.display = "inline";
            hienThi()
            update.style.display = "none";
            document.querySelector('input[type="submit"').style.display =
              "block";

            // document.getElementById("error").innerHTML  = '<span style="color:green">Bạn đã nhập thành công</span>';
            setTimeout(() => {
              notification.querySelector("#success").style.display = "none";
            }, 3000);
          } else {
            throw new Error(`${response.status} - ${response.statusText}`);
          }
        } catch (err) {
          notification.querySelector("#err").innerText = "lỗi: " + error;
          notification.querySelector("#err").style.display = "inline";
          setTimeout(() => {
            notification.querySelector("#err").style.display = "none";
          }, 3000);
        }
      };
    } else {
      throw new Error(`${response.status} - ${response.statusText}`);
    }
  } catch (err) {
    notification.querySelector("#err").innerText = "lỗi: " + error;
    notification.querySelector("#err").style.display = "inline";
    setTimeout(() => {
      notification.querySelector("#err").style.display = "none";
    }, 3000);
  }
};
