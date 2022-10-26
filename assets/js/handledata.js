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
                hienThi();
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
