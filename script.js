$('#selectedFile').change(function () {
  if (this.files[0] == undefined)
    return;
  $('#imageModalContainer').modal('show');
  let reader = new FileReader();
  reader.addEventListener("load", function () {
    $("#crop-image-container").attr("src", reader.result);
    window.src = reader.result;
    $('#selectedFile').val('');
  }, false);
  if (this.files[0]) {
    reader.readAsDataURL(this.files[0]);
  }
});

let croppi;
$('#imageModalContainer').on('shown.bs.modal', function () {
  let width = document.getElementById('crop__modal-body').offsetHeight;
  $('#crop-image-container').height((width - 100) + 'px');
  croppi = $('#crop-image-container').croppie({
    viewport: {
      width: width - 100,
      height: width - 100
    },
  });
  $('.modal-body1').height(document.getElementById('crop-image-container').offsetHeight + 50 + 'px');
  croppi.croppie('bind', {
    url: window.src,
  }).then(function () {
    croppi.croppie('setZoom', 0.8);
  });
});
$('#imageModalContainer').on('hidden.bs.modal', function () {
  croppi.croppie('destroy');
});


function cropImage() {
  console.log('started')
  croppi.croppie('result', { type: 'base64', format: 'jpeg', size: 'original' })
    .then(function (resp) {
      $('#crop__result').attr('src', resp);
      $('.modal').modal('hide');
      $('#result').show()
      console.log('done')
    });

}

function saveImage() {
  var gh = $('#crop__result')[0].src;
  var a = document.createElement('a');
  a.href = gh;
  a.download = 'image.png';
  a.click()
}

function copyImage() {
  const img = document.getElementById('crop__result')
  const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    canvas.getContext("2d").drawImage(img, 0, 0, img.width, img.height);
    canvas.toBlob((blob) => {
      navigator.clipboard.write([
          new ClipboardItem({ "image/png": blob })
      ]);
    }, "image/png");
}