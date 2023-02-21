const axios = require('axios')
const provincias = [
    { name: "Buenos Aires" },
    { name: "Catamarca" },
    { name: "Chaco" },
    { name: "Chubut" },
    { name: "Córdoba" },
    { name: "Corrientes" },
    { name: "Entre Ríos" },
    { name: "Formosa" },
    { name: "Jujuy" },
    { name: "La Pampa" },
    { name: "La Rioja" },
    { name: "Mendoza" },
    { name: "Misiones" },
    { name: "Neuquén" },
    { name: "Río Negro" },
    { name: "Salta" },
    { name: "San Juan" },
    { name: "San Luis" },
    { name: "Santa Cruz" },
    { name: "Santa Fe" },
    { name: "Santiago del Estero" },
    { name: "Tierra del Fuego, Antártida e Islas del Atlántico Sur" },
    { name: "Tucumán" }
  ];

  let funcion = async (payload)=>{
    for(let i = 0 ; i<payload.length; i++){
            await axios({
                url:'http://localhost:3001/api/states/create',
                data:payload[i],
                method:'post'
            })
    }
  }
  funcion(provincias)