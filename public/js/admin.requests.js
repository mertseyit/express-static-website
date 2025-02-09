const whoAmI = async () => {
  const response = await fetch('/admin/auth/whoami', {
    method: 'get',
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzM4Nzk2Mjc0LCJleHAiOjE3Mzg4ODI2NzR9.pBBb7tADxNWk-X7ecVF1QXNsjbSKWlYkKqX882s99vs',
    },
  });

  const data = await response.json();
  return data;
};

const addBlog = async () => {
  const formData = new FormData();
  const blogTitle = document.getElementById('blog_title');
  formData.append('blog_title', blogTitle.value);
  const blogImage = document.getElementById('preview_img');
  formData.append('preview_img', blogImage.files[0]);
  const blogText = document.getElementById('editor');
  formData.append('blog_text', `${blogText.innerHTML}`);
  const response = await fetch('/admin/blogs/add', {
    method: 'post',
    headers: {
      Authorization: 'Bearer TEST_TOKEN',
    },
    body: formData,
  });
  const data = await response.json();
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
    });
    form.reset();
  }
};
