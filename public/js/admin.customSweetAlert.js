const questionAndActionAlert = async (action) => {
  const result = await Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#5AA469',
    cancelButtonColor: '#41444B',
    confirmButtonText: 'Yes',
  });

  if (result.isConfirmed) {
    action();
  }
};

const notAllowAlert = () => {
  Swal.fire({
    title: 'Yetkisiz İşlem',
    text: 'Bu özellik henüz geliştirme aşamasında',
    icon: 'warning',
  });
};

const deleteAlert = (action) => {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#D35D6E',
    cancelButtonColor: '#41444B',
    confirmButtonText: 'Yes, Delete',
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: 'Successful !',
        text: 'The operation was successful',
        icon: 'success',
        confirmButtonColor: '#5AA469',
      });
      action();
    }
  });
};
