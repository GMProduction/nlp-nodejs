function AlertConfirm(title = 'Apakah Anda Yakin?', text = 'Apa anda yakin melanjutkan proses', fn) {
    Swal.fire({
        title: title,
        text: text,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya'
    }).then((result) => {
        if (result.value) {
            fn();
        }
    });
}

async function AjaxPost(url, param = {}, onSuccess = function () {}) {
    try {
        let response = await $.post(url, param);
        if (response['code'] === 200) {
            onSuccess();
        }
    } catch (e) {
        ErrorAlert('Error', e.responseText.toString());
    }
}