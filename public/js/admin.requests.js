//START BLOG EVENT

const addBlog = async () => {
  const formData = new FormData();
  const blogTitle = document.getElementById('blog_title');
  formData.append('blog_title', blogTitle.value);
  const blogImage = document.getElementById('preview_img');
  formData.append('preview_img', blogImage.files[0]);
  const blogText = document.querySelector('#editor .ql-editor p');
  formData.append('blog_text', `${blogText.innerHTML}`);
  const response = await fetch('/admin/blogs/add?path=blogs', {
    method: 'post',
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
  }
};

const updateBlog = async (id) => {
  const formData = new FormData();
  const blogTitle = document.getElementById('blog_title');
  formData.append('blog_title', blogTitle.value);
  const blogImage = document.getElementById('preview_img');
  formData.append('preview_img', blogImage.files[0]);
  const blogText = document.querySelector('#editor .ql-editor');
  formData.append('blog_text', `${blogText.innerHTML}`);
  const response = await fetch(`/admin/blogs/update/${id}?path=blogs`, {
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
  }
};

const deleteBlog = async (id) => {
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
    const response = await fetch(`/admin/blogs/delete/${id}`, {
      method: 'delete',
    });
    const data = await response.json();
    console.log(data);
    if (data.status !== 200) {
      Swal.fire({
        title: `${data.message}`,
        icon: 'error',
      });
    } else {
      Swal.fire({
        title: `${data.message}`,
        icon: 'success',
      }).then(() => {
        location.reload(); // burada sadece veriyi güncelleyecek bir işlevsellik yapılması gerekiyor.
      });
    }
  }
};

//END BLOG EVENT
//START TESTIMONIAL EVENT

const addTestimonial = async () => {
  const formData = new FormData();
  const testimonialProfile = document.getElementById('preview_img');
  formData.append('testimonial_profile', testimonialProfile.files[0]);
  const testimonialName = document.getElementById('testimonial_name');
  formData.append('testimonial_name', testimonialName.value);
  const testimonialPosition = document.getElementById('testimonial_position');
  formData.append('testimonial_position', testimonialPosition.value);
  const testimonialText = document.querySelector('#editor .ql-editor p');
  formData.append('testimonial_text', `${testimonialText.innerHTML}`);
  const testimonialsStars = document.getElementsByName('testimonial_rate');
  testimonialsStars.forEach((input) => {
    if (input.checked) {
      formData.append('testimonial_rate', input.value);
    }
  });
  const response = await fetch('/admin/testimonials/add?path=testimonials', {
    method: 'post',
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
  }
};

const updateTestimonial = async (id) => {
  const formData = new FormData();
  const testimonialProfile = document.getElementById('preview_img');
  formData.append('testimonial_profile', testimonialProfile.files[0]);
  const testimonialName = document.getElementById('testimonial_name');
  formData.append('testimonial_name', testimonialName.value);
  const testimonialPosition = document.getElementById('testimonial_position');
  formData.append('testimonial_position', testimonialPosition.value);
  const testimonialText = document.querySelector('#editor .ql-editor p');
  formData.append('testimonial_text', `${testimonialText.innerHTML}`);
  const testimonialsStars = document.getElementsByName('testimonial_rate');
  testimonialsStars.forEach((input) => {
    if (input.checked) {
      formData.append('testimonial_rate', input.value);
    }
  });
  const response = await fetch(
    `/admin/testimonials/update/${id}?path=testimonials`,
    {
      method: 'post',
      body: formData,
    }
  );
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
  }
};

const deleteTestimonial = async (id) => {
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
    const response = await fetch(`/admin/testimonials/delete/${id}`, {
      method: 'delete',
    });
    const data = await response.json();
    console.log(data);
    if (data.status !== 200) {
      Swal.fire({
        title: `${data.message}`,
        icon: 'error',
      });
    } else {
      Swal.fire({
        title: `${data.message}`,
        icon: 'success',
      }).then(() => {
        location.reload(); // burada sadece veriyi güncelleyecek bir işlevsellik yapılması gerekiyor.
      });
    }
  }
};

//END TESTIMONIAL EVENT
//START PORTFOLIO EVENT
//TODO: BURADA KALDIN::
const addPortfolio = async () => {
  const formData = new FormData();
  const testimonialProfile = document.getElementById('preview_img');
  formData.append('testimonial_profile', testimonialProfile.files[0]);
  const testimonialName = document.getElementById('testimonial_name');
  formData.append('testimonial_name', testimonialName.value);
  const testimonialPosition = document.getElementById('testimonial_position');
  formData.append('testimonial_position', testimonialPosition.value);
  const testimonialText = document.querySelector('#editor .ql-editor p');
  formData.append('testimonial_text', `${testimonialText.innerHTML}`);
  const testimonialsStars = document.getElementsByName('testimonial_rate');
  testimonialsStars.forEach((input) => {
    if (input.checked) {
      formData.append('testimonial_rate', input.value);
    }
  });
  const response = await fetch('/admin/testimonials/add?path=testimonials', {
    method: 'post',
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
  }
};

const updatePortfolio = async (id) => {
  const formData = new FormData();
  const testimonialProfile = document.getElementById('preview_img');
  formData.append('testimonial_profile', testimonialProfile.files[0]);
  const testimonialName = document.getElementById('testimonial_name');
  formData.append('testimonial_name', testimonialName.value);
  const testimonialPosition = document.getElementById('testimonial_position');
  formData.append('testimonial_position', testimonialPosition.value);
  const testimonialText = document.querySelector('#editor .ql-editor p');
  formData.append('testimonial_text', `${testimonialText.innerHTML}`);
  const testimonialsStars = document.getElementsByName('testimonial_rate');
  testimonialsStars.forEach((input) => {
    if (input.checked) {
      formData.append('testimonial_rate', input.value);
    }
  });
  const response = await fetch(
    `/admin/testimonials/update/${id}?path=testimonials`,
    {
      method: 'post',
      body: formData,
    }
  );
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
  }
};

const deletePortfolio = async (id) => {
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
    const response = await fetch(`/admin/testimonials/delete/${id}`, {
      method: 'delete',
    });
    const data = await response.json();
    console.log(data);
    if (data.status !== 200) {
      Swal.fire({
        title: `${data.message}`,
        icon: 'error',
      });
    } else {
      Swal.fire({
        title: `${data.message}`,
        icon: 'success',
      }).then(() => {
        location.reload(); // burada sadece veriyi güncelleyecek bir işlevsellik yapılması gerekiyor.
      });
    }
  }
};

//END PORTFOLIO EVENT
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
