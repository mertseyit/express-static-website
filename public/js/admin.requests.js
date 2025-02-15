//START BLOG EVENT

const addBlog = async () => {
  const formData = new FormData();
  const blogTitle = document.getElementById('blog_title');
  formData.append('blog_title', blogTitle.value);
  const blogImage = document.getElementById('preview_img');
  formData.append('preview_img', blogImage.files[0]);
  const blogText = document.querySelector('#editor .ql-editor');
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
    method: 'PATCH',
    body: formData,
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
  const testimonialText = document.querySelector('#editor .ql-editor ');
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
  const testimonialText = document.querySelector('#editor .ql-editor ');
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
      method: 'PATCH',
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

const addPortfolio = async () => {
  const formData = new FormData();
  const preview_img = document.getElementById('preview_img');
  formData.append('preview_img', preview_img.files[0]);
  const portfolio_title = document.getElementById('portfolio_title');
  formData.append('portfolio_title', portfolio_title.value);
  const response = await fetch('/admin/portfolios/add?path=portfolios', {
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
  const preview_img = document.getElementById('preview_img');
  formData.append('preview_img', preview_img.files[0]);
  const portfolio_title = document.getElementById('portfolio_title');
  formData.append('portfolio_title', portfolio_title.value);
  const response = await fetch(
    `/admin/portfolios/update/${id}?path=portfolios`,
    {
      method: 'PATCH',
      body: formData,
    }
  );

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
    const response = await fetch(`/admin/portfolios/delete/${id}`, {
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
//START FEEDBACK EVENT

const deleteFeedback = async (id) => {
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
    const response = await fetch(`/admin/feedbacks/delete/${id}`, {
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

//END FEEDBACK EVENT
//START PROFILE EVENT

const updateProfile = async (id) => {
  const formData = new FormData();
  const firstname = document.getElementById('firstname');
  formData.append('firstname', firstname.value);
  const lastname = document.getElementById('lastname');
  formData.append('lastname', lastname.value);
  const response = await fetch(
    `/admin/profile/update/${id}?path=admin_profiles`,
    {
      method: 'PATCH',
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
    }).then(() => {
      location.reload(); // burada sadece veriyi güncelleyecek bir işlevsellik yapılması gerekiyor.
    });
  }
};

const updateEmail = async () => {
  const formData = new FormData();
  const email = document.getElementById('new-email');
  formData.append('email', email.value);
  const response = await fetch(`/admin/profile/update-email/`, {
    method: 'PATCH',
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
    }).then(() => {
      location.reload(); // burada sadece veriyi güncelleyecek bir işlevsellik yapılması gerekiyor.
    });
  }
};

const verifyEmailAgain = async (email) => {
  const formData = new FormData();
  formData.append('email', email);
  const response = await fetch(`/admin/profile/update-email/`, {
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
    }).then(() => {
      location.reload(); // burada sadece veriyi güncelleyecek bir işlevsellik yapılması gerekiyor.
    });
  }
};

const resetPasswordGetLink = async () => {
  const response = await fetch(`/admin/profile/send-update-password-request`, {
    method: 'post',
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
    }).then(() => {
      location.reload(); // burada sadece veriyi güncelleyecek bir işlevsellik yapılması gerekiyor.
    });
  }
};

const resetPassword = async () => {
  const formData = new FormData();
  const currentPassword = document.getElementById('current-password');
  formData.append('currentPassword', currentPassword.value);
  const newPassword = document.getElementById('new-password');
  formData.append('newPassword', newPassword.value);
  const response = await fetch(`/admin/profile/update-password-request`, {
    method: 'PATCH',
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
    }).then(() => {
      location.href = 'http://localhost:3000/admin/signin';
    });
  }
};

//END PROFILE EVENT

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

const logOut = async () => {
  const response = await fetch('/admin/logout', {
    method: 'post',
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
        window.location.href = 'signin';
      }
    });
  }
};
