const registerUser = async () => {
  try {
    const res = await API.post(
      "/auth/register",
      form
    );

    console.log(res.data);

    alert("Registered");
  } catch (err) {
    console.log(err.response?.data);

    alert(
      err.response?.data?.message ||
      err.message
    );
  }
};