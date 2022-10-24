window.onload = (event) => {
  hienThi();
};



Validator({
    form: "#test_validation",
    errorSelector: ".form-message",
    rules: [
        isRequired('input[name = "Marital"]'),
        isRequired("#age"),
        isAge("#age"),
        isRequired("#Gender"),
        isRequired("#Phone"),
        minLength("#Phone"),
        isRequired("#Email"),
        isEmail("#Email"),
        isRequired("#Marital_status"),
    ],
    onSubmit: (data = null) => {
        hienThi();
        console.log(data);
        const renderData = document.getElementById("data");
        if (data == null) {
        renderData.innerHTML =
            '<h1 style = "font-size:15px;color:red;"> Bạn phải nhập đầy đủ thông tin </h1>';
        } else {
        for (const key in data) {
            if (data[key] == "other") {
            data[key] = data.Marital_status;
            }
        }
        delete data.Marital_status;
        createUser();
        hienThi();
        function createUser() {
            fetch("https://634fcc2978563c1d82b00708.mockapi.io/api/User", {
                method: "POST", // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            .then(() =>{
                document.getElementById("error").innerHTML  = '<span style="color:green">Bạn đã nhập thành công</span>';
                setTimeout(() => {
                    document.getElementById("error").innerHTML = ''
                }, 3000);
            })
            .catch((error) => {
                document.getElementById("error").innerHTML  = `<span style="color:red">Lỗi khi đẩy dữ liệu lên API <br>Tên lỗi: ${error}</span>`;
                setTimeout(() => {
                    document.getElementById("error").innerHTML = ''
                }, 3000);
            });
        }
            
        }
    },
});

function hienThi() {
    console.log(1)
    async function renderDatas() {
        const response = await fetch(
        "https://634fcc2978563c1d82b00708.mockapi.io/api/User"
        );
        const user = await response.json();
        return user;
    }
    const renderData = document.getElementById("data");
    console.log(renderData);
    renderDatas().then((users) => {
        let listDatas = "";
        let i = 0;
        users.forEach((user) => {
        i++;
        listDatas += `<h1 style="font-size:16px; color:red;">Thông tin người thứ ${i}: </h1><ol>`;
        for (const key in user) {
            if(key == 'id'){
                continue;
            }
            listDatas += `<li>${key}: ${user[key]}</li>`;
        }
        listDatas +=
            `<ol><button onclick = "deleteUser(${user['id']})">xóa</button>`
        });
        renderData.innerHTML = listDatas;
    })
    .catch((error)=>{
        console.log('loi: '+  error)
    });
}




function deleteUser(id) {
    fetch("https://634fcc2978563c1d82b00708.mockapi.io/api/User/" + id, {
        method: "DELETE", // Method itself
        headers: {
            "Content-type": "application/json; charset=UTF-8", // Indicates the content
        }
    }).then(()=>{
        document.getElementById("error").innerHTML = '<span style="color:green"> Bạn đã xóa thành công </span>' ;
            setInterval(()=>{
                document.getElementById("error").innerHTML = ''
            }, 1000)
        hienThi()
    });
    
}






let a =1

const callback = (b) => {
    a = b
}




useCallback(callback)