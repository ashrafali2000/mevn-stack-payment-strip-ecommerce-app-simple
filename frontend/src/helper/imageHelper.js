const getImageUrl = (fileName) => {
    return `http://localhost:3000/uploads/${fileName}`
}

const previewImage = (input, attached, images, ref) => {
    attached = true
    for (let i = 0; i < input.files.length; i++) {
        images.push(input.files[i])
    }
   for (let i = 0; i < images.length; i++) {
        let reader = new FileReader()
        reader.onload = () => { //(e)
            ref.image[i].src = reader.result
        };
        reader.readAsDataURL(images[i])
    }

    return {attached, images}
}

module.exports = { getImageUrl, previewImage }
