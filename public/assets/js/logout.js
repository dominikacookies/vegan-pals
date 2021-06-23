const handleLogout = async () => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
  };

  const response = await fetch("/auth/logout", options);

  if (response.status === 200) {
    window.location.replace("/login");
  } else {
    console.log("Failed to logout");
  }
};

$("logout-link").on("click", handleLogout);
