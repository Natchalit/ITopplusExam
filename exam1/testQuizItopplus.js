function counter(num, timeout) {
    return new Promise((resolve) =>{
        setTimeout(() => {
            console.log(num+"\n");
            resolve();
        }, timeout)
    });
}

function getCounter(num,timeout){
    return new Promise((resolve) =>{
        setTimeout(() => {
            resolve(num);
        }, timeout)
    });
}

function counterParallel (num){
    Promise.all(num).then((values) => {
        console.log("2.2 Parallel scenario");
        console.log(values);
      });
}

function counterParallelLimit (num){
    Promise.all(num).then((values) => {
        console.log("3. Parallel Limit scenario");
        for(let i = 1; i<num.length+1 ;i++){
            if(i%3 != 0){
                console.log(values[i-1], values[i], values[i+1]);
                i=i+1;
            }
        }
    })

}

async function count(){

    var arrCount = [];

    console.log("2.1 Series call back");
    for(let i = 1; i<10; i++){
        await counter(i,(Math.random() * 100) + 100)
        arrCount.push(getCounter(i,(Math.random() * 100) + 100))
    }
    
    await counterParallel(arrCount)

    await counterParallelLimit(arrCount)
}

count();



