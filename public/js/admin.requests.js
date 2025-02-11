const addBlog = async () => {
  const formData = new FormData();
  const blogTitle = document.getElementById('blog_title');
  formData.append('blog_title', blogTitle.value);
  const blogImage = document.getElementById('preview_img');
  formData.append('preview_img', blogImage.files[0]);
  const blogText = document.querySelector('#editor .ql-editor p');
  formData.append('blog_text', `${blogText.innerHTML}`);
  const response = await fetch('/admin/blogs/add', {
    method: 'post',
    body: formData,
  });
  const data = await response.json();
  console.log(data);
  if (data.status !== 201) {
    Swal.fire({
      title: `${data.message}`,
      icon: 'error',
    });
  } else {
    Swal.fire({
      title: `${data.message}`,
      icon: 'success',
    });
    form.reset();
  }
};

const updateBlog = async (id) => {
  console.log(id); //burada kaldın. Blog id değeri gelmiyor
  const formData = new FormData();
  const blogTitle = document.getElementById('blog_title');
  formData.append('blog_title', blogTitle.value);
  const blogImage = document.getElementById('preview_img');
  formData.append('preview_img', blogImage.files[0]);
  const blogText = document.querySelector('#editor .ql-editor p');
  formData.append('blog_text', `${blogText.innerHTML}`);
  const response = await fetch('/admin/blogs/update', {
    method: 'post',
    body: formData,
  });
  const data = await response.json();
  console.log(data);
  if (data.status !== 201) {
    Swal.fire({
      title: `${data.message}`,
      icon: 'error',
    });
  } else {
    Swal.fire({
      title: `${data.message}`,
      icon: 'success',
    });
    form.reset();
  }
};

const signUp = async () => {
  const formData = new FormData();
  const firstname = document.getElementById('firstname');
  formData.append('firstname', firstname.value);
  const lastname = document.getElementById('lastname');
  formData.append('lastname', lastname.value);
  const email = document.getElementById('email');
  formData.append('email', email.value);
  const password = document.getElementById('password');
  formData.append('password', password.value);
  const confirmPassword = document.getElementById('confirm-password');
  formData.append('confirmPassword', confirmPassword.value);
  const response = await fetch('/admin/signup', {
    method: 'post',
    body: formData,
  });
  const data = await response.json();
  if (data.status !== 200) {
    Swal.fire({
      title: `${data.message}`,
      icon: 'error',
    });
  } else {
    Swal.fire({
      title: `${data.message}`,
      icon: 'success',
    });
    form.reset();
  }
};

const signIn = async () => {
  const formData = new FormData();
  const email = document.getElementById('email');
  formData.append('email', email.value);
  const password = document.getElementById('password');
  formData.append('password', password.value);
  const response = await fetch('/admin/signin', {
    method: 'post',
    body: formData,
  });
  const data = await response.json();
  if (data.status !== 200) {
    Swal.fire({
      title: `${data.message}`,
      icon: 'error',
    });
  } else {
    Swal.fire({
      title: `${data.message}`,
      icon: 'success',
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = 'home';
      }
    });
  }
};
