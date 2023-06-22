import Swal from "sweetalert2";


export const SweetAlertInfo = (imageUrl, title, text) => {
    Swal.fire({
        html: '<img class="rounded-circle" src="' + imageUrl + '" width="100vw" height="100vh" />' +
            '<br/>' +
            '<br/>' +
            '<h5 class="text-muted">' + title + '</h5>' +
            '<b>' + text + '</b>'
    });
}


export const SweetAlertGeneral = (title, text, icon) => {

    Swal.fire({
        title: title,
        text: text,
        icon: icon,

    });

}

export const SweetAlertLoginSuccess = () => {

    const Toast = Swal.mixin({
        toast: true,
        showConfirmButton: false,
        timer: 1500,
    })
    Toast.fire({
        title: "Signed in successfully",
        icon: "success"
    })

}

