
export default function adapter(rowData, title) {
    // return responseData.map(data => {
    //     const { height, hash, size } = data; // Get only required columns
    //      const time = moment(new Date(data.time)).fromNow() 
    //     return { height, hash, time, size };
    // })
    let newRowData = [];
    rowData.forEach((val,index)=> {
        console.log('index:', index);
        console.log('val:', val);
        if(index===2)
            newRowData.push(title);
        else
            newRowData.push(val);
    });
    return newRowData;
}

