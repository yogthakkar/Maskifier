Webcam.set({
    width:350,
    height:300,
    image_format : 'png',
    png_quality: 90
});

camera =  document.getElementById("camera");

Webcam.attach( '#camera' );

function take_snapshot()
{
    Webcam.snap(function(data_uri) {
        document.getElementById("output").innerHTML = '<img id="captured_image" src="'+data_uri+'">';
    });
}

console.log('ml5 version:', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/kYP2ZHKDW/model.json', modelLoaded);

function modelLoaded()
{
    console.log('Model Loaded');
}

function check()
{
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}

function gotResult(error, results)
{
    if(error)
    {
        console.error(error);
    }
    else
    {
        console.log(results);
        document.getElementById('label').innerHTML = "Object: " + results[0].label;
        document.getElementById('accuracy').innerHTML = "Accuracy: " + (results[0].confidence * 100).toFixed(1)  + "%";
    }
}