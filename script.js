async function run(){
    let blob = await loadBlobFromSrc('images/s2.png');
    const img = document.querySelector('#img');
    img.onload = ()=>{
        const src = cv.imread(img)
        let dst = new cv.Mat()
        cv.cvtColor(src, dst, cv.COLOR_RGBA2GRAY)
        cv.imshow('output', dst);
        src.delete();
        dst.delete();
    };
    img.src = blob;

}

function onOpenCvReady(){
    document.querySelector('#status').textContent = 'OpenCV.js is Ready!';
    document.querySelector('#container').classList.remove('noDisplay');
    cv['onRuntimeInitialized']=()=>run();
}

function loadBlobFromSrc(src){
    return new Promise( (res)=>{
        fetch(src)
        .then(function(response) {
            return response.blob()
        })
        .then(function(blob) {
            // here the image is a blob
            res(URL.createObjectURL(blob));
        });
    })
}