//引入less
require('../less/app.less')

let img = require('../images/yun.png')
window.onload = function () {
    let person = ['kevin', 'mack', 'jive'];

    let ul = document.createElement('ul');

    person.map(v => {
        let li = document.createElement('li')
        li.textContent = v;
        ul.appendChild(li);
    })

    document.body.appendChild(ul)

    let image = new Image();
    image.src = img;
    // if (/^data:image\/[A-z]+;base64/.test(img)) {
    //     //该图片就是base64

    // } else {
    //     image.src = './build/' + img;
    // }

    document.getElementById('icon').appendChild(image);
}