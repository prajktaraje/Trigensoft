"use strict";

$("#toastr-success").click(function() {
    iziToast.success({
        title: 'Logged In',
        message: 'Successfully Login',
        position: 'topRight'
    });
});

$("#toastr-RegSuccess").click(function() {
    iziToast.success({
        title: 'Thanks',
        message: 'You Have Successfully Register',
        position: 'topRight'
    });
});

$("#toastr-warning").click(function() {
    iziToast.warning({
        title: 'Warning',
        message: 'Please check terms before login',
        position: 'topRight'
    });
});

$("#toastr-delete").click(function() {
    iziToast.success({
        title: 'Delete',
        message: 'Item Successfully Deleted',
        position: 'topRight'
    });
});

$("#toastr-ban").click(function() {
    iziToast.success({
        title: 'Ban',
        message: 'User Successfully Banned',
        position: 'topRight'
    });
});

$("#toastr-verify").click(function() {
    iziToast.success({
        title: 'Accepted',
        message: 'User Verified Successfully',
        position: 'topRight'
    });
});

$("#toastr-reject").click(function() {
    iziToast.error({
        title: 'Rejected',
        message: 'User is Rejected',
        position: 'topRight'
    });
});