
export default function adapterDelete(data, rowData) {
    
       
    // var updateData= data.map(val => {
    //   console.log('val:', val);
    //   console.log('val.id :', val.id);
    //   console.log('rowData[1] :', rowData[1]);
    //   if(val.id!==rowData[1])
    //     return val;
    // } )
    // var updateData= data.filter(val => {
    //     console.log('val:', val);
    //     console.log('val.id :', val.id);
    //     console.log('rowData[1] :', rowData[1]);
    //     if(val.id!==rowData[1])
    //       return val;
    //   } )
    return data.filter(val => val.id!==rowData[1] ); //return records which do not match
}

