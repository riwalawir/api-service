const express = require("express")
const fs = require("fs")
const cors = require("cors")

const app = express()
const port = 3100

app.use(cors())

app.get('/', (req, res) => {
    res.send("INI API SERVICE BROW")
})

app.get('/banner', (req, res)=> {
    const data = getData("./data/Banner.json")
    res.json(data)
})

app.get('/category', (req, res)=> {
    const data = getData("./data/Category.json")
    res.json(data)
})

app.get('/product', (req, res)=> {
    const data = getData("./data/Product.json")
    res.json(data)
})

app.get('/product/:id', (req, res)=> {
    const data = findData(req.params.id)
    res.json(data)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })

  //    FUNGSI UNTUK MENGAMBIL DATA JSON
  const getData = (path)=> {
    const data = fs.readFileSync(path, "utf-8", (err, data)=> data)
    return JSON.parse(data)
  }

  //    FUNGSI UNTUK MENCARI DATA SESUAI YANG DIMINTA OLEH USER
  const findData = (id)=> {
    const dataProduct = getData("./data/Product.json")
    const findProduct = dataProduct.find((data)=> data.id == parseInt(id))
    
    if(!findProduct) {
        let dummy = [{
            "id" : 9999, 
            "brand" : "DATA TIDAK ADA GUYS", 
            "description" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus...", 
            "price" : 50000,
            "promo" : 49900, 
            "category" : "COMPUTER",
            "image" : ["https://i.postimg.cc/13sBWsTt/headset.jpg"]
        }]
        return dummy
    }
    return findProduct
  }
