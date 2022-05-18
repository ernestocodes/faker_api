const express = require("express");
const { faker } = require('@faker-js/faker');
const app = express();
console.log(app);
const port = 8000;

const companyList = []
const createCompany = () => {
    const newFake = {
        id: faker.datatype.uuid(),
        name: faker.company.companyName(),
        address: [
            faker.address.streetAddress(),
            faker.address.city(),
            faker.address.stateAbbr(),
            faker.address.zipCode(),
            faker.address.country() 
        ]
    };
    return newFake;
};

let userList = []
const createUser = () => {
    const newFake = {
        password: faker.internet.password(),
        email: faker.internet.email(),
        phoneNumber: faker.phone.phoneNumber(),
        lastName: faker.name.lastName(),
        firstName: faker.name.firstName(),
        id: faker.datatype.uuid()
    }
    return newFake;
}

// make sure these lines are above any app.get or app.post code blocks
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// ROUTES + controller
// get (all and one),  put, delete
app.get("/api/users", (req, res) => {
    res.json(userList);
})

app.get("/api/companies", (req, res) => {
    res.json(companyList);
})

app.get("/api/users/:id", (req, res) => {
    const id = req.params.id;
    for (const user of userList) {
        if (user.id === id) {
            res.json(user);
        }
    }
})

// createUser - post
app.post("/api/users", (req, res) => {
    const newFakeUser = createUser();
    userList.push(newFakeUser);
    res.json(newFakeUser);
})

app.post("/api/companies", (req, res) => {
    const newFakeCompany = createCompany();
    companyList.push(newFakeCompany);
    res.json(newFakeCompany);
})

app.post("/api/users/companies", (req, res)=>{
    const newFakeCompany = createCompany();
    const newFakeUser = createUser();
    companyList.push(newFakeCompany);
    userList.push(newFakeUser);
    res.json({user : newFakeUser, company: newFakeCompany});
})

// update (put) - getOne + post
// app.put("/api/users/:id", (req, res) => {
//     const id = req.params.id;
//     for (let user of userList) {
//         if (user.id === id) {
//             user = req.body;
//         }
//     }
// })

// delete - getOne
// app.delete("/api/users/:id", (req, res) => {
//     const id = req.params.id
//     users.splice(id, 1)
//     res.json({ status: "ok" })
// })



app.listen(port, () => console.log(`Listening on port ${port}`));