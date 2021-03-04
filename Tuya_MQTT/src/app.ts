const TuyAPI = require("tuyapi")

const device = new TuyAPI({
    id: "mt4te4vpae05k7ar8uoj",
    key: "8977c3bf1f70432da13c0ba73546dfd3"
})


device.on("connected", () => console.log("Connected to device!"))