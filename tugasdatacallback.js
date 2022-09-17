class Table{
    constructor(init) {
        this.init = init
    }

    createHeader(data) {
        let open = "<thead><trO>"
        let close = "</tr><thead>"
        data.forEach((d) => {
        open += `<th class= "table-secondary">${d}</th>`
        });

        return open + close
    }
    
    createBody(data){
        let open = "<tbody>"
        let close = "</tbody>"

        data.forEach((d) => {
            open += `
            <tr>
                <td>${d[0]}</td>
                <td>${d[1]}</td>
                <td>${d[2]}</td>
                <td>${d[3]}</td>
                <td>${d[4]}</td>
                <td>${d[5]}</td>
            </tr>`
            
        })

        return open + close
    }

    render(element){
        let table = 
        "<table class='table table-bordered table-striped'>" +
        this.createHeader(this.init.colums) +
        this.createBody(this.init.data) +
        "</table>"
        element.innerHTML = table
    }
}


function getData(url, cb) {
    let xhr = new XMLHttpRequest()
    xhr.onload = function (){
        if (xhr.status === 200) {
            return cb(JSON.parse(xhr.responseText))
        }
    }
    xhr.open("GET", url)
    xhr.send()
}


const data = getData("https://jsonplaceholder.typicode.com/users", function(data){
    let dataTable = []
    console.log(data)
    data.forEach(element => {
        dataTable.push([
            element.id,
            element.name,
            element.username,
            element.email,
           `${element.address.street} ${element.address.suite} ${element.address.city}`,
            element.company.name,

        ])
    })
    const table = new Table({
        colums: ["ID", "Name", "Username", "Email", "Address", "Company"],
        data: dataTable
    })
    const app = document.getElementById("app")
    table.render(app)
})